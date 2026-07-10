import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Modal from '@/Components/Modal';

export default function Index({ auth, blogPosts = [] }) {
    const { delete: destroy, processing } = useForm();
    const [postToDelete, setPostToDelete] = useState(null);

    const confirmDelete = (post) => {
        setPostToDelete(post);
    };

    const closeModal = () => {
        if (!processing) {
            setPostToDelete(null);
        }
    };

    const handleDelete = () => {
        if (!postToDelete) return;
        destroy(route('admin.blog.destroy', postToDelete.id), {
            preserveScroll: true,
            onSuccess: () => setPostToDelete(null),
        });
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
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
            header={<h1 className="text-2xl font-bold text-gray-900">Manage Blog Posts</h1>}
        >
            <Head title="Manage Blog Posts" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Blog Posts</h3>
                                <Link
                                    href={route('admin.blog.create')}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Create New Post
                                </Link>
                            </div>

                            {blogPosts.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Title
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Author
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Published Date
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Views
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {blogPosts.map((post) => (
                                                <tr key={post.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            {post.featured_image && (
                                                                <div className="flex-shrink-0 h-12 w-12 mr-4">
                                                                    <img className="h-12 w-12 rounded object-cover" src={post.featured_image} alt="" />
                                                                </div>
                                                            )}
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {post.title || 'Untitled Post'}
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    {post.excerpt && post.excerpt.length > 60 
                                                                        ? post.excerpt.substring(0, 60) + '...' 
                                                                        : (post.excerpt || 'No excerpt')}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {post.author_name || 'Unknown Author'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {getStatusBadge(post.status)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {formatDate(post.published_at)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {post.views || 0}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                                                        <Link
                                                            href={route('admin.blog.show', post.id)}
                                                            className="text-blue-600 hover:text-blue-900"
                                                        >
                                                            View
                                                        </Link>
                                                        <Link
                                                            href={route('admin.blog.edit', post.id)}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => confirmDelete(post)}
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
                            ) : (
                                <div className="text-left md:text-center py-12">
                                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                    </svg>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts found</h3>
                                    <p className="text-gray-600 mb-6">Get started by creating your first blog post to share with your audience.</p>
                                    <Link
                                        href={route('admin.blog.create')}
                                        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        Create Your First Post
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={postToDelete !== null} onClose={closeModal} maxWidth="md">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Delete Blog Post
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Are you sure you want to delete
                        {postToDelete ? ` "${postToDelete.title || 'this post'}"` : ' this post'}?
                        This action cannot be undone.
                    </p>
                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            disabled={processing}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={processing}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
                        >
                            {processing ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}
