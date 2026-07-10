<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'email',
        'phone',
        'address',
        'city',
        'state',
        'zip_code',
        'is_listed',
        'is_owner',
        'source', // contact_form, lead_capture, etc.
        'message',
        'additional_data', // JSON field for extra form data
        'status', // new, contacted, qualified, etc.
    ];

    protected $casts = [
        'additional_data' => 'array',
    ];

    // Scopes
    public function scopeBySource($query, $source)
    {
        return $query->where('source', $source);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }
}
