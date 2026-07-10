<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TeamMemberController extends Controller
{
    public function index()
    {
        $teamMembers = TeamMember::ordered()->get();

        return Inertia::render('Admin/TeamMembers/Index', [
            'teamMembers' => $teamMembers,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/TeamMembers/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'photo' => 'nullable|image|max:5120',
            'image_url' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'linkedin_url' => 'nullable|url',
            'sort_order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('team-members', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        unset($validated['photo']);

        TeamMember::create($validated);

        return redirect()->route('admin.team-members.index')
            ->with('success', 'Team member created successfully.');
    }

    public function edit(TeamMember $teamMember)
    {
        return Inertia::render('Admin/TeamMembers/Edit', [
            'teamMember' => $teamMember,
        ]);
    }

    public function update(Request $request, TeamMember $teamMember)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'photo' => 'nullable|image|max:5120',
            'image_url' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'linkedin_url' => 'nullable|url',
            'sort_order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('photo')) {
            // Delete old image if it exists in storage
            if ($teamMember->image_url && str_starts_with($teamMember->image_url, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $teamMember->image_url);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('photo')->store('team-members', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        unset($validated['photo']);

        $teamMember->update($validated);

        return redirect()->route('admin.team-members.index')
            ->with('success', 'Team member updated successfully.');
    }

    public function destroy(TeamMember $teamMember)
    {
        // Delete image from storage
        if ($teamMember->image_url && str_starts_with($teamMember->image_url, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $teamMember->image_url);
            Storage::disk('public')->delete($oldPath);
        }

        $teamMember->delete();

        return redirect()->route('admin.team-members.index')
            ->with('success', 'Team member deleted successfully.');
    }
}
