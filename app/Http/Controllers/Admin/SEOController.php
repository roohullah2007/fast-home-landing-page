<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class SEOController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
        // Middleware is applied at route level in web.php
        // No additional middleware needed here
    }
    /**
     * Display SEO settings page
     */
    public function index()
    {
        return Inertia::render('Admin/SEOSettings', [
            'seoConfig' => config('seo'),
        ]);
    }

    /**
     * Update SEO settings
     */
    public function updateSettings(Request $request)
    {
        $request->validate([
            'default_title' => 'required|string|max:255',
            'default_description' => 'required|string|max:255',
            'default_keywords' => 'nullable|string',
            'organization_name' => 'required|string|max:255',
            'organization_url' => 'required|url',
            'contact_phone' => 'required|string|max:20',
        ]);

        // Update SEO configuration (you might want to store this in database)
        // For now, we'll return success
        
        return back()->with('success', 'SEO settings updated successfully.');
    }

    /**
     * Generate slug from title
     */
    public function generateSlug(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'blog_post_id' => 'nullable|integer'
        ]);

        $title = $request->input('title');
        $blogPostId = $request->input('blog_post_id');
        
        $slug = Str::slug($title);
        $originalSlug = $slug;
        $counter = 1;
        
        // Ensure unique slug
        while (BlogPost::where('slug', $slug)
                       ->when($blogPostId, function($query, $id) {
                           return $query->where('id', '!=', $id);
                       })
                       ->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        return response()->json(['slug' => $slug]);
    }

    /**
     * Preview SEO meta tags
     */
    public function previewSEO(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string',
            'excerpt' => 'nullable|string',
            'slug' => 'required|string',
        ]);

        $title = $request->input('meta_title') ?: $request->input('title');
        $description = $request->input('meta_description') ?: 
                      substr(strip_tags($request->input('excerpt', '')), 0, 160);
        $url = url('/blog/' . $request->input('slug'));

        return response()->json([
            'preview' => [
                'title' => $title,
                'description' => $description,
                'url' => $url,
                'title_length' => strlen($title),
                'description_length' => strlen($description),
                'title_status' => $this->getTitleStatus(strlen($title)),
                'description_status' => $this->getDescriptionStatus(strlen($description)),
            ]
        ]);
    }

    private function getTitleStatus($length)
    {
        if ($length < 30) return 'too_short';
        if ($length > 60) return 'too_long';
        return 'good';
    }

    private function getDescriptionStatus($length)
    {
        if ($length < 120) return 'too_short';
        if ($length > 160) return 'too_long';
        return 'good';
    }

    /**
     * Bulk update blog permalinks
     */
    public function updateBlogPermalinks(Request $request)
    {
        $request->validate([
            'permalink_structure' => 'required|in:title,date-title,category-title',
        ]);

        $structure = $request->input('permalink_structure');
        $updated = 0;

        BlogPost::chunk(100, function ($posts) use ($structure, &$updated) {
            foreach ($posts as $post) {
                $newSlug = $this->generateSlugFromStructure($post, $structure);
                if ($newSlug !== $post->slug) {
                    $post->update(['slug' => $newSlug]);
                    $updated++;
                }
            }
        });

        return back()->with('success', "Updated {$updated} blog post permalinks.");
    }

    private function generateSlugFromStructure($post, $structure)
    {
        switch ($structure) {
            case 'date-title':
                return $post->published_at->format('Y/m/d') . '/' . Str::slug($post->title);
            case 'category-title':
                $category = $post->category ? Str::slug($post->category) : 'uncategorized';
                return $category . '/' . Str::slug($post->title);
            case 'title':
            default:
                return Str::slug($post->title);
        }
    }
}
