<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SpamLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SpamProtectionController extends Controller
{
    /**
     * Display spam protection dashboard
     */
    public function index(Request $request)
    {
        $stats = [
            'total_attempts' => SpamLog::count(),
            'recent_attempts' => SpamLog::where('created_at', '>=', now()->subDays(7))->count(),
            'today_attempts' => SpamLog::whereDate('created_at', today())->count(),
            'top_reasons' => SpamLog::selectRaw('reason, COUNT(*) as count')
                ->groupBy('reason')
                ->orderByDesc('count')
                ->limit(5)
                ->get(),
            'top_ips' => SpamLog::selectRaw('ip_address, COUNT(*) as count')
                ->where('created_at', '>=', now()->subDays(30))
                ->groupBy('ip_address')
                ->orderByDesc('count')
                ->limit(10)
                ->get(),
        ];

        $recentLogs = SpamLog::with([])
            ->orderByDesc('created_at')
            ->limit(50)
            ->get()
            ->map(function ($log) {
                return [
                    'id' => $log->id,
                    'ip_address' => $log->ip_address,
                    'form_type' => $log->form_type,
                    'reason' => $log->reason,
                    'created_at' => $log->created_at->format('Y-m-d H:i:s'),
                    'data' => $log->data,
                ];
            });

        return Inertia::render('Admin/SpamProtection', [
            'stats' => $stats,
            'recentLogs' => $recentLogs,
            'config' => [
                'recaptcha_enabled' => !empty(config('services.google.recaptcha.site_key')),
                'places_enabled' => !empty(config('services.google.places.api_key')),
            ]
        ]);
    }

    /**
     * Get spam logs with pagination and filtering
     */
    public function logs(Request $request)
    {
        $query = SpamLog::query();

        if ($request->filled('ip')) {
            $query->where('ip_address', 'like', '%' . $request->ip . '%');
        }

        if ($request->filled('reason')) {
            $query->where('reason', $request->reason);
        }

        if ($request->filled('form_type')) {
            $query->where('form_type', $request->form_type);
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $logs = $query->orderByDesc('created_at')
            ->paginate(50)
            ->withQueryString();

        return response()->json($logs);
    }

    /**
     * Delete old spam logs
     */
    public function cleanup(Request $request)
    {
        $request->validate([
            'days' => 'required|integer|min:1|max:365'
        ]);

        $deleted = SpamLog::where('created_at', '<', now()->subDays($request->days))->delete();

        return response()->json([
            'success' => true,
            'message' => "Deleted {$deleted} old spam log entries.",
            'deleted_count' => $deleted
        ]);
    }

    /**
     * Block an IP address (this would require additional implementation)
     */
    public function blockIp(Request $request)
    {
        $request->validate([
            'ip_address' => 'required|ip'
        ]);

        // TODO: Implement IP blocking functionality
        // This could involve adding to a blocked_ips table
        // or integrating with a firewall service

        return response()->json([
            'success' => true,
            'message' => 'IP blocking feature not yet implemented.'
        ]);
    }

    /**
     * Export spam logs
     */
    public function export(Request $request)
    {
        $request->validate([
            'format' => 'required|in:csv,json',
            'date_from' => 'nullable|date',
            'date_to' => 'nullable|date',
        ]);

        $query = SpamLog::query();

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $logs = $query->orderByDesc('created_at')->get();

        if ($request->format === 'csv') {
            $filename = 'spam_logs_' . now()->format('Y-m-d_H-i-s') . '.csv';
            
            $headers = [
                'Content-Type' => 'text/csv',
                'Content-Disposition' => 'attachment; filename="' . $filename . '"',
            ];

            $callback = function() use ($logs) {
                $file = fopen('php://output', 'w');
                fputcsv($file, ['ID', 'IP Address', 'Form Type', 'Reason', 'Created At', 'User Agent', 'Data']);
                
                foreach ($logs as $log) {
                    fputcsv($file, [
                        $log->id,
                        $log->ip_address,
                        $log->form_type,
                        $log->reason,
                        $log->created_at,
                        $log->user_agent,
                        json_encode($log->data)
                    ]);
                }
                
                fclose($file);
            };

            return response()->stream($callback, 200, $headers);
        }

        // JSON export
        $filename = 'spam_logs_' . now()->format('Y-m-d_H-i-s') . '.json';
        
        return response()->json($logs)
            ->header('Content-Disposition', 'attachment; filename="' . $filename . '"');
    }
}
