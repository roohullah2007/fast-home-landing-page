<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\HandlesVideoUploads;
use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class VideoTestimonialController extends Controller
{
    use HandlesVideoUploads;

    public function index()
    {
        $videoTestimonials = Testimonial::whereNotNull('video_url')
            ->where('video_url', '!=', '')
            ->orderBy('is_featured', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/VideoTestimonials/Index', [
            'videoTestimonials' => $videoTestimonials,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/VideoTestimonials/Create');
    }

    public function store(Request $request)
    {
        $validated = $this->validateData($request);

        // An uploaded video file takes precedence over a pasted URL.
        $videoUrl = $this->storeVideoUpload($request) ?? $validated['video_url'] ?? null;

        Testimonial::create([
            'name' => $validated['customer_name'],
            'location' => $validated['location'] ?? null,
            'content' => $validated['content'] ?? '',
            'video_url' => $videoUrl,
            'rating' => $validated['rating'] ?? 5,
            'is_featured' => $validated['is_featured'] ?? false,
            'is_active' => true,
        ]);

        return redirect()->route('admin.video-testimonials.index')
            ->with('success', 'Video testimonial created successfully.');
    }

    public function edit(Testimonial $videoTestimonial)
    {
        return Inertia::render('Admin/VideoTestimonials/Edit', [
            'videoTestimonial' => $videoTestimonial,
        ]);
    }

    public function update(Request $request, Testimonial $videoTestimonial)
    {
        $validated = $this->validateData($request);

        $updateData = [
            'name' => $validated['customer_name'],
            'location' => $validated['location'] ?? null,
            'content' => $validated['content'] ?? '',
            'rating' => $validated['rating'] ?? 5,
            'is_featured' => $validated['is_featured'] ?? false,
        ];

        // A newly uploaded video replaces the existing one (and pasted URL).
        if ($uploaded = $this->storeVideoUpload($request)) {
            $this->deleteLocalVideo($videoTestimonial->video_url);
            $updateData['video_url'] = $uploaded;
        } else {
            $updateData['video_url'] = $validated['video_url'] ?? $videoTestimonial->video_url;
        }

        $videoTestimonial->update($updateData);

        return redirect()->route('admin.video-testimonials.index')
            ->with('success', 'Video testimonial updated successfully.');
    }

    public function destroy(Testimonial $videoTestimonial)
    {
        $this->deleteLocalVideo($videoTestimonial->video_url);
        $videoTestimonial->delete();

        return redirect()->route('admin.video-testimonials.index')
            ->with('success', 'Video testimonial deleted successfully.');
    }

    /**
     * Validate the request and ensure a video source (upload or URL) is present.
     */
    private function validateData(Request $request): array
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'video_url' => 'nullable|string|max:255',
            'video' => 'nullable|file|mimes:mp4,webm,mov,ogg|max:51200',
            'rating' => 'integer|min:1|max:5',
            'is_featured' => 'boolean',
        ]);

        if (! $request->hasFile('video') && empty($validated['video_url'])) {
            throw ValidationException::withMessages([
                'video' => 'Please upload a video file or provide a video URL.',
            ]);
        }

        return $validated;
    }
}
