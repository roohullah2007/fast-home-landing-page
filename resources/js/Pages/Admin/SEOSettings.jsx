import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { formatPhoneNumber } from '@/utils/phone';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function SEOSettings({ seoConfig }) {
    const [activeTab, setActiveTab] = useState('general');
    
    const { data, setData, post, processing, errors, reset } = useForm({
        default_title: seoConfig?.default?.title || '',
        default_description: seoConfig?.default?.description || '',
        default_keywords: seoConfig?.default?.keywords || '',
        organization_name: seoConfig?.organization?.name || '',
        organization_url: seoConfig?.organization?.url || '',
        contact_phone: formatPhoneNumber(seoConfig?.organization?.contactPoint?.telephone || ''),
        permalink_structure: 'title',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.seo.update-settings'));
    };

    const handlePermalinkUpdate = () => {
        post(route('admin.seo.update-permalinks'), {
            data: { permalink_structure: data.permalink_structure },
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="SEO Settings" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">SEO Settings</h1>
                                <p className="text-gray-600">Manage your website's search engine optimization settings.</p>
                            </div>

                            {/* Tab Navigation */}
                            <div className="border-b border-gray-200 mb-6">
                                <nav className="-mb-px flex space-x-8">
                                    <button
                                        onClick={() => setActiveTab('general')}
                                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === 'general'
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        General SEO
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('permalinks')}
                                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === 'permalinks'
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        Blog Permalinks
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('organization')}
                                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === 'organization'
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        Organization Info
                                    </button>
                                </nav>
                            </div>

                            {/* General SEO Tab */}
                            {activeTab === 'general' && (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <InputLabel htmlFor="default_title" value="Default Site Title" />
                                        <TextInput
                                            id="default_title"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.default_title}
                                            onChange={(e) => setData('default_title', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.default_title} className="mt-2" />
                                        <p className="text-sm text-gray-500 mt-1">This appears in search results and browser tabs.</p>
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="default_description" value="Default Meta Description" />
                                        <textarea
                                            id="default_description"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            rows={3}
                                            value={data.default_description}
                                            onChange={(e) => setData('default_description', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.default_description} className="mt-2" />
                                        <p className="text-sm text-gray-500 mt-1">This appears in search results. Keep it under 160 characters.</p>
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="default_keywords" value="Default Keywords" />
                                        <TextInput
                                            id="default_keywords"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.default_keywords}
                                            onChange={(e) => setData('default_keywords', e.target.value)}
                                        />
                                        <InputError message={errors.default_keywords} className="mt-2" />
                                        <p className="text-sm text-gray-500 mt-1">Comma-separated keywords for your website.</p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <PrimaryButton disabled={processing}>
                                            Update SEO Settings
                                        </PrimaryButton>
                                    </div>
                                </form>
                            )}

                            {/* Blog Permalinks Tab */}
                            {activeTab === 'permalinks' && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Blog Permalink Structure</h3>
                                        <p className="text-gray-600 mb-6">Choose how your blog post URLs should be structured.</p>
                                        
                                        <div className="space-y-4">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="permalink_structure"
                                                    value="title"
                                                    checked={data.permalink_structure === 'title'}
                                                    onChange={(e) => setData('permalink_structure', e.target.value)}
                                                    className="mr-3"
                                                />
                                                <div>
                                                    <div className="font-medium">Post Title</div>
                                                    <div className="text-sm text-gray-500">example.com/blog/your-post-title</div>
                                                </div>
                                            </label>
                                            
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="permalink_structure"
                                                    value="date-title"
                                                    checked={data.permalink_structure === 'date-title'}
                                                    onChange={(e) => setData('permalink_structure', e.target.value)}
                                                    className="mr-3"
                                                />
                                                <div>
                                                    <div className="font-medium">Date and Post Title</div>
                                                    <div className="text-sm text-gray-500">example.com/blog/2025/01/15/your-post-title</div>
                                                </div>
                                            </label>
                                            
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="permalink_structure"
                                                    value="category-title"
                                                    checked={data.permalink_structure === 'category-title'}
                                                    onChange={(e) => setData('permalink_structure', e.target.value)}
                                                    className="mr-3"
                                                />
                                                <div>
                                                    <div className="font-medium">Category and Post Title</div>
                                                    <div className="text-sm text-gray-500">example.com/blog/category/your-post-title</div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="border-t pt-6">
                                        <h4 className="font-medium text-gray-900 mb-2">Update Existing Posts</h4>
                                        <p className="text-sm text-gray-600 mb-4">
                                            This will update the URLs of all existing blog posts to match the new structure. 
                                            <strong>Warning:</strong> This may affect SEO if posts are already indexed by search engines.
                                        </p>
                                        <SecondaryButton
                                            onClick={handlePermalinkUpdate}
                                            disabled={processing}
                                        >
                                            Update All Blog Permalinks
                                        </SecondaryButton>
                                    </div>
                                </div>
                            )}

                            {/* Organization Info Tab */}
                            {activeTab === 'organization' && (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <InputLabel htmlFor="organization_name" value="Organization Name" />
                                        <TextInput
                                            id="organization_name"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.organization_name}
                                            onChange={(e) => setData('organization_name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.organization_name} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="organization_url" value="Organization Website URL" />
                                        <TextInput
                                            id="organization_url"
                                            type="url"
                                            className="mt-1 block w-full"
                                            value={data.organization_url}
                                            onChange={(e) => setData('organization_url', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.organization_url} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="contact_phone" value="Contact Phone Number" />
                                        <TextInput
                                            id="contact_phone"
                                            type="tel"
                                            className="mt-1 block w-full"
                                            value={data.contact_phone}
                                            onChange={(e) => setData('contact_phone', formatPhoneNumber(e.target.value))}
                                            required
                                        />
                                        <InputError message={errors.contact_phone} className="mt-2" />
                                        <p className="text-sm text-gray-500 mt-1">Used in structured data markup.</p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <PrimaryButton disabled={processing}>
                                            Update Organization Info
                                        </PrimaryButton>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
