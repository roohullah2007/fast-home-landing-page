<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'email',
        'phone',
        'address',
        'message',
        'is_owner',
        'is_listed',
        'best_time',
        'contact_method',
        'hear_about',
        'status', // new, replied, closed
        'additional_data', // JSON field for extra form data
    ];

    protected $casts = [
        'additional_data' => 'array',
    ];

    // Scopes
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeNew($query)
    {
        return $query->where('status', 'new');
    }
}
