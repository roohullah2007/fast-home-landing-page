<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BlogPost extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'featured_image',
        'meta_title',
        'meta_description',
        'tags',
        'category',
        'status',
        'published_at',
        'is_featured',
        'allow_comments',
        'views',
        'author_id',
        'author_name',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'is_featured' => 'boolean',
        'allow_comments' => 'boolean',
        'views' => 'integer',
    ];

    protected $dates = [
        'published_at',
        'deleted_at',
    ];

    // Relationships
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    // Scopes
    public function scopePublished($query)
    {
        return $query->where('status', 'published')
                    ->where(function($q) {
                        $q->whereNull('published_at')
                          ->orWhere('published_at', '<=', now());
                    });
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }

    // Accessors
    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function getExcerptAttribute($value)
    {
        if ($value) {
            return $value;
        }

        return substr(strip_tags($this->content), 0, 160) . '...';
    }

    // Mutators
    public function setTagsAttribute($value)
    {
        if (is_array($value)) {
            $this->attributes['tags'] = implode(',', $value);
        } else {
            $this->attributes['tags'] = $value;
        }
    }

    public function getTagsAttribute($value)
    {
        if ($value) {
            return explode(',', $value);
        }
        return [];
    }

    // Automatically generate slug on save
    public function setTitleAttribute($value)
    {
        $this->attributes['title'] = $value;
        
        // Only generate slug if it's not set or if title changed
        if (empty($this->attributes['slug']) || $this->isDirty('title')) {
            $this->attributes['slug'] = $this->generateUniqueSlug($value);
        }
    }

    private function generateUniqueSlug($title)
    {
        $slug = \Illuminate\Support\Str::slug($title);
        $originalSlug = $slug;
        $counter = 1;
        
        while (static::where('slug', $slug)->where('id', '!=', $this->id ?? 0)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }
        
        return $slug;
    }

    // SEO Helper methods
    public function getMetaTitleAttribute($value)
    {
        return $value ?: $this->title;
    }

    public function getMetaDescriptionAttribute($value)
    {
        return $value ?: $this->excerpt;
    }

    public function getCanonicalUrlAttribute()
    {
        return url('/blog/' . $this->slug);
    }

    public function getOpenGraphImageAttribute()
    {
        if ($this->featured_image) {
            return url($this->featured_image);
        }
        
        // Return default OG image
        return url('/images/default-og-image.jpg');
    }
}
