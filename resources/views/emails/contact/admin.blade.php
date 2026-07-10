@extends('emails.layout')

@section('title', 'New Contact Message')

@section('content')
    <h1 style="margin:0 0 8px; font-size:22px; color:#0f172a;">New Contact Message ✉️</h1>
    <p style="margin:0 0 20px; font-size:15px; color:#475569; line-height:1.6;">
        Someone just sent a message through the contact form.
    </p>

    @include('emails.partials.details', ['rows' => [
        'Name' => $contact->full_name,
        'Email' => $contact->email,
        'Phone' => $contact->phone,
        'Property Address' => $contact->address,
        'Message' => $contact->message,
        'Is the Owner?' => $contact->is_owner ? ucfirst($contact->is_owner) : null,
        'Currently Listed?' => $contact->is_listed ? ucfirst($contact->is_listed) : null,
        'Best Time to Call' => $contact->best_time ? ucfirst($contact->best_time) : null,
        'Preferred Contact' => $contact->contact_method ? ucfirst($contact->contact_method) : null,
        'Heard About Us' => $contact->hear_about ? ucfirst($contact->hear_about) : null,
        'Submitted' => optional($contact->created_at)->format('M j, Y g:i A'),
    ]])

    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 0;">
        <tr>
            <td style="border-radius:8px; background-color:#0f766e;">
                <a href="mailto:{{ $contact->email }}" style="display:inline-block; padding:12px 22px; font-size:14px; font-weight:600; color:#ffffff; text-decoration:none;">
                    Reply to {{ $contact->full_name }}
                </a>
            </td>
        </tr>
    </table>
@endsection
