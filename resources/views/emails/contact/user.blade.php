@extends('emails.layout')

@section('title', 'We received your message')

@section('content')
    <h1 style="margin:0 0 8px; font-size:22px; color:#0f172a;">Thanks for reaching out, {{ $contact->full_name }}!</h1>
    <p style="margin:0 0 16px; font-size:15px; color:#475569; line-height:1.6;">
        We've received your message and a member of our team will get back to you shortly. We typically
        respond within one business day.
    </p>

    <div style="background-color:#f8fafc; border:1px solid #eef0f3; border-radius:10px; padding:16px 20px; margin:0 0 8px;">
        <p style="margin:0 0 6px; font-size:13px; color:#6b7280; font-weight:700; text-transform:uppercase; letter-spacing:0.4px;">Your message</p>
        <p style="margin:0; font-size:14px; color:#334155; line-height:1.6;">{!! nl2br(e($contact->message)) !!}</p>
    </div>

    <p style="margin:20px 0 0; font-size:14px; color:#475569;">
        — The {{ config('app.name', 'Fast Home Cash Offers') }} Team
    </p>
@endsection
