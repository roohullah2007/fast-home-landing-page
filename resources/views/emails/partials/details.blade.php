{{-- Expects $rows = ['Label' => 'value', ...]; null/empty values are skipped --}}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; margin:8px 0 0;">
    @foreach ($rows as $label => $value)
        @if (! is_null($value) && $value !== '')
            <tr>
                <td style="padding:10px 0; border-bottom:1px solid #eef0f3; font-size:14px; color:#6b7280; width:38%; vertical-align:top;">
                    {{ $label }}
                </td>
                <td style="padding:10px 0; border-bottom:1px solid #eef0f3; font-size:14px; color:#111827; font-weight:600; vertical-align:top;">
                    {!! nl2br(e($value)) !!}
                </td>
            </tr>
        @endif
    @endforeach
</table>
