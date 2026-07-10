<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Concerns\HandlesVideoUploads;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    use HandlesVideoUploads;

    public function index()
    {
        $testimonials = Testimonial::orderBy('created_at', 'desc')->get();
        
        return Inertia::render('Admin/Testimonials/Index', [
            'testimonials' => $testimonials,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Testimonials/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'content' => 'required|string',
            'video_url' => 'nullable|string|max:255',
            'video' => 'nullable|file|mimes:mp4,webm,mov,ogg|max:51200',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'rating' => 'integer|min:1|max:5',
            'is_featured' => 'boolean',
        ]);

        // Handle image upload
        $imageUrl = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('images/testimonials'), $imageName);
            $imageUrl = '/images/testimonials/' . $imageName;
        }

        // An uploaded video file takes precedence over a pasted URL.
        $videoUrl = $validated['video_url'] ?? null;
        if ($uploaded = $this->storeVideoUpload($request)) {
            $videoUrl = $uploaded;
        }

        Testimonial::create([
            'name' => $validated['customer_name'],
            'location' => $validated['location'] ?? null,
            'content' => $validated['content'],
            'video_url' => $videoUrl,
            'image_url' => $imageUrl,
            'rating' => $validated['rating'],
            'is_featured' => $validated['is_featured'] ?? false,
            'is_active' => true,
        ]);

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimonial created successfully.');
    }

    public function edit(Testimonial $testimonial)
    {
        return Inertia::render('Admin/Testimonials/Edit', [
            'testimonial' => $testimonial,
        ]);
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'content' => 'required|string',
            'video_url' => 'nullable|string|max:255',
            'video' => 'nullable|file|mimes:mp4,webm,mov,ogg|max:51200',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'rating' => 'integer|min:1|max:5',
            'is_featured' => 'boolean',
        ]);

        $updateData = [
            'name' => $validated['customer_name'],
            'location' => $validated['location'] ?? null,
            'content' => $validated['content'],
            'video_url' => $validated['video_url'] ?? null,
            'rating' => $validated['rating'],
            'is_featured' => $validated['is_featured'] ?? false,
        ];

        // A newly uploaded video replaces the existing one (and pasted URL).
        if ($uploaded = $this->storeVideoUpload($request)) {
            $this->deleteLocalVideo($testimonial->video_url);
            $updateData['video_url'] = $uploaded;
        }

        // Handle image upload if new image provided
        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($testimonial->image_url && file_exists(public_path($testimonial->image_url))) {
                unlink(public_path($testimonial->image_url));
            }

            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('images/testimonials'), $imageName);
            $updateData['image_url'] = '/images/testimonials/' . $imageName;
        }

        $testimonial->update($updateData);

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimonial updated successfully.');
    }

    public function destroy(Testimonial $testimonial)
    {
        // Delete image file if it exists
        if ($testimonial->image_url && file_exists(public_path($testimonial->image_url))) {
            unlink(public_path($testimonial->image_url));
        }

        // Delete uploaded video file if it exists
        $this->deleteLocalVideo($testimonial->video_url);

        $testimonial->delete();

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimonial deleted successfully.');
    }
}
