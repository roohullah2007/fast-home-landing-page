@extends('emails.layout')

@section('title', 'Welcome')

@section('content')
    <h1 style="margin:0 0 8px; font-size:22px; color:#0f172a;">Welcome, {{ $user->name }}! 👋</h1>
    <p style="margin:0 0 16px; font-size:15px; color:#475569; line-height:1.6;">
        Thank you for creating an account with {{ config('app.name', 'Fast Home Cash Offers') }}. Your
        account is ready to go and you can sign in any time to manage your information and requests.
    </p>

    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 20px;">
        <tr>
            <td style="border-radius:8px; background-color:#0f766e;">
                <a href="{{ url('/login') }}" style="display:inline-block; padding:12px 22px; font-size:14px; font-weight:600; color:#ffffff; text-decoration:none;">
                    Sign In
                </a>
            </td>
        </tr>
    </table>

    <p style="margin:0; font-size:14px; color:#475569; line-height:1.6;">
        If you have any questions, just reply to this email — we're happy to help.
    </p>
    <p style="margin:16px 0 0; font-size:14px; color:#475569;">
        — The {{ config('app.name', 'Fast Home Cash Offers') }} Team
    </p>
@endsection
