import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';

export default function PagesIndex({ auth, pages }) {
    const [selectedPages, setSelectedPages] = useState([]);
    const { delete: destroy } = useForm();

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedPages(pages.map(page => page.id));
        } else {
            setSelectedPages([]);
        }
    };

    const handleSelectPage = (pageId) => {
        setSelectedPages(prev => 
            prev.includes(pageId) 
                ? prev.filter(id => id !== pageId)
                : [...prev, pageId]
        );
    };

    const handleBulkAction = (action) => {
        if (selectedPages.length === 0) {
            alert('Please select pages first');
            return;
        }

        router.post(route('admin.pages.bulk-toggle'), {
            page_ids: selectedPages,
            action: action
        }, {
            onSuccess: () => {
                setSelectedPages([]);
            }
        });
    };

    const handleToggle = (page) => {
        router.post(route('admin.pages.toggle', page.id));
    };

    const handleDelete = (page) => {
        if (confirm('Are you sure you want to delete this page?')) {
            destroy(route('admin.pages.destroy', page.id));
        }
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Page Management</h2>}
        >
            <Head title="Page Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header Actions */}
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center space-x-4">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Manage Website Pages
                                    </h3>
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                        {pages.length} pages
                                    </span>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                    {selectedPages.length > 0 && (
                                        <>
                                            <SecondaryButton
                                                onClick={() => handleBulkAction('activate')}
                                                className="bg-green-600 hover:bg-green-700"
                                            >
                                                Activate Selected ({selectedPages.length})
                                            </SecondaryButton>
                                            <SecondaryButton
                                                onClick={() => handleBulkAction('deactivate')}
                                                className="bg-yellow-600 hover:bg-yellow-700"
                                            >
                                                Deactivate Selected ({selectedPages.length})
                                            </SecondaryButton>
                                        </>
                                    )}
                                    
                                    <PrimaryButton
                                        onClick={() => router.visit(route('admin.pages.create'))}
                                    >
                                        Add New Page
                                    </PrimaryButton>
                                </div>
                            </div>

                            {/* Pages Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedPages.length === pages.length && pages.length > 0}
                                                    onChange={handleSelectAll}
                                                    className="rounded"
                                                />
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Page Details
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Route
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Order
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {pages.map((page) => (
                                            <tr key={page.id} className={selectedPages.includes(page.id) ? 'bg-blue-50' : ''}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedPages.includes(page.id)}
                                                        onChange={() => handleSelectPage(page.id)}
                                                        className="rounded"
                                                    />
                                                </td>
                                                
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {page.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {page.title}
                                                        </div>
                                                        {page.description && (
                                                            <div className="text-xs text-gray-400 mt-1">
                                                                {page.description.substring(0, 100)}...
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm text-gray-900 font-mono">
                                                        {page.route}
                                                    </span>
                                                    <div className="text-xs text-gray-500">
                                                        /{page.slug}
                                                    </div>
                                                </td>
                                                
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleToggle(page)}
                                                        className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium ${
                                                            page.is_active 
                                                                ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                                                        }`}
                                                    >
                                                        {page.is_active ? 'Active' : 'Inactive'}
                                                    </button>
                                                </td>
                                                
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {page.sort_order}
                                                </td>
                                                
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                                                    <button
                                                        onClick={() => router.visit(route('admin.pages.edit', page.id))}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Edit
                                                    </button>
                                                    
                                                    <button
                                                        onClick={() => router.visit(route('admin.pages.show', page.id))}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        View
                                                    </button>
                                                    
                                                    <button
                                                        onClick={() => handleDelete(page)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {pages.length === 0 && (
                                <div className="text-left md:text-center py-12">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No pages found</h3>
                                    <p className="mt-1 text-sm text-gray-500">Get started by creating a new page.</p>
                                    <div className="mt-6">
                                        <PrimaryButton
                                            onClick={() => router.visit(route('admin.pages.create'))}
                                        >
                                            Add New Page
                                        </PrimaryButton>
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
