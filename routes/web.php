<?php

use App\Http\Controllers\Admin\BlogController as AdminBlogController;
use App\Http\Controllers\Admin\ContactMessageController as AdminContactMessageController;
use App\Http\Controllers\Admin\GoogleReviewController as AdminGoogleReviewController;
use App\Http\Controllers\Admin\ImageUploadController;
use App\Http\Controllers\Admin\LeadController as AdminLeadController;
use App\Http\Controllers\Admin\SiteSettingsController;
use App\Http\Controllers\Admin\TeamMemberController as AdminTeamMemberController;
// use App\Http\Controllers\Admin\VacancyController as AdminVacancyController; // Removed - No longer using internal job postings
use App\Http\Controllers\Admin\TestimonialController as AdminTestimonialController;
use App\Http\Controllers\Admin\VideoTestimonialController as AdminVideoTestimonialController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SitemapController;
// use App\Http\Controllers\Admin\JobApplicationController as AdminJobApplicationController; // Removed - No longer using internal job postings
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TestimonialController;
use App\Models\SiteSetting;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Favicon fallback routes to prevent 404 errors.
// Real sized icons in public/ are served statically; these only catch sizes
// without a matching static file and serve the high-res apple-touch icon.
Route::get('/favicon-{size}.png', function ($size) {
    return response()->file(public_path('apple-touch-icon.png'));
})->where('size', '[0-9]+x[0-9]+');

Route::get('/apple-touch-icon{size?}.png', function ($size = '') {
    return response()->file(public_path('apple-touch-icon.png'));
})->where('size', '-[0-9]+x[0-9]+');

