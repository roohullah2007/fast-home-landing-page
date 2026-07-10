<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageUploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB max
        ]);

        try {
            $image = $request->file('image');
            
            // Generate unique filename
            $filename = time() . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();
            
            // Ensure directory exists
            $directory = 'uploads/blog-images';
            if (!Storage::disk('public')->exists($directory)) {
                Storage::disk('public')->makeDirectory($directory, 0755, true);
            }
            
            // Store in public/uploads/blog-images directory
            $path = $image->storeAs($directory, $filename, 'public');
            
            // Return the full URL
            $url = asset('storage/' . $path);
            
            return response()->json([
                'success' => true,
                'url' => $url,
                'path' => $path
            ]);
            
        } catch (\Exception $e) {
            \Log::error('Image upload error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload image: ' . $e->getMessage()
            ], 500);
        }
    }

    public function uploadFeatured(Request $request)
    {
        $request->validate([
            'featured_image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB max
        ]);

        try {
            $image = $request->file('featured_image');
            
            // Generate unique filename
            $filename = 'featured_' . time() . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();
            
            // Ensure directory exists
            $directory = 'uploads/featured-images';
            if (!Storage::disk('public')->exists($directory)) {
                Storage::disk('public')->makeDirectory($directory, 0755, true);
            }
            
            // Store in public/uploads/featured-images directory
            $path = $image->storeAs($directory, $filename, 'public');
            
            // Return the full URL
            $url = asset('storage/' . $path);
            
            return response()->json([
                'success' => true,
                'url' => $url,
                'path' => $path,
                'full_path' => public_path('storage/' . $path)
            ]);
            
        } catch (\Exception $e) {
            \Log::error('Featured image upload error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload featured image: ' . $e->getMessage()
            ], 500);
        }
    }
}
