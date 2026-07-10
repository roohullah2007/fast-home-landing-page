@extends('emails.layout')

@section('title', 'We received your request')

@section('content')
    <h1 style="margin:0 0 8px; font-size:22px; color:#0f172a;">Thank you, {{ $lead->full_name }}! 🎉</h1>
    <p style="margin:0 0 16px; font-size:15px; color:#475569; line-height:1.6;">
        We've received your request for a cash offer on your property. Our team is already reviewing
        your information and a home buying specialist will reach out to you shortly — usually within
        one business day.
    </p>

    <div style="background-color:#f0fdfa; border:1px solid #ccfbf1; border-radius:10px; padding:16px 20px; margin:0 0 20px;">
        <p style="margin:0 0 6px; font-size:14px; color:#0f766e; font-weight:700;">What happens next?</p>
        <ul style="margin:0; padding-left:18px; font-size:14px; color:#334155; line-height:1.7;">
            <li>We review the details of your property.</li>
            <li>A specialist contacts you to learn more.</li>
            <li>You receive a fair, no-obligation cash offer.</li>
        </ul>
    </div>

    @include('emails.partials.details', ['rows' => [
        'Property Address' => $lead->address,
        'City' => $lead->city,
        'State' => $lead->state,
        'Zip Code' => $lead->zip_code,
        'Phone' => $lead->phone,
    ]])

    <p style="margin:20px 0 0; font-size:14px; color:#475569; line-height:1.6;">
        If anything above looks incorrect, just reply to this email and let us know.
    </p>
    <p style="margin:16px 0 0; font-size:14px; color:#475569;">
        — The {{ config('app.name', 'Fast Home Cash Offers') }} Team
    </p>
@endsection
