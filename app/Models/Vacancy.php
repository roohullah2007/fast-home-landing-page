<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vacancy extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'department',
        'description',
        'requirements',
        'responsibilities',
        'location',
        'employment_type',
        'salary_min',
        'salary_max',
        'experience_level',
        'is_active',
        'podio_webhook_url',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'salary_min' => 'decimal:2',
        'salary_max' => 'decimal:2',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function getSalaryRangeAttribute()
    {
        if ($this->salary_min && $this->salary_max) {
            return '$' . number_format($this->salary_min) . ' - $' . number_format($this->salary_max);
        } elseif ($this->salary_min) {
            return 'From $' . number_format($this->salary_min);
        } elseif ($this->salary_max) {
            return 'Up to $' . number_format($this->salary_max);
        }
        return null;
    }
}
