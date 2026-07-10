<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class AnalyticsEvent extends Model
{
    protected $fillable = [
        'event_type',
        'event_name',
        'page_url',
        'page_title',
        'referrer',
        'user_agent',
        'ip_address',
        'session_id',
        'event_data'
    ];

    protected $casts = [
        'event_data' => 'array'
    ];

    public $timestamps = false;

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($model) {
            $model->created_at = now();
        });
    }

    /**
     * Get page views for date range
     */
    public static function getPageViews($startDate = null, $endDate = null)
    {
        $query = static::where('event_type', 'page_view');
        
        if ($startDate) {
            $query->where('created_at', '>=', $startDate);
        }
        
        if ($endDate) {
            $query->where('created_at', '<=', $endDate);
        }
        
        return $query->count();
    }

    /**
     * Get popular pages
     */
    public static function getPopularPages($limit = 10, $days = 30)
    {
        return static::where('event_type', 'page_view')
            ->where('created_at', '>=', now()->subDays($days))
            ->select('page_url', 'page_title', DB::raw('count(*) as views'))
            ->groupBy('page_url', 'page_title')
            ->orderBy('views', 'desc')
            ->limit($limit)
            ->get();
    }

    /**
     * Get button click analytics
     */
    public static function getButtonClicks($days = 30)
    {
        return static::where('event_type', 'button_click')
            ->where('created_at', '>=', now()->subDays($days))
            ->select('event_name', DB::raw('count(*) as clicks'))
            ->groupBy('event_name')
            ->orderBy('clicks', 'desc')
            ->get();
    }

    /**
     * Get daily analytics for chart
     */
    public static function getDailyAnalytics($days = 30)
    {
        return static::where('created_at', '>=', now()->subDays($days))
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('count(*) as total_events'),
                DB::raw('count(case when event_type = "page_view" then 1 end) as page_views'),
                DB::raw('count(case when event_type = "button_click" then 1 end) as button_clicks'),
                DB::raw('count(case when event_type = "form_submission" then 1 end) as form_submissions')
            )
            ->groupBy('date')
            ->orderBy('date', 'desc')
            ->get();
    }

    /**
     * Get conversion funnel data
     */
    public static function getConversionFunnel($days = 30)
    {
        $startDate = now()->subDays($days);
        
        $pageViews = static::where('event_type', 'page_view')
            ->where('created_at', '>=', $startDate)
            ->count();
            
        $cashOfferClicks = static::where('event_type', 'button_click')
            ->where('event_name', 'like', '%cash%offer%')
            ->where('created_at', '>=', $startDate)
            ->count();
            
        $formSubmissions = static::where('event_type', 'form_submission')
            ->where('created_at', '>=', $startDate)
            ->count();
            
        return [
            'page_views' => $pageViews,
            'cash_offer_clicks' => $cashOfferClicks,
            'form_submissions' => $formSubmissions,
            'click_through_rate' => $pageViews > 0 ? ($cashOfferClicks / $pageViews) * 100 : 0,
            'conversion_rate' => $cashOfferClicks > 0 ? ($formSubmissions / $cashOfferClicks) * 100 : 0
        ];
    }
}
