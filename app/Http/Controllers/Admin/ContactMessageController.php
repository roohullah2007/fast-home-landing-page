<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactMessageController extends Controller
{
    public function index(Request $request)
    {
        $query = ContactMessage::query();

        // Filter by status if provided
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%");
            });
        }

        $contacts = $query->orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('Admin/ContactMessages/Index', [
            'contacts' => $contacts,
            'filters' => $request->only(['status', 'search']),
            'stats' => [
                'total' => ContactMessage::count(),
                'new' => ContactMessage::where('status', 'new')->count(),
                'replied' => ContactMessage::where('status', 'replied')->count(),
                'closed' => ContactMessage::where('status', 'closed')->count(),
            ]
        ]);
    }

    public function show(ContactMessage $contactMessage)
    {
        return Inertia::render('Admin/ContactMessages/Show', [
            'contact' => $contactMessage
        ]);
    }

    public function update(Request $request, ContactMessage $contactMessage)
    {
        $request->validate([
            'status' => 'required|in:new,replied,closed',
        ]);

        $contactMessage->update([
            'status' => $request->status
        ]);

        return back()->with('success', 'Contact message status updated successfully!');
    }

    public function destroy(ContactMessage $contactMessage)
    {
        $contactMessage->delete();
        return redirect()->route('admin.contact-messages.index')->with('success', 'Contact message deleted successfully!');
    }
}
