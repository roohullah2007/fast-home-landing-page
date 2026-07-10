<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    /**
     * Display a listing of pages
     */
    public function index()
    {
        $pages = Page::ordered()->get();
        
        return Inertia::render('Admin/Pages/Index', [
            'pages' => $pages
        ]);
    }

    /**
     * Show the form for creating a new page
     */
    public function create()
    {
        return Inertia::render('Admin/Pages/Create');
    }

    /**
     * Store a newly created page in storage
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:pages',
            'route' => 'required|string|max:255|unique:pages',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0'
        ]);

        Page::create($validated);

        return redirect()->route('admin.pages.index')->with('success', 'Page created successfully.');
    }

    /**
     * Display the specified page
     */
    public function show(Page $page)
    {
        return Inertia::render('Admin/Pages/Show', [
            'page' => $page
        ]);
    }

    /**
     * Show the form for editing the specified page
     */
    public function edit(Page $page)
    {
        return Inertia::render('Admin/Pages/Edit', [
            'page' => $page
        ]);
    }

    /**
     * Update the specified page in storage
     */
    public function update(Request $request, Page $page)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:pages,slug,' . $page->id,
            'route' => 'required|string|max:255|unique:pages,route,' . $page->id,
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0'
        ]);

        $page->update($validated);

        return redirect()->route('admin.pages.index')->with('success', 'Page updated successfully.');
    }

    /**
     * Remove the specified page from storage
     */
    public function destroy(Page $page)
    {
        $page->delete();

        return redirect()->route('admin.pages.index')->with('success', 'Page deleted successfully.');
    }

    /**
     * Toggle page status
     */
    public function toggle(Page $page)
    {
        $page->update(['is_active' => !$page->is_active]);

        return back()->with('success', 'Page status updated successfully.');
    }

    /**
     * Bulk toggle pages
     */
    public function bulkToggle(Request $request)
    {
        $request->validate([
            'page_ids' => 'required|array',
            'page_ids.*' => 'exists:pages,id',
            'action' => 'required|in:activate,deactivate'
        ]);

        $isActive = $request->action === 'activate';
        
        Page::whereIn('id', $request->page_ids)->update(['is_active' => $isActive]);

        $message = $isActive ? 'Pages activated successfully.' : 'Pages deactivated successfully.';
        
        return back()->with('success', $message);
    }
}
