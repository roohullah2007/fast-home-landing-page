<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class CareerController extends Controller
{
    /**
     * Display the careers page.
     * Job applications are now handled through Indeed.
     */
    public function index()
    {
        return Inertia::render('CareersPage');
    }

    // Removed apply() method - Job applications now handled through Indeed
    // Removed sendToPodio() method - No longer needed
}
