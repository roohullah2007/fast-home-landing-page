<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'vacancy_id',
        'name',
        'email',
        'phone',
        'message',
        'resume_path',
        'status',
        'additional_data',
    ];

    protected $casts = [
        'additional_data' => 'array',
    ];

    public function vacancy()
    {
        return $this->belongsTo(Vacancy::class);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }
}