// Main (and only) public landing page. Root and /our-approach both render it.
Route::get('/', function () {
    return Inertia::render('ApproachPage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

Route::get('/our-approach', function () {
    return Inertia::render('ApproachPage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('our-approach');

// Confirmed page - only reached when a qualifying lead is submitted
// (property owner = yes AND listed on the market = yes). Routing decided in LeadController.
Route::get('/confirmed', function () {
    return Inertia::render('ConfirmedPage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('confirmed');

// Thank you page (non-qualifying leads and any other form submissions land here)
Route::get('/thank-you', function () {
    $type = request('type', 'general');

    return Inertia::render('ThankYouPage', [
        'type' => $type,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('thank-you');

// API routes for form submissions
Route::post('/api/leads', [LeadController::class, 'store'])->name('api.leads.store');
Route::post('/api/contact', [ContactController::class, 'store'])->name('api.contact.store');
Route::post('/api/newsletter', [\App\Http\Controllers\NewsletterController::class, 'store'])->name('api.newsletter.store');
Route::post('/api/analytics/track', [\App\Http\Controllers\Admin\AnalyticsController::class, 'track'])->name('api.analytics.track');
Route::post('/api/upload/image', [\App\Http\Controllers\Api\UploadController::class, 'uploadImage'])->name('api.upload.image')->middleware('auth');

// Configuration endpoint for frontend
Route::get('/api/config', function () {
    return response()->json([
        'recaptcha' => [
            'enabled' => ! empty(config('services.google.recaptcha.site_key')),
            'site_key' => config('services.google.recaptcha.site_key'),
        ],
        'google_places' => [
            'enabled' => ! empty(config('services.google.places.api_key')),
            'api_key' => config('services.google.places.api_key'),
        ],
    ]);
})->name('api.config');

// Also support POST for form start tracking
Route::post('/api/config', function () {
    // Handle form start tracking silently
    return response()->json(['status' => 'ok']);
})->name('api.config.post');

Route::get('/dashboard', function () {
    $stats = [];
    try {
        $stats = [
            // 'vacancies' => \App\Models\Vacancy::count(), // Removed - Using Indeed for job postings
            'teamMembers' => \App\Models\TeamMember::count(),
            'testimonials' => \App\Models\Testimonial::count(),
            'videoTestimonials' => \App\Models\Testimonial::whereNotNull('video_url')->where('video_url', '!=', '')->count(),
            // 'activeVacancies' => \App\Models\Vacancy::where('is_active', true)->count(), // Removed
            'blogPosts' => \App\Models\BlogPost::count(),
            'publishedPosts' => \App\Models\BlogPost::where('status', 'published')->count(),
            'leads' => \App\Models\Lead::count(),
            'newLeads' => \App\Models\Lead::where('status', 'new')->count(),
            'contactMessages' => \App\Models\ContactMessage::count(),
            'newContactMessages' => \App\Models\ContactMessage::where('status', 'new')->count(),
            // 'jobApplications' => \App\Models\JobApplication::count(), // Removed - Using Indeed
            // 'newJobApplications' => \App\Models\JobApplication::where('status', 'new')->count(), // Removed
            'activePages' => \App\Models\Page::where('is_active', true)->count(),
            'totalPages' => \App\Models\Page::count(),
        ];
    } catch (\Exception $e) {
        $stats = [
            // 'vacancies' => 0, // Removed
            'teamMembers' => 0,
            'testimonials' => 0,
            'videoTestimonials' => 0,
            // 'activeVacancies' => 0, // Removed
            'blogPosts' => 0,
            'publishedPosts' => 0,
            'leads' => 0,
            'newLeads' => 0,
            'contactMessages' => 0,
            'newContactMessages' => 0,
            // 'jobApplications' => 0, // Removed
            // 'newJobApplications' => 0, // Removed
            'activePages' => 0,
            'totalPages' => 0,
        ];
    }

    return Inertia::render('AdminDashboard', [
        'stats' => $stats,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin routes
    Route::prefix('admin')->name('admin.')->group(function () {
        // Route::resource('vacancies', AdminVacancyController::class); // Removed - Using Indeed for job postings
        Route::resource('team-members', AdminTeamMemberController::class)->except(['show']);
        Route::resource('testimonials', AdminTestimonialController::class);
        Route::resource('video-testimonials', AdminVideoTestimonialController::class)
            ->parameters(['video-testimonials' => 'videoTestimonial'])
            ->except(['show']);
        // Google Reviews (pulled from the Google Places API)
        Route::get('google-reviews', [AdminGoogleReviewController::class, 'index'])->name('google-reviews.index');
        Route::post('google-reviews/search', [AdminGoogleReviewController::class, 'search'])->name('google-reviews.search');
        Route::post('google-reviews/sync', [AdminGoogleReviewController::class, 'sync'])->name('google-reviews.sync');
        Route::patch('google-reviews/{googleReview}', [AdminGoogleReviewController::class, 'update'])->name('google-reviews.update');
        Route::delete('google-reviews/{googleReview}', [AdminGoogleReviewController::class, 'destroy'])->name('google-reviews.destroy');

        Route::resource('blog', AdminBlogController::class);
        Route::resource('leads', AdminLeadController::class);
        Route::resource('contact-messages', AdminContactMessageController::class);
        // Route::resource('job-applications', AdminJobApplicationController::class); // Removed - Using Indeed

        // Settings Management
        Route::get('settings', [\App\Http\Controllers\Admin\SettingsController::class, 'index'])->name('settings.index');
        Route::post('settings', [\App\Http\Controllers\Admin\SettingsController::class, 'update'])->name('settings.update');
        Route::post('settings/test-google-places', [\App\Http\Controllers\Admin\SettingsController::class, 'testGooglePlaces'])->name('settings.test-google-places');

        // Site Settings Management (Reviews, etc.)
        Route::get('site-settings', [SiteSettingsController::class, 'index'])->name('site-settings.index');
        Route::post('site-settings', [SiteSettingsController::class, 'update'])->name('site-settings.update');

        // Page Management
        Route::resource('pages', \App\Http\Controllers\Admin\PageController::class);
        Route::post('pages/{page}/toggle', [\App\Http\Controllers\Admin\PageController::class, 'toggle'])->name('pages.toggle');
        Route::post('pages/bulk-toggle', [\App\Http\Controllers\Admin\PageController::class, 'bulkToggle'])->name('pages.bulk-toggle');

        // Analytics
        Route::get('analytics', [\App\Http\Controllers\Admin\AnalyticsController::class, 'index'])->name('analytics.index');
        Route::post('analytics/track', [\App\Http\Controllers\Admin\AnalyticsController::class, 'track'])->name('analytics.track');

        // SEO Management
        Route::get('seo', [\App\Http\Controllers\Admin\SEOController::class, 'index'])->name('seo.index');
        Route::post('seo/update-settings', [\App\Http\Controllers\Admin\SEOController::class, 'updateSettings'])->name('seo.update-settings');
        Route::post('seo/generate-slug', [\App\Http\Controllers\Admin\SEOController::class, 'generateSlug'])->name('seo.generate-slug');
        Route::post('seo/preview', [\App\Http\Controllers\Admin\SEOController::class, 'previewSEO'])->name('seo.preview');
        Route::post('seo/update-permalinks', [\App\Http\Controllers\Admin\SEOController::class, 'updateBlogPermalinks'])->name('seo.update-permalinks');

        // Spam Protection Management
        Route::get('spam-protection', [\App\Http\Controllers\Admin\SpamProtectionController::class, 'index'])->name('spam-protection.index');
        Route::get('spam-protection/logs', [\App\Http\Controllers\Admin\SpamProtectionController::class, 'logs'])->name('spam-protection.logs');
        Route::delete('spam-protection/cleanup', [\App\Http\Controllers\Admin\SpamProtectionController::class, 'cleanup'])->name('spam-protection.cleanup');
        Route::post('spam-protection/block-ip', [\App\Http\Controllers\Admin\SpamProtectionController::class, 'blockIp'])->name('spam-protection.block-ip');
        Route::get('spam-protection/export', [\App\Http\Controllers\Admin\SpamProtectionController::class, 'export'])->name('spam-protection.export');

        // Image upload routes
        Route::post('upload-image', [ImageUploadController::class, 'upload'])->name('upload-image');
        Route::post('upload-featured-image', [ImageUploadController::class, 'uploadFeatured'])->name('upload-featured-image');

        // Test storage route
        Route::get('test-storage', function () {
            $storagePath = storage_path('app/public');
            $publicPath = public_path('storage');

            return response()->json([
                'storage_path_exists' => is_dir($storagePath),
                'storage_path' => $storagePath,
                'public_symlink_exists' => is_link($publicPath),
                'public_path' => $publicPath,
                'storage_writable' => is_writable($storagePath),
                'php_user' => get_current_user(),
                'permissions' => substr(sprintf('%o', fileperms($storagePath)), -4),
            ]);
        })->name('test-storage');
    });
});

require __DIR__.'/auth.php';
