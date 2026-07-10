<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AnalyticsEvent;
use App\Models\Lead;
use App\Models\ContactMessage;
use App\Models\BlogPost;
use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class AnalyticsController extends Controller
{
    /**
     * Display analytics dashboard
     */
    public function index(Request $request)
    {
        $days = $request->get('days', 30);
        
        // Get basic stats
        $stats = $this->getBasicStats($days);
        
        // Get analytics data
        $analytics = $this->getAnalyticsData($days);
        
        // Get conversion funnel
        $conversionFunnel = AnalyticsEvent::getConversionFunnel($days);
        
        // Get popular pages
        $popularPages = AnalyticsEvent::getPopularPages(10, $days);
        
        // Get button clicks
        $buttonClicks = AnalyticsEvent::getButtonClicks($days);
        
        // Get daily chart data
        $dailyAnalytics = AnalyticsEvent::getDailyAnalytics($days);
        
        return Inertia::render('Admin/Analytics/Index', [
            'stats' => $stats,
            'analytics' => $analytics,
            'conversionFunnel' => $conversionFunnel,
            'popularPages' => $popularPages,
            'buttonClicks' => $buttonClicks,
            'dailyAnalytics' => $dailyAnalytics,
            'selectedDays' => $days
        ]);
    }

    /**
     * Get basic website stats
     */
    private function getBasicStats($days)
    {
        $startDate = now()->subDays($days);
        
        return [
            'total_leads' => Lead::where('created_at', '>=', $startDate)->count(),
            'new_leads' => Lead::where('status', 'new')->where('created_at', '>=', $startDate)->count(),
            'total_contacts' => ContactMessage::where('created_at', '>=', $startDate)->count(),
            'new_contacts' => ContactMessage::where('status', 'new')->where('created_at', '>=', $startDate)->count(),
            'page_views' => AnalyticsEvent::getPageViews($startDate),
            'active_pages' => Page::active()->count(),
            'total_pages' => Page::count(),
            'published_blogs' => BlogPost::where('status', 'published')->count(),
            'draft_blogs' => BlogPost::where('status', 'draft')->count(),
            
            // Previous period comparison
            'leads_growth' => $this->getGrowthRate('leads', $days),
            'contacts_growth' => $this->getGrowthRate('contacts', $days),
            'pageviews_growth' => $this->getGrowthRate('pageviews', $days),
        ];
    }

    /**
     * Get analytics-specific data
     */
    private function getAnalyticsData($days)
    {
        $startDate = now()->subDays($days);
        
        return [
            'total_events' => AnalyticsEvent::where('created_at', '>=', $startDate)->count(),
            'unique_sessions' => AnalyticsEvent::where('created_at', '>=', $startDate)->distinct('session_id')->count('session_id'),
            'bounce_rate' => $this->calculateBounceRate($days),
            'avg_session_duration' => $this->calculateAvgSessionDuration($days),
            'top_referrers' => $this->getTopReferrers($days),
            'device_breakdown' => $this->getDeviceBreakdown($days),
        ];
    }

    /**
     * Calculate growth rate compared to previous period
     */
    private function getGrowthRate($type, $days)
    {
        $currentStart = now()->subDays($days);
        $previousStart = now()->subDays($days * 2);
        $previousEnd = now()->subDays($days);
        
        switch ($type) {
            case 'leads':
                $current = Lead::where('created_at', '>=', $currentStart)->count();
                $previous = Lead::where('created_at', '>=', $previousStart)->where('created_at', '<', $previousEnd)->count();
                break;
            case 'contacts':
                $current = ContactMessage::where('created_at', '>=', $currentStart)->count();
                $previous = ContactMessage::where('created_at', '>=', $previousStart)->where('created_at', '<', $previousEnd)->count();
                break;
            case 'pageviews':
                $current = AnalyticsEvent::getPageViews($currentStart);
                $previous = AnalyticsEvent::getPageViews($previousStart, $previousEnd);
                break;
            default:
                return 0;
        }
        
        if ($previous == 0) {
            return $current > 0 ? 100 : 0;
        }
        
        return round((($current - $previous) / $previous) * 100, 1);
    }

    /**
     * Calculate bounce rate
     */
    private function calculateBounceRate($days)
    {
        // Simplified bounce rate calculation
        // Sessions with only one page view
        $startDate = now()->subDays($days);
        
        $totalSessions = AnalyticsEvent::where('created_at', '>=', $startDate)
            ->distinct('session_id')
            ->count('session_id');
            
        if ($totalSessions == 0) return 0;
        
        $bounceSessions = AnalyticsEvent::where('created_at', '>=', $startDate)
            ->where('event_type', 'page_view')
            ->select('session_id')
            ->groupBy('session_id')
            ->havingRaw('count(*) = 1')
            ->count();
            
        return round(($bounceSessions / $totalSessions) * 100, 1);
    }

    /**
     * Calculate average session duration
     */
    private function calculateAvgSessionDuration($days)
    {
        // This is a simplified calculation
        // In a real implementation, you'd track session start/end times
        return '2:34'; // Placeholder - implement based on your tracking needs
    }

    /**
     * Get top referrers
     */
    private function getTopReferrers($days)
    {
        $startDate = now()->subDays($days);
        
        return AnalyticsEvent::where('created_at', '>=', $startDate)
            ->where('event_type', 'page_view')
            ->whereNotNull('referrer')
            ->where('referrer', '!=', '')
            ->select('referrer', \DB::raw('count(*) as visits'))
            ->groupBy('referrer')
            ->orderBy('visits', 'desc')
            ->limit(10)
            ->get();
    }

    /**
     * Get device breakdown from user agents
     */
    private function getDeviceBreakdown($days)
    {
        $startDate = now()->subDays($days);
        
        $events = AnalyticsEvent::where('created_at', '>=', $startDate)
            ->where('event_type', 'page_view')
            ->select('user_agent')
            ->get();
            
        $devices = ['Desktop' => 0, 'Mobile' => 0, 'Tablet' => 0, 'Unknown' => 0];
        
        foreach ($events as $event) {
            $userAgent = strtolower($event->user_agent ?? '');
            
            if (strpos($userAgent, 'mobile') !== false || strpos($userAgent, 'android') !== false || strpos($userAgent, 'iphone') !== false) {
                $devices['Mobile']++;
            } elseif (strpos($userAgent, 'tablet') !== false || strpos($userAgent, 'ipad') !== false) {
                $devices['Tablet']++;
            } elseif (strpos($userAgent, 'mozilla') !== false || strpos($userAgent, 'chrome') !== false || strpos($userAgent, 'safari') !== false) {
                $devices['Desktop']++;
            } else {
                $devices['Unknown']++;
            }
        }
        
        return $devices;
    }

    /**
     * Track analytics event
     */
    public function track(Request $request)
    {
        $validated = $request->validate([
            'event_type' => 'required|string',
            'event_name' => 'required|string',
            'page_url' => 'required|string',
            'page_title' => 'nullable|string',
            'event_data' => 'nullable|array'
        ]);

        AnalyticsEvent::create([
            'event_type' => $validated['event_type'],
            'event_name' => $validated['event_name'],
            'page_url' => $validated['page_url'],
            'page_title' => $validated['page_title'] ?? null,
            'referrer' => $request->header('referer'),
            'user_agent' => $request->header('user-agent'),
            'ip_address' => $request->ip(),
            'session_id' => $request->session()->getId(),
            'event_data' => $validated['event_data'] ?? null
        ]);

        return response()->json(['success' => true]);
    }
}
