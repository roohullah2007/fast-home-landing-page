<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadController extends Controller
{
    public function index(Request $request)
    {
        $query = Lead::query();

        // Filter by status if provided
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Filter by source if provided
        if ($request->has('source') && $request->source) {
            $query->where('source', $request->source);
        }

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('city', 'like', "%{$search}%");
            });
        }

        $leads = $query->orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('Admin/Leads/Index', [
            'leads' => $leads,
            'filters' => $request->only(['status', 'source', 'search']),
            'stats' => [
                'total' => Lead::count(),
                'new' => Lead::where('status', 'new')->count(),
                'contacted' => Lead::where('status', 'contacted')->count(),
                'qualified' => Lead::where('status', 'qualified')->count(),
                'converted' => Lead::where('status', 'converted')->count(),
            ]
        ]);
    }

    public function show(Lead $lead)
    {
        return Inertia::render('Admin/Leads/Show', [
            'lead' => $lead
        ]);
    }

    public function update(Request $request, Lead $lead)
    {
        $request->validate([
            'status' => 'required|in:new,contacted,qualified,converted,closed',
        ]);

        $lead->update([
            'status' => $request->status
        ]);

        return back()->with('success', 'Lead status updated successfully!');
    }

    public function destroy(Lead $lead)
    {
        $lead->delete();
        return redirect()->route('admin.leads.index')->with('success', 'Lead deleted successfully!');
    }
}
