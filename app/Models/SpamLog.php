<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpamLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'ip_address',
        'user_agent',
        'form_type',
        'reason',
        'data',
    ];

    protected $casts = [
        'data' => 'array',
    ];

    /**
     * Log a spam attempt
     *
     * @param string $formType
     * @param string $reason
     * @param array $data
     * @return static
     */
    public static function logSpamAttempt($formType, $reason, $data = [])
    {
        return static::create([
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'form_type' => $formType,
            'reason' => $reason,
            'data' => $data,
        ]);
    }

    /**
     * Get recent spam attempts by IP
     *
     * @param string $ip
     * @param int $hours
     * @return int
     */
    public static function getRecentAttemptsByIp($ip, $hours = 24)
    {
        return static::where('ip_address', $ip)
            ->where('created_at', '>=', now()->subHours($hours))
            ->count();
    }
}
