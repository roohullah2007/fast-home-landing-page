<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteSettingsController extends Controller
{
    public function index()
    {
        $reviewsEmbedCode = SiteSetting::get('reviews_embed_code', '');
        $contactPhone = SiteSetting::get('contact_phone', '(888) 555-1234');
        $contactEmail = SiteSetting::get('contact_email', 'sellnow@fasthomecashoffers.com');
        $officeAddress = SiteSetting::get('office_address', '123 Main Street, Your City, Your State, 12345');

        return Inertia::render('Admin/SiteSettings', [
            'reviewsEmbedCode' => $reviewsEmbedCode,
            'contactPhone' => $contactPhone,
            'contactEmail' => $contactEmail,
            'officeAddress' => $officeAddress
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'reviews_embed_code' => 'nullable|string',
            'contact_phone' => 'nullable|string|max:20',
            'contact_email' => 'nullable|email|max:100',
            'office_address' => 'nullable|string|max:255'
        ]);

        SiteSetting::set('reviews_embed_code', $request->input('reviews_embed_code', ''));
        SiteSetting::set('contact_phone', $request->input('contact_phone', ''));
        SiteSetting::set('contact_email', $request->input('contact_email', ''));
        SiteSetting::set('office_address', $request->input('office_address', ''));

        return redirect()->back()->with('success', 'Site settings updated successfully!');
    }
}
