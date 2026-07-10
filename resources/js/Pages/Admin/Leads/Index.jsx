import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ auth, leads, filters, stats }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [source, setSource] = useState(filters.source || '');

    const handleFilter = () => {
        router.get(route('admin.leads.index'), {
            search,
            status,
            source
        }, {
            preserveState: true,
            replace: true
        });
    };

    const clearFilters = () => {
        setSearch('');
        setStatus('');
        setSource('');
        router.get(route('admin.leads.index'));
    };

    const getStatusColor = (status) => {
        const colors = {
            'new': 'bg-blue-100 text-blue-800',
            'contacted': 'bg-yellow-100 text-yellow-800', 
            'qualified': 'bg-purple-100 text-purple-800',
            'converted': 'bg-green-100 text-green-800',
            'closed': 'bg-gray-100 text-gray-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Manage Leads" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-semibold text-gray-900">Leads Management</h1>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <div className="text-blue-600 text-sm font-medium">Total Leads</div>
                                    <div className="text-2xl font-bold text-blue-900">{stats.total}</div>
                                </div>
                                <div className="bg-yellow-50 p-4 rounded-lg">
                                    <div className="text-yellow-600 text-sm font-medium">New</div>
                                    <div className="text-2xl font-bold text-yellow-900">{stats.new}</div>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <div className="text-purple-600 text-sm font-medium">Contacted</div>
                                    <div className="text-2xl font-bold text-purple-900">{stats.contacted}</div>
                                </div>
                                <div className="bg-indigo-50 p-4 rounded-lg">
                                    <div className="text-indigo-600 text-sm font-medium">Qualified</div>
                                    <div className="text-2xl font-bold text-indigo-900">{stats.qualified}</div>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="text-green-600 text-sm font-medium">Converted</div>
                                    <div className="text-2xl font-bold text-green-900">{stats.converted}</div>
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                                        <input
                                            type="text"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Search by name, email, phone..."
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <select
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">All Statuses</option>
                                            <option value="new">New</option>
                                            <option value="contacted">Contacted</option>
                                            <option value="qualified">Qualified</option>
                                            <option value="converted">Converted</option>
                                            <option value="closed">Closed</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                                        <select
                                            value={source}
                                            onChange={(e) => setSource(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">All Sources</option>
                                            <option value="lead_capture">Lead Capture Form</option>
                                            <option value="contact_form">Contact Form</option>
                                        </select>
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <button
                                            onClick={handleFilter}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Filter
                                        </button>
                                        <button
                                            onClick={clearFilters}
                                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        >
                                            Clear
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Leads Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Contact Info
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Location
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Property Info
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Source
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {leads.data.map((lead) => (
                                            <tr key={lead.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{lead.full_name}</div>
                                                    <div className="text-sm text-gray-500">{lead.email}</div>
                                                    <div className="text-sm text-gray-500">{lead.phone}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {lead.city && lead.state ? `${lead.city}, ${lead.state}` : 'N/A'}
                                                    </div>
                                                    <div className="text-sm text-gray-500">{lead.zip_code || ''}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        Owner: {lead.is_owner ? 'Yes' : 'No'}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        Listed: {lead.is_listed ? 'Yes' : 'No'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(lead.status)}`}>
                                                        {lead.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm text-gray-900 capitalize">
                                                        {lead.source.replace('_', ' ')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {formatDate(lead.created_at)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link
                                                        href={route('admin.leads.show', lead.id)}
                                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                                    >
                                                        View
                                                    </Link>
                                                    <Link
                                                        href={route('admin.leads.edit', lead.id)}
                                                        className="text-green-600 hover:text-green-900"
                                                    >
                                                        Edit
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {leads.links && (
                                <div className="mt-6">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm text-gray-700">
                                            Showing {leads.from} to {leads.to} of {leads.total} results
                                        </div>
                                        <div className="flex space-x-1">
                                            {leads.links.map((link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || '#'}
                                                    className={`px-3 py-2 text-sm ${
                                                        link.active
                                                            ? 'bg-blue-600 text-white'
                                                            : link.url
                                                            ? 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    } rounded-md`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
