<?php

namespace App\Services;

use App\Models\GoogleReview;
use App\Models\SiteSetting;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;

/**
 * Pulls Google reviews via the legacy Google Maps / Places web service.
 *
 * NOTE: The legacy Place Details endpoint returns at most 5 reviews for a
 * place — that is a hard Google limitation, not something we can page past.
 * The newer Places API (v1) has the same 5-review cap for most callers.
 */
class GoogleReviewService
{
    /**
     * Resolve a Place ID (and a couple of identifying fields) from a free-text
     * business-name query so an admin can "find my business".
     *
     * Returns the candidate array on success, or null on failure / no match.
     */
    public function findPlaceId(string $query): ?array
    {
        $apiKey = config('services.google.places.api_key');

        if (! $apiKey) {
            return null;
        }

        try {
            $response = Http::timeout(10)->get(
                'https://maps.googleapis.com/maps/api/place/findplacefromtext/json',
                [
                    'input' => $query,
                    'inputtype' => 'textquery',
                    'fields' => 'place_id,name,formatted_address',
                    'key' => $apiKey,
                ]
            );

            $data = $response->json();

            if (($data['status'] ?? null) !== 'OK') {
                return null;
            }

            return $data['candidates'] ?? [];
        } catch (\Throwable $e) {
            return null;
        }
    }

    /**
     * Fetch and normalise reviews for a given Place ID.
     *
     * Returns ['reviews' => [...normalised...], 'name' => ..., 'rating' => ...,
     * 'total' => ..., 'error' => ...]. On failure 'reviews' is empty and 'error'
     * holds the Google status / message so the caller can surface it.
     */
    public function fetchReviews(string $placeId): array
    {
        $apiKey = config('services.google.places.api_key');

        if (! $apiKey) {
            return ['reviews' => [], 'error' => 'Google Places API key is not configured.'];
        }

        try {
            $response = Http::timeout(10)->get(
                'https://maps.googleapis.com/maps/api/place/details/json',
                [
                    'place_id' => $placeId,
                    // Legacy Place Details returns a maximum of 5 reviews.
                    'fields' => 'reviews,rating,user_ratings_total,name',
                    'key' => $apiKey,
                ]
            );

            $data = $response->json();

            if (($data['status'] ?? null) !== 'OK') {
                return [
                    'reviews' => [],
                    'error' => $data['status'] ?? 'Unknown error',
                    'error_message' => $data['error_message'] ?? '',
                ];
            }

            $result = $data['result'] ?? [];

            $reviews = collect($result['reviews'] ?? [])->map(function ($review) {
                return [
                    'author_name' => $review['author_name'] ?? 'Anonymous',
                    'author_photo_url' => $review['profile_photo_url'] ?? null,
                    'author_url' => $review['author_url'] ?? null,
                    'rating' => (int) ($review['rating'] ?? 5),
                    'text' => $review['text'] ?? null,
                    'relative_time_description' => $review['relative_time_description'] ?? null,
                    'time' => $review['time'] ?? null,
                ];
            })->all();

            return [
                'reviews' => $reviews,
                'name' => $result['name'] ?? null,
                'rating' => $result['rating'] ?? null,
                'total' => $result['user_ratings_total'] ?? null,
                'error' => null,
            ];
        } catch (\Throwable $e) {
            return ['reviews' => [], 'error' => 'Failed to connect to the Google Places API.'];
        }
    }

    /**
     * Fetch reviews for a Place ID and upsert each one into google_reviews.
     *
     * Also persists the overall business rating / total review count to
     * SiteSetting (only when Google returns non-null values, so a failed or
     * partial fetch never clobbers previously-saved good values).
     *
     * Returns ['imported' => n, 'rating' => ?float, 'total' => ?int, 'error' => ...].
     */
    public function import(string $placeId): array
    {
        $result = $this->fetchReviews($placeId);

        if (! empty($result['error'])) {
            $message = $result['error'];
            if (! empty($result['error_message'])) {
                $message .= ' — '.$result['error_message'];
            }

            return ['imported' => 0, 'rating' => null, 'total' => null, 'error' => $message];
        }

        // Persist the aggregate rating / total — but only when Google actually
        // returned them, so we never overwrite good values with null.
        $rating = isset($result['rating']) ? (float) $result['rating'] : null;
        $total = isset($result['total']) ? (int) $result['total'] : null;

        if ($rating !== null) {
            SiteSetting::set('google_rating', $rating);
        }
        if ($total !== null) {
            SiteSetting::set('google_reviews_total', $total);
        }

        $imported = 0;

        foreach ($result['reviews'] as $review) {
            // Synthesise a stable id since the legacy API gives reviews no id.
            $externalId = md5($review['author_name'].'|'.($review['time'] ?? ''));

            GoogleReview::updateOrCreate(
                ['external_id' => $externalId],
                [
                    'author_name' => $review['author_name'],
                    'author_photo_url' => $review['author_photo_url'],
                    'author_url' => $review['author_url'],
                    'rating' => $review['rating'],
                    'text' => $review['text'],
                    'relative_time_description' => $review['relative_time_description'],
                    'reviewed_at' => $review['time'] ? Carbon::createFromTimestamp($review['time']) : null,
                ]
            );

            $imported++;
        }

        return ['imported' => $imported, 'rating' => $rating, 'total' => $total, 'error' => null];
    }
}
