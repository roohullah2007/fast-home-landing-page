<?php

namespace App\Http\Controllers;

use App\Models\TeamMember;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function index()
    {
        $teamMembers = TeamMember::active()->ordered()->get();
        
        return Inertia::render('MeetTheTeamPage', [
            'teamMembers' => $teamMembers,
        ]);
    }

    public function show($id)
    {
        $teamMember = TeamMember::active()->find($id);
        
        if (!$teamMember) {
            return Inertia::render('TeamMemberPage', [
                'teamMember' => null,
            ]);
        }
        
        return Inertia::render('TeamMemberPage', [
            'teamMember' => $teamMember,
        ]);
    }
}
