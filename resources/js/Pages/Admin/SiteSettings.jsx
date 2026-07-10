import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { formatPhoneNumber } from '@/utils/phone';

export default function SiteSettings({ auth, reviewsEmbedCode, contactPhone, contactEmail, officeAddress }) {
    const { data, setData, post, processing, errors } = useForm({
        reviews_embed_code: reviewsEmbedCode || '',
        contact_phone: formatPhoneNumber(contactPhone || ''),
        contact_email: contactEmail || '',
        office_address: officeAddress || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.site-settings.update'));
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Site Settings" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                Site Settings
                            </h2>

                            <form onSubmit={handleSubmit}>
                                {/* Contact Information Section */}
                                <div className="mb-8 pb-8 border-b border-gray-200">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                        Contact Information
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-6">
                                        Update your business contact details. These will appear throughout the website.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label
                                                htmlFor="contact_phone"
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                            >
                                                Phone Number
                                            </label>
                                            <input
                                                type="text"
                                                id="contact_phone"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                value={data.contact_phone}
                                                onChange={(e) => setData('contact_phone', formatPhoneNumber(e.target.value))}
                                                placeholder="(888) 555-1234"
                                            />
                                            {errors.contact_phone && (
                                                <p className="mt-2 text-sm text-red-600">
                                                    {errors.contact_phone}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="contact_email"
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                            >
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="contact_email"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                value={data.contact_email}
                                                onChange={(e) => setData('contact_email', e.target.value)}
                                                placeholder="sellnow@fasthomecashoffers.com"
                                            />
                                            {errors.contact_email && (
                                                <p className="mt-2 text-sm text-red-600">
                                                    {errors.contact_email}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="office_address"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Office Address
                                        </label>
                                        <input
                                            type="text"
                                            id="office_address"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={data.office_address}
                                            onChange={(e) => setData('office_address', e.target.value)}
                                            placeholder="123 Main Street, Your City, Your State, 12345"
                                        />
                                        {errors.office_address && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.office_address}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Reviews Section */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                        Reviews Widget
                                    </h3>
                                    <label
                                        htmlFor="reviews_embed_code"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Reviews Embed Code (TrustIndex or other)
                                    </label>
                                    <p className="text-sm text-gray-500 mb-3">
                                        Paste your TrustIndex embed code here. Get it from{' '}
                                        <a
                                            href="https://www.trustindex.io/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 underline"
                                        >
                                            https://www.trustindex.io/
                                        </a>
                                    </p>
                                    <textarea
                                        id="reviews_embed_code"
                                        rows="10"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={data.reviews_embed_code}
                                        onChange={(e) => setData('reviews_embed_code', e.target.value)}
                                        placeholder="<script src='...'></script> or <iframe>...</iframe>"
                                    />
                                    {errors.reviews_embed_code && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.reviews_embed_code}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Save All Settings'}
                                    </button>

                                    <p className="text-sm text-gray-500">
                                        Changes will appear across the entire website
                                    </p>
                                </div>
                            </form>

                            {data.reviews_embed_code && (
                                <div className="mt-8 p-4 bg-gray-50 rounded-md">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                        Preview:
                                    </h3>
                                    <div
                                        className="border border-gray-300 rounded-md p-4 bg-white"
                                        dangerouslySetInnerHTML={{ __html: data.reviews_embed_code }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
