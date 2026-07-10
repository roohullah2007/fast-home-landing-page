@extends('emails.layout')

@section('title', 'New Cash Offer Lead')

@section('content')
    <h1 style="margin:0 0 8px; font-size:22px; color:#0f172a;">New Cash Offer Lead 🏠</h1>
    <p style="margin:0 0 20px; font-size:15px; color:#475569; line-height:1.6;">
        A new lead just came in through the website. Reach out as soon as possible.
    </p>

    @include('emails.partials.details', ['rows' => [
        'Name' => $lead->full_name,
        'Email' => $lead->email,
        'Phone' => $lead->phone,
        'Property Address' => $lead->address,
        'City' => $lead->city,
        'State' => $lead->state,
        'Zip Code' => $lead->zip_code,
        'Currently Listed?' => $lead->is_listed ? ucfirst($lead->is_listed) : null,
        'Is the Owner?' => $lead->is_owner ? ucfirst($lead->is_owner) : null,
        'Source' => $lead->source,
        'Submitted' => optional($lead->created_at)->format('M j, Y g:i A'),
    ]])

    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 0;">
        <tr>
            <td style="border-radius:8px; background-color:#0f766e;">
                <a href="mailto:{{ $lead->email }}" style="display:inline-block; padding:12px 22px; font-size:14px; font-weight:600; color:#ffffff; text-decoration:none;">
                    Reply to {{ $lead->full_name }}
                </a>
            </td>
        </tr>
    </table>
@endsection
