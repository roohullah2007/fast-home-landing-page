<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', config('app.name'))</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; color:#1f2937;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:24px 0;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:100%; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
                    <tr>
                        <td style="background-color:#0f766e; padding:28px 32px;" align="left">
                            <span style="display:inline-block; font-size:20px; font-weight:700; color:#ffffff; letter-spacing:0.2px;">
                                {{ config('app.name', 'Fast Home Cash Offers') }}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:32px;">
                            @yield('content')
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color:#f9fafb; padding:24px 32px; border-top:1px solid #eef0f3;">
                            <p style="margin:0 0 6px; font-size:13px; color:#6b7280;">
                                {{ config('app.name', 'Fast Home Cash Offers') }}
                            </p>
                            <p style="margin:0; font-size:12px; color:#9ca3af;">
                                This is an automated message.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
