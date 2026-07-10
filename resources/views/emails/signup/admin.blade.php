@extends('emails.layout')

@section('title', 'New User Registration')

@section('content')
    <h1 style="margin:0 0 8px; font-size:22px; color:#0f172a;">New User Registered 👤</h1>
    <p style="margin:0 0 20px; font-size:15px; color:#475569; line-height:1.6;">
        A new account was just created on the website.
    </p>

    @include('emails.partials.details', ['rows' => [
        'Name' => $user->name,
        'Email' => $user->email,
        'Registered' => optional($user->created_at)->format('M j, Y g:i A'),
    ]])
@endsection
