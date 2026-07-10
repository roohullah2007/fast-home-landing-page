import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminDashboard({ auth, stats = {} }) {
    const dashboardStats = [
        {
            name: 'Total Leads',
            value: stats.leads || 0,
            newCount: stats.newLeads || 0,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            color: 'bg-red-500',
            href: route('admin.leads.index')
        }
    ];

    const recentActivity = [
        { action: 'New Lead', item: 'from Lead Capture Form', time: '2 minutes ago' },
    ];

    return (
        <AdminLayout user={auth.user}>
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Admin Dashboard</h1>
                            
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {dashboardStats.map((stat) => {
                                    const StatCard = ({ children }) => stat.href ? (
                                        <Link href={stat.href} className="block hover:scale-105 transition-transform">
                                            {children}
                                        </Link>
                                    ) : (
                                        <div>{children}</div>
                                    );

                                    return (
                                        <StatCard key={stat.name}>
                                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                                <div className="p-5">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0">
                                                            <div className={`${stat.color} p-3 rounded-lg text-white`}>
                                                                {stat.icon}
                                                            </div>
                                                        </div>
                                                        <div className="ml-5 w-0 flex-1">
                                                            <dl>
                                                                <dt className="text-sm font-medium text-gray-500 truncate">
                                                                    {stat.name}
                                                                    {stat.newCount > 0 && (
                                                                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                                            {stat.newCount} new
                                                                        </span>
                                                                    )}
                                                                </dt>
                                                                <dd className="text-3xl font-bold text-gray-900">
                                                                    {stat.value}
                                                                </dd>
                                                            </dl>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </StatCard>
                                    );
                                })}
                            </div>

                            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                                {/* Quick Actions */}
                                <div className="bg-white overflow-hidden shadow rounded-lg">
                                    <div className="p-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                                        <div className="space-y-3">
                                            <Link
                                                href={route('admin.leads.index')}
                                                className="w-full flex items-center px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                            >
                                                <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                View All Leads
                                            </Link>
                                            <Link
                                                href={route('profile.edit')}
                                                className="w-full flex items-center px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                            >
                                                <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Edit Profile
                                            </Link>
                                            <a
                                                href="/"
                                                target="_blank"
                                                className="w-full flex items-center px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                            >
                                                <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                                View Website
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Activity */}
                                <div className="bg-white overflow-hidden shadow rounded-lg">
                                    <div className="p-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                                        <div className="space-y-4">
                                            {recentActivity.map((activity, index) => (
                                                <div key={index} className="flex items-start">
                                                    <div className="flex-shrink-0">
                                                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <p className="text-sm text-gray-900">
                                                            <span className="font-medium">{activity.action}:</span> {activity.item}
                                                        </p>
                                                        <p className="text-sm text-gray-500">{activity.time}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
