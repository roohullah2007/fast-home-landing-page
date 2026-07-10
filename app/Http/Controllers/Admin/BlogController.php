<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogPosts = BlogPost::latest()
            ->select([
                'id', 'title', 'slug', 'excerpt', 'status', 
                'published_at', 'is_featured', 'views', 
                'author_name', 'featured_image', 'created_at'
            ])
            ->get();

        return Inertia::render('Admin/Blog/Index', [
            'blogPosts' => $blogPosts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Blog/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:blog_posts',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'featured_image' => 'nullable|url',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:255',
            'tags' => 'nullable|string',
            'category' => 'nullable|string|max:100',
            'status' => 'required|in:draft,published,archived',
            'published_at' => 'nullable|date',
            'is_featured' => 'boolean',
            'allow_comments' => 'boolean',
        ]);

        // Auto-generate slug if not provided
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        // Set author information
        $validated['author_id'] = auth()->id();
        $validated['author_name'] = auth()->user()->name;

        // Set published_at if status is published and no date is set
        if ($validated['status'] === 'published' && empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        $blogPost = BlogPost::create($validated);

        return redirect()->route('admin.blog.index')
            ->with('success', 'Blog post created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $blogPost = BlogPost::findOrFail($id);
        
        return Inertia::render('Admin/Blog/Show', [
            'blogPost' => $blogPost
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $blogPost = BlogPost::findOrFail($id);
        
        return Inertia::render('Admin/Blog/Edit', [
            'blogPost' => $blogPost
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $blogPost = BlogPost::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:blog_posts,slug,' . $blogPost->id,
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'featured_image' => 'nullable|url',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:255',
            'tags' => 'nullable|string',
            'category' => 'nullable|string|max:100',
            'status' => 'required|in:draft,published,archived',
            'published_at' => 'nullable|date',
            'is_featured' => 'boolean',
            'allow_comments' => 'boolean',
        ]);

        // Auto-generate slug if not provided
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        // Set published_at if status is published and no date is set
        if ($validated['status'] === 'published' && empty($validated['published_at']) && $blogPost->status !== 'published') {
            $validated['published_at'] = now();
        }

        $blogPost->update($validated);

        return redirect()->route('admin.blog.index')
            ->with('success', 'Blog post updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $blogPost = BlogPost::findOrFail($id);
        $blogPost->delete();

        return redirect()->route('admin.blog.index')
            ->with('success', 'Blog post deleted successfully.');
    }
}
