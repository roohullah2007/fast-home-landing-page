import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function EditPage({ auth, page }) {
    const { data, setData, put, processing, errors } = useForm({
        name: page.name || '',
        slug: page.slug || '',
        route: page.route || '',
        title: page.title || '',
        description: page.description || '',
        is_active: page.is_active || false,
        sort_order: page.sort_order || 0
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.pages.update', page.id));
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Page: {page.name}</h2>}
        >
            <Head title={`Edit Page: ${page.name}`} />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Page Name */}
                                <div>
                                    <InputLabel htmlFor="name" value="Page Name" />
                                    <TextInput
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                {/* Slug */}
                                <div>
                                    <InputLabel htmlFor="slug" value="Slug (URL Path)" />
                                    <div className="flex items-center mt-1">
                                        <span className="text-gray-500 text-sm mr-2">/</span>
                                        <TextInput
                                            id="slug"
                                            value={data.slug}
                                            onChange={(e) => setData('slug', e.target.value)}
                                            className="block w-full"
                                            required
                                        />
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">
                                        This will be the URL path for the page
                                    </p>
                                    <InputError message={errors.slug} className="mt-2" />
                                </div>

                                {/* Route */}
                                <div>
                                    <InputLabel htmlFor="route" value="Route Name" />
                                    <TextInput
                                        id="route"
                                        value={data.route}
                                        onChange={(e) => setData('route', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        Internal route name for the application
                                    </p>
                                    <InputError message={errors.route} className="mt-2" />
                                </div>

                                {/* Title */}
                                <div>
                                    <InputLabel htmlFor="title" value="Page Title (SEO)" />
                                    <TextInput
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>

                                {/* Description */}
                                <div>
                                    <InputLabel htmlFor="description" value="Description (SEO)" />
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows="3"
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                {/* Sort Order */}
                                <div>
                                    <InputLabel htmlFor="sort_order" value="Sort Order" />
                                    <TextInput
                                        id="sort_order"
                                        type="number"
                                        value={data.sort_order}
                                        onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                        className="mt-1 block w-full"
                                        min="0"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        Lower numbers appear first in listings
                                    </p>
                                    <InputError message={errors.sort_order} className="mt-2" />
                                </div>

                                {/* Active Status */}
                                <div>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                            className="rounded"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">
                                            Page is active and accessible
                                        </span>
                                    </label>
                                </div>

                                {/* Form Actions */}
                                <div className="flex items-center justify-end space-x-4">
                                    <Link href={route('admin.pages.index')}>
                                        <SecondaryButton>Cancel</SecondaryButton>
                                    </Link>
                                    <PrimaryButton disabled={processing}>
                                        {processing ? 'Updating...' : 'Update Page'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
