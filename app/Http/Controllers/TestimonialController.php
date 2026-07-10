<?php

namespace App\Http\Controllers;

use App\Models\GoogleReview;
use App\Models\SiteSetting;
use App\Models\Testimonial;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::active()
            ->orderBy('is_featured', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        $googleReviews = GoogleReview::visible()
            ->orderBy('sort_order')
            ->orderBy('reviewed_at', 'desc')
            ->get();

        $googleRating = SiteSetting::get('google_rating');
        $googleReviewsTotal = SiteSetting::get('google_reviews_total');

        return Inertia::render('TestimonialsPage', [
            'testimonials' => $testimonials,
            'googleReviews' => $googleReviews,
            'googleRating' => $googleRating !== null ? (float) $googleRating : null,
            'googleReviewsTotal' => $googleReviewsTotal !== null ? (int) $googleReviewsTotal : null,
        ]);
    }
}
