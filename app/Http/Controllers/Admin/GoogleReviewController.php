<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GoogleReview;
use App\Models\SiteSetting;
use App\Services\GoogleReviewService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GoogleReviewController extends Controller
{
    public function __construct(private GoogleReviewService $service) {}

    public function index()
    {
        $reviews = GoogleReview::orderBy('sort_order')
            ->orderBy('reviewed_at', 'desc')
            ->get();

        $rating = SiteSetting::get('google_rating');
        $total = SiteSetting::get('google_reviews_total');

        return Inertia::render('Admin/GoogleReviews/Index', [
            'reviews' => $reviews,
            'placeId' => SiteSetting::get('google_place_id', ''),
            'hasApiKey' => ! empty(config('services.google.places.api_key')),
            'rating' => $rating !== null ? (float) $rating : null,
            'total' => $total !== null ? (int) $total : null,
        ]);
    }

    /**
     * AJAX helper: resolve a Place ID from a free-text business name.
     */
    public function search(Request $request)
    {
        $validated = $request->validate([
            'query' => 'required|string|max:255',
        ]);

        $candidates = $this->service->findPlaceId($validated['query']);

        if ($candidates === null) {
            return response()->json([
                'success' => false,
                'error' => 'Could not search Google. Check that the API key is configured and valid.',
                'candidates' => [],
            ]);
        }

        return response()->json([
            'success' => true,
            'candidates' => $candidates,
        ]);
    }

    /**
     * Save the Place ID and import its reviews from Google.
     */
    public function sync(Request $request)
    {
        $validated = $request->validate([
            'place_id' => 'required|string|max:255',
        ]);

        SiteSetting::set('google_place_id', $validated['place_id']);

        $result = $this->service->import($validated['place_id']);

        if (! empty($result['error'])) {
            return redirect()->route('admin.google-reviews.index')
                ->with('error', 'Could not import reviews: '.$result['error']);
        }

        $message = "Imported {$result['imported']} review(s) from Google.";
        if (! empty($result['rating'])) {
            $message .= " Overall rating: {$result['rating']}";
            if (! empty($result['total'])) {
                $message .= " ({$result['total']} reviews)";
            }
            $message .= '.';
        }

        return redirect()->route('admin.google-reviews.index')
            ->with('success', $message);
    }

    /**
     * Inline update of a single review's visibility / sort order.
     */
    public function update(Request $request, GoogleReview $googleReview)
    {
        $validated = $request->validate([
            'is_visible' => 'sometimes|boolean',
            'sort_order' => 'sometimes|integer',
        ]);

        $googleReview->update($validated);

        return redirect()->route('admin.google-reviews.index')
            ->with('success', 'Review updated successfully.');
    }

    public function destroy(GoogleReview $googleReview)
    {
        $googleReview->delete();

        return redirect()->route('admin.google-reviews.index')
            ->with('success', 'Review deleted successfully.');
    }
}
