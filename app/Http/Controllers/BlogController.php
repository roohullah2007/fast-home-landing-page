<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display a listing of published blog posts.
     */
    public function index()
    {
        $blogPosts = BlogPost::published()
            ->latest('published_at')
            ->select([
                'id', 'title', 'slug', 'excerpt', 'featured_image',
                'published_at', 'author_name', 'category', 'views'
            ])
            ->paginate(12);

        $featuredPosts = BlogPost::published()
            ->featured()
            ->latest('published_at')
            ->select([
                'id', 'title', 'slug', 'excerpt', 'featured_image',
                'published_at', 'author_name', 'category'
            ])
            ->take(3)
            ->get();

        return Inertia::render('BlogPage', [
            'blogPosts' => $blogPosts,
            'featuredPosts' => $featuredPosts,
            'canLogin' => \Illuminate\Support\Facades\Route::has('login'),
            'canRegister' => \Illuminate\Support\Facades\Route::has('register'),
        ]);
    }

    /**
     * Display the specified blog post.
     */
    public function show($slug)
    {
        $blogPost = BlogPost::published()
            ->where('slug', $slug)
            ->firstOrFail();

        // Increment view count
        $blogPost->increment('views');
        
        // Add SEO data
        $blogPost->canonical_url = $blogPost->getCanonicalUrlAttribute();
        $blogPost->og_image = $blogPost->getOpenGraphImageAttribute();

        $relatedPosts = BlogPost::published()
            ->where('id', '!=', $blogPost->id)
            ->where('category', $blogPost->category)
            ->latest('published_at')
            ->take(3)
            ->select(['id', 'title', 'slug', 'excerpt', 'featured_image', 'published_at'])
            ->get();

        return Inertia::render('BlogPostPage', [
            'blogPost' => $blogPost,
            'relatedPosts' => $relatedPosts,
            'canLogin' => \Illuminate\Support\Facades\Route::has('login'),
            'canRegister' => \Illuminate\Support\Facades\Route::has('register'),
        ]);
    }
}
