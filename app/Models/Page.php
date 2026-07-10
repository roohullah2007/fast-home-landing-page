<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'route',
        'title',
        'description',
        'is_active',
        'sort_order',
        'meta_data'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'meta_data' => 'array'
    ];

    /**
     * Scope for active pages
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for ordered pages
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order', 'asc');
    }

    /**
     * Get page by route name
     */
    public static function findByRoute($route)
    {
        return static::where('route', $route)->first();
    }

    /**
     * Check if page is accessible
     */
    public function isAccessible()
    {
        return $this->is_active;
    }
}
