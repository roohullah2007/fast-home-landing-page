import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Show({ auth, blogPost }) {
    const formatDate = (dateString) => {
        if (!dateString) return 'Not published';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status) => {
        const statusStyles = {
            published: 'bg-green-100 text-green-800',
            draft: 'bg-yellow-100 text-yellow-800',
            archived: 'bg-gray-100 text-gray-800'
        };
        
        return (
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[status] || statusStyles.draft}`}>
                {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Draft'}
            </span>
        );
    };

    return (
        <AdminLayout
            header={<h1 className="text-2xl font-bold text-gray-900">View Blog Post</h1>}
        >
            <Head title={`View: ${blogPost.title}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <Link
                                        href={route('admin.blog.index')}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        ← Back to Blog Posts
                                    </Link>
                                </div>
                                <div className="flex space-x-2">
                                    <Link
                                        href={route('admin.blog.edit', blogPost.id)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        Edit Post
                                    </Link>
                                </div>
                            </div>

                            {/* Post Meta */}
                            <div className="border-b border-gray-200 pb-6 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h1 className="text-3xl font-bold text-gray-900">{blogPost.title}</h1>
                                    {getStatusBadge(blogPost.status)}
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                                    <div>
                                        <strong>Author:</strong> {blogPost.author_name || 'Unknown'}
                                    </div>
                                    <div>
                                        <strong>Published:</strong> {formatDate(blogPost.published_at)}
                                    </div>
                                    <div>
                                        <strong>Category:</strong> {blogPost.category || 'Uncategorized'}
                                    </div>
                                    <div>
                                        <strong>Views:</strong> {blogPost.views || 0}
                                    </div>
                                    <div>
                                        <strong>Featured:</strong> {blogPost.is_featured ? 'Yes' : 'No'}
                                    </div>
                                    <div>
                                        <strong>Comments:</strong> {blogPost.allow_comments ? 'Enabled' : 'Disabled'}
                                    </div>
                                </div>

                                {blogPost.tags && blogPost.tags.length > 0 && (
                                    <div className="mt-4">
                                        <strong className="text-sm text-gray-600">Tags:</strong>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {blogPost.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                                                >
                                                    {tag.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-4">
                                    <strong className="text-sm text-gray-600">URL Slug:</strong>
                                    <code className="ml-2 px-2 py-1 bg-gray-100 rounded text-sm">/blog/{blogPost.slug}</code>
                                </div>
                            </div>

                            {/* Featured Image */}
                            {blogPost.featured_image && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">Featured Image</h3>
                                    <img 
                                        src={blogPost.featured_image} 
                                        alt={blogPost.title}
                                        className="max-w-full h-auto rounded-lg shadow-md"
                                    />
                                </div>
                            )}

                            {/* Excerpt */}
                            {blogPost.excerpt && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">Excerpt</h3>
                                    <p className="text-gray-700 italic bg-gray-50 p-4 rounded-lg">
                                        {blogPost.excerpt}
                                    </p>
                                </div>
                            )}

                            {/* Content */}
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-3">Content</h3>
                                <div className="prose max-w-none">
                                    <div 
                                        className="bg-gray-50 p-6 rounded-lg text-gray-800 blog-content"
                                        dangerouslySetInnerHTML={{ __html: blogPost.content }}
                                    />
                                </div>
                            </div>

                            {/* SEO Information */}
                            {(blogPost.meta_title || blogPost.meta_description) && (
                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">SEO Information</h3>
                                    {blogPost.meta_title && (
                                        <div className="mb-3">
                                            <strong className="text-sm text-gray-600">Meta Title:</strong>
                                            <p className="text-gray-800">{blogPost.meta_title}</p>
                                        </div>
                                    )}
                                    {blogPost.meta_description && (
                                        <div>
                                            <strong className="text-sm text-gray-600">Meta Description:</strong>
                                            <p className="text-gray-800">{blogPost.meta_description}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
