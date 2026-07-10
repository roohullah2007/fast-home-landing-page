<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GoogleReview extends Model
{
    use HasFactory;

    protected $fillable = [
        'external_id',
        'author_name',
        'author_photo_url',
        'author_url',
        'rating',
        'text',
        'relative_time_description',
        'reviewed_at',
        'is_visible',
        'sort_order',
    ];

    protected $casts = [
        'reviewed_at' => 'datetime',
        'is_visible' => 'boolean',
    ];

    public function scopeVisible($query)
    {
        return $query->where('is_visible', true);
    }
}
