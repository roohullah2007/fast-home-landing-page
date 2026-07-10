import { Head } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function AnalyticsIndex({ 
    auth, 
    stats, 
    analytics, 
    conversionFunnel, 
    popularPages, 
    buttonClicks, 
    dailyAnalytics, 
    selectedDays 
}) {
    const [timeRange, setTimeRange] = useState(selectedDays);

    const handleTimeRangeChange = (days) => {
        setTimeRange(days);
        window.location.href = route('admin.analytics.index', { days });
    };

    const formatGrowth = (growth) => {
        const sign = growth >= 0 ? '+' : '';
        const color = growth >= 0 ? 'text-green-600' : 'text-red-600';
        return (
            <span className={`text-sm ${color}`}>
                {sign}{growth}%
            </span>
        );
    };

    // Prepare chart data
    const chartData = dailyAnalytics.map(day => ({
        date: new Date(day.date).toLocaleDateString(),
        page_views: day.page_views,
        button_clicks: day.button_clicks,
        form_submissions: day.form_submissions,
        total_events: day.total_events
    }));

    const deviceData = Object.entries(analytics.device_breakdown || {}).map(([name, value]) => ({
        name,
        value
    }));

    const funnelData = [
        { step: 'Page Views', value: conversionFunnel.page_views, color: '#8884d8' },
        { step: 'Cash Offer Clicks', value: conversionFunnel.cash_offer_clicks, color: '#82ca9d' },
        { step: 'Form Submissions', value: conversionFunnel.form_submissions, color: '#ffc658' }
    ];

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Analytics Dashboard</h2>}
        >
            <Head title="Analytics Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Time Range Selector */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium text-gray-900">Analytics Overview</h3>
                                <div className="flex space-x-2">
                                    {[7, 30, 90, 365].map(days => (
                                        <button
                                            key={days}
                                            onClick={() => handleTimeRangeChange(days)}
                                            className={`px-3 py-1 rounded text-sm ${
                                                timeRange === days 
                                                    ? 'bg-blue-600 text-white' 
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                        >
                                            {days === 365 ? '1 Year' : `${days} Days`}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Key Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Leads</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.total_leads}</p>
                                    </div>
                                    <div className="text-right">
                                        {formatGrowth(stats.leads_growth)}
                                        <div className="text-xs text-gray-500">vs prev period</div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <span className="text-sm text-blue-600">{stats.new_leads} new leads</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Page Views</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.page_views}</p>
                                    </div>
                                    <div className="text-right">
                                        {formatGrowth(stats.pageviews_growth)}
                                        <div className="text-xs text-gray-500">vs prev period</div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <span className="text-sm text-green-600">{analytics.unique_sessions} unique sessions</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Contact Messages</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.total_contacts}</p>
                                    </div>
                                    <div className="text-right">
                                        {formatGrowth(stats.contacts_growth)}
                                        <div className="text-xs text-gray-500">vs prev period</div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <span className="text-sm text-orange-600">{stats.new_contacts} new messages</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                                        <p className="text-2xl font-bold text-gray-900">{conversionFunnel.conversion_rate.toFixed(1)}%</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm text-purple-600">
                                            {conversionFunnel.click_through_rate.toFixed(1)}% CTR
                                        </span>
                                        <div className="text-xs text-gray-500">click-through rate</div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <span className="text-sm text-gray-600">Bounce Rate: {analytics.bounce_rate}%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Daily Analytics Chart */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Activity</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="page_views" stroke="#8884d8" name="Page Views" />
                                        <Line type="monotone" dataKey="button_clicks" stroke="#82ca9d" name="Button Clicks" />
                                        <Line type="monotone" dataKey="form_submissions" stroke="#ffc658" name="Form Submissions" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Device Breakdown */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Device Breakdown</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={deviceData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {deviceData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Conversion Funnel */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Conversion Funnel</h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={funnelData} layout="horizontal">
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis dataKey="step" type="category" width={150} />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Tables Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Popular Pages */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Pages</h3>
                                <div className="space-y-3">
                                    {popularPages.map((page, index) => (
                                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {page.page_title || 'Untitled'}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {page.page_url}
                                                </div>
                                            </div>
                                            <span className="text-sm font-semibold text-blue-600">
                                                {page.views} views
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Button Clicks */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Button Performance</h3>
                                <div className="space-y-3">
                                    {buttonClicks.map((button, index) => (
                                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <div className="text-sm font-medium text-gray-900">
                                                {button.event_name}
                                            </div>
                                            <span className="text-sm font-semibold text-green-600">
                                                {button.clicks} clicks
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}
