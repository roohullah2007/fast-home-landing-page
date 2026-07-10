import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import RichTextEditor from '@/Components/Editor/RichTextEditor';
import FeaturedImageUpload from '@/Components/Editor/FeaturedImageUpload';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featured_image: '',
        meta_title: '',
        meta_description: '',
        tags: '',
        category: '',
        status: 'draft',
        published_at: '',
        is_featured: false,
        allow_comments: true,
    });

    const handleTitleChange = (e) => {
        const title = e.target.value;
        setData('title', title);
        
        // Auto-generate slug from title
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
        setData('slug', slug);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.blog.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AdminLayout
            header={<h1 className="text-2xl font-bold text-gray-900">Create New Blog Post</h1>}
        >
            <Head title="Create New Blog Post" />

            <div className="py-12">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Blog Post Details</h3>
                                <Link
                                    href={route('admin.blog.index')}
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    ← Back to Blog Posts
                                </Link>
                            </div>

                            <form onSubmit={submit} className="space-y-8">
                                {/* Main Content */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-2 space-y-6">
                                        {/* Title */}
                                        <div>
                                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                                Title *
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                value={data.title}
                                                onChange={handleTitleChange}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Enter your blog post title..."
                                                required
                                            />
                                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                        </div>

                                        {/* Slug */}
                                        <div>
                                            <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                                                URL Slug *
                                            </label>
                                            <div className="mt-1 flex rounded-md shadow-sm">
                                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                    /blog/
                                                </span>
                                                <input
                                                    type="text"
                                                    id="slug"
                                                    value={data.slug}
                                                    onChange={(e) => setData('slug', e.target.value)}
                                                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="auto-generated-from-title"
                                                    required
                                                />
                                            </div>
                                            {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
                                        </div>

                                        {/* Excerpt */}
                                        <div>
                                            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                                                Excerpt
                                            </label>
                                            <textarea
                                                id="excerpt"
                                                rows={3}
                                                value={data.excerpt}
                                                onChange={(e) => setData('excerpt', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Brief description of your blog post..."
                                            />
                                            <p className="mt-1 text-sm text-gray-500">This will be shown in blog listings and search results.</p>
                                            {errors.excerpt && <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>}
                                        </div>

                                        {/* Content */}
                                        <div>
                                            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                                Content *
                                            </label>
                                            <div className="mt-1">
                                                <RichTextEditor
                                                    value={data.content}
                                                    onChange={(content) => setData('content', content)}
                                                    placeholder="Write your blog post content here..."
                                                    className="w-full"
                                                />
                                            </div>
                                            {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                                        </div>
                                    </div>

                                    {/* Sidebar */}
                                    <div className="space-y-6">
                                        {/* Publish Settings */}
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h4 className="text-sm font-medium text-gray-900 mb-4">Publish Settings</h4>
                                            
                                            {/* Status */}
                                            <div className="mb-4">
                                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                                    Status
                                                </label>
                                                <select
                                                    id="status"
                                                    value={data.status}
                                                    onChange={(e) => setData('status', e.target.value)}
                                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    <option value="draft">Draft</option>
                                                    <option value="published">Published</option>
                                                    <option value="archived">Archived</option>
                                                </select>
                                                {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                                            </div>

                                            {/* Published Date */}
                                            <div className="mb-4">
                                                <label htmlFor="published_at" className="block text-sm font-medium text-gray-700">
                                                    Publish Date
                                                </label>
                                                <input
                                                    type="datetime-local"
                                                    id="published_at"
                                                    value={data.published_at}
                                                    onChange={(e) => setData('published_at', e.target.value)}
                                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                {errors.published_at && <p className="mt-1 text-sm text-red-600">{errors.published_at}</p>}
                                            </div>

                                            {/* Featured Post */}
                                            <div className="mb-4">
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id="is_featured"
                                                        checked={data.is_featured}
                                                        onChange={(e) => setData('is_featured', e.target.checked)}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                    />
                                                    <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-900">
                                                        Featured post
                                                    </label>
                                                </div>
                                            </div>

                                            {/* Allow Comments */}
                                            <div>
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id="allow_comments"
                                                        checked={data.allow_comments}
                                                        onChange={(e) => setData('allow_comments', e.target.checked)}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                    />
                                                    <label htmlFor="allow_comments" className="ml-2 block text-sm text-gray-900">
                                                        Allow comments
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Categories & Tags */}
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h4 className="text-sm font-medium text-gray-900 mb-4">Categories & Tags</h4>
                                            
                                            {/* Category */}
                                            <div className="mb-4">
                                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                                    Category
                                                </label>
                                                <input
                                                    type="text"
                                                    id="category"
                                                    value={data.category}
                                                    onChange={(e) => setData('category', e.target.value)}
                                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="e.g., Real Estate Tips"
                                                />
                                                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                                            </div>

                                            {/* Tags */}
                                            <div>
                                                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                                                    Tags
                                                </label>
                                                <input
                                                    type="text"
                                                    id="tags"
                                                    value={data.tags}
                                                    onChange={(e) => setData('tags', e.target.value)}
                                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="tag1, tag2, tag3"
                                                />
                                                <p className="mt-1 text-xs text-gray-500">Separate tags with commas</p>
                                                {errors.tags && <p className="mt-1 text-sm text-red-600">{errors.tags}</p>}
                                            </div>
                                        </div>

                                        {/* Featured Image */}
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h4 className="text-sm font-medium text-gray-900 mb-4">Featured Image</h4>
                                            <FeaturedImageUpload
                                                value={data.featured_image}
                                                onChange={(url) => setData('featured_image', url)}
                                                error={errors.featured_image}
                                            />
                                        </div>

                                        {/* SEO */}
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h4 className="text-sm font-medium text-gray-900 mb-4">SEO Settings</h4>
                                            
                                            {/* Meta Title */}
                                            <div className="mb-4">
                                                <label htmlFor="meta_title" className="block text-sm font-medium text-gray-700">
                                                    Meta Title
                                                </label>
                                                <input
                                                    type="text"
                                                    id="meta_title"
                                                    value={data.meta_title}
                                                    onChange={(e) => setData('meta_title', e.target.value)}
                                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="SEO title for search engines"
                                                />
                                                {errors.meta_title && <p className="mt-1 text-sm text-red-600">{errors.meta_title}</p>}
                                            </div>

                                            {/* Meta Description */}
                                            <div>
                                                <label htmlFor="meta_description" className="block text-sm font-medium text-gray-700">
                                                    Meta Description
                                                </label>
                                                <textarea
                                                    id="meta_description"
                                                    rows={3}
                                                    value={data.meta_description}
                                                    onChange={(e) => setData('meta_description', e.target.value)}
                                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="SEO description for search engines"
                                                />
                                                {errors.meta_description && <p className="mt-1 text-sm text-red-600">{errors.meta_description}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                                    <Link
                                        href={route('admin.blog.index')}
                                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Creating...' : 'Create Blog Post'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
