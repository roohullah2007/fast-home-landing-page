<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Vacancy;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VacancyController extends Controller
{
    public function index()
    {
        $vacancies = Vacancy::orderBy('created_at', 'desc')->get();
        
        return Inertia::render('Admin/Vacancies/Index', [
            'vacancies' => $vacancies,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Vacancies/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'department' => 'nullable|string|max:255',
            'description' => 'required|string',
            'requirements' => 'nullable|string',
            'responsibilities' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'employment_type' => 'required|in:full-time,part-time,contract',
            'salary_min' => 'nullable|numeric|min:0',
            'salary_max' => 'nullable|numeric|min:0',
            'experience_level' => 'nullable|in:entry,mid,senior',
            'is_active' => 'boolean',
            'podio_webhook_url' => 'nullable|url',
        ]);

        Vacancy::create($request->all());

        return redirect()->route('admin.vacancies.index')
            ->with('success', 'Vacancy created successfully.');
    }

    public function edit(Vacancy $vacancy)
    {
        return Inertia::render('Admin/Vacancies/Edit', [
            'vacancy' => $vacancy,
        ]);
    }

    public function update(Request $request, Vacancy $vacancy)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'department' => 'nullable|string|max:255',
            'description' => 'required|string',
            'requirements' => 'nullable|string',
            'responsibilities' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'employment_type' => 'required|in:full-time,part-time,contract',
            'salary_min' => 'nullable|numeric|min:0',
            'salary_max' => 'nullable|numeric|min:0',
            'experience_level' => 'nullable|in:entry,mid,senior',
            'is_active' => 'boolean',
            'podio_webhook_url' => 'nullable|url',
        ]);

        $vacancy->update($request->all());

        return redirect()->route('admin.vacancies.index')
            ->with('success', 'Vacancy updated successfully.');
    }

    public function destroy(Vacancy $vacancy)
    {
        $vacancy->delete();

        return redirect()->route('admin.vacancies.index')
            ->with('success', 'Vacancy deleted successfully.');
    }
}
