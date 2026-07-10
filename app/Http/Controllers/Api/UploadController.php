<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:5120', // 5MB max
        ]);

        try {
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                
                // Generate unique filename
                $filename = Str::random(20) . '_' . time() . '.' . $image->getClientOriginalExtension();
                
                // Store image in public/uploads directory
                $path = $image->storeAs('uploads/team', $filename, 'public');
                
                // Get the full URL
                $url = Storage::url($path);
                
                return response()->json([
                    'success' => true,
                    'url' => $url,
                    'path' => $path,
                    'message' => 'Image uploaded successfully'
                ], 200);
            }
            
            return response()->json([
                'success' => false,
                'message' => 'No image provided'
            ], 400);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Upload failed: ' . $e->getMessage()
            ], 500);
        }
    }
}