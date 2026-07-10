<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use App\Models\Vacancy;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobApplicationController extends Controller
{
    public function index(Request $request)
    {
        $query = JobApplication::with('vacancy');

        // Filter by status if provided
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Filter by vacancy if provided
        if ($request->has('vacancy_id') && $request->vacancy_id) {
            $query->where('vacancy_id', $request->vacancy_id);
        }

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        $applications = $query->orderBy('created_at', 'desc')->paginate(15);
        $vacancies = Vacancy::select('id', 'title')->get();

        return Inertia::render('Admin/JobApplications/Index', [
            'applications' => $applications,
            'vacancies' => $vacancies,
            'filters' => $request->only(['status', 'vacancy_id', 'search']),
            'stats' => [
                'total' => JobApplication::count(),
                'new' => JobApplication::where('status', 'new')->count(),
                'reviewed' => JobApplication::where('status', 'reviewed')->count(),
                'interview' => JobApplication::where('status', 'interview')->count(),
                'hired' => JobApplication::where('status', 'hired')->count(),
                'rejected' => JobApplication::where('status', 'rejected')->count(),
            ]
        ]);
    }

    public function show(JobApplication $jobApplication)
    {
        $jobApplication->load('vacancy');
        
        return Inertia::render('Admin/JobApplications/Show', [
            'application' => $jobApplication
        ]);
    }

    public function update(Request $request, JobApplication $jobApplication)
    {
        $request->validate([
            'status' => 'required|in:new,reviewed,interview,hired,rejected',
        ]);

        $jobApplication->update([
            'status' => $request->status
        ]);

        return back()->with('success', 'Application status updated successfully!');
    }

    public function destroy(JobApplication $jobApplication)
    {
        $jobApplication->delete();
        return redirect()->route('admin.job-applications.index')->with('success', 'Application deleted successfully!');
    }
}
