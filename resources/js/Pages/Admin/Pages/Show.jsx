import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function ShowPage({ auth, page }) {
    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Page Details: {page.name}</h2>}
        >
            <Head title={`Page Details: ${page.name}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header Actions */}
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {page.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Page ID: {page.id}
                                    </p>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                    <span className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium ${
                                        page.is_active 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {page.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                    
                                    <Link href={route('admin.pages.edit', page.id)}>
                                        <PrimaryButton>Edit Page</PrimaryButton>
                                    </Link>
                                    
                                    <Link href={route('admin.pages.index')}>
                                        <SecondaryButton>Back to List</SecondaryButton>
                                    </Link>
                                </div>
                            </div>

                            {/* Page Details */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Basic Information */}
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900 mb-2">Basic Information</h4>
                                        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                            <div>
                                                <label className="text-xs text-gray-500 uppercase tracking-wide">Page Name</label>
                                                <p className="text-sm text-gray-900">{page.name}</p>
                                            </div>
                                            
                                            <div>
                                                <label className="text-xs text-gray-500 uppercase tracking-wide">URL Slug</label>
                                                <p className="text-sm text-gray-900 font-mono">/{page.slug}</p>
                                            </div>
                                            
                                            <div>
                                                <label className="text-xs text-gray-500 uppercase tracking-wide">Route Name</label>
                                                <p className="text-sm text-gray-900 font-mono">{page.route}</p>
                                            </div>
                                            
                                            <div>
                                                <label className="text-xs text-gray-500 uppercase tracking-wide">Sort Order</label>
                                                <p className="text-sm text-gray-900">{page.sort_order}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* SEO Information */}
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900 mb-2">SEO Information</h4>
                                        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                            <div>
                                                <label className="text-xs text-gray-500 uppercase tracking-wide">Page Title</label>
                                                <p className="text-sm text-gray-900">{page.title}</p>
                                            </div>
                                            
                                            <div>
                                                <label className="text-xs text-gray-500 uppercase tracking-wide">Meta Description</label>
                                                <p className="text-sm text-gray-900">
                                                    {page.description || 'No description provided'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Meta Data */}
                            {page.meta_data && Object.keys(page.meta_data).length > 0 && (
                                <div className="mt-6">
                                    <h4 className="text-sm font-medium text-gray-900 mb-2">Additional Meta Data</h4>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                                            {JSON.stringify(page.meta_data, null, 2)}
                                        </pre>
                                    </div>
                                </div>
                            )}

                            {/* Timestamps */}
                            <div className="mt-6 border-t border-gray-200 pt-6">
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Timestamps</h4>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm text-gray-600">
                                    <div>
                                        <span className="font-medium">Created:</span> {new Date(page.created_at).toLocaleString()}
                                    </div>
                                    <div>
                                        <span className="font-medium">Updated:</span> {new Date(page.updated_at).toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            {/* Page Preview Link */}
                            {page.is_active && (
                                <div className="mt-6 border-t border-gray-200 pt-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900">Page Preview</h4>
                                            <p className="text-sm text-gray-500">View this page on the live website</p>
                                        </div>
                                        <a
                                            href={`/${page.slug}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            View Live Page
                                        </a>
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
