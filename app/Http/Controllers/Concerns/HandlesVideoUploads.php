<?php

namespace App\Http\Controllers\Concerns;

use Illuminate\Http\Request;

trait HandlesVideoUploads
{
    /**
     * Move an uploaded video into public/videos and return its public URL.
     * Returns null when no video file was submitted.
     */
    protected function storeVideoUpload(Request $request, string $field = 'video'): ?string
    {
        if (! $request->hasFile($field)) {
            return null;
        }

        $video = $request->file($field);

        // Sanitize the original filename so the public URL has no spaces or
        // odd characters (which break when referenced from the browser).
        $name = pathinfo($video->getClientOriginalName(), PATHINFO_FILENAME);
        $safe = preg_replace('/[^A-Za-z0-9_-]+/', '-', $name) ?: 'video';
        $fileName = time() . '_' . trim($safe, '-') . '.' . strtolower($video->getClientOriginalExtension());

        $video->move(public_path('videos'), $fileName);

        return '/videos/' . $fileName;
    }

    /**
     * Remove a previously uploaded local video file (ignores external URLs).
     */
    protected function deleteLocalVideo(?string $videoUrl): void
    {
        if ($videoUrl && str_starts_with($videoUrl, '/videos/') && file_exists(public_path($videoUrl))) {
            @unlink(public_path($videoUrl));
        }
    }
}
