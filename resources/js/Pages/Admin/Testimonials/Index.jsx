import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ auth, testimonials = [] }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            destroy(route('admin.testimonials.destroy', id));
        }
    };

    return (
        <AdminLayout
            header={<h1 className="text-2xl font-bold text-gray-900">Manage Testimonials</h1>}
        >
            <Head title="Manage Testimonials" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Customer Testimonials</h3>
                                <Link
                                    href={route('admin.testimonials.create')}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Add New Testimonial
                                </Link>
                            </div>

                            {testimonials.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                    {testimonials.map((testimonial) => (
                                        <div key={testimonial.id} className="bg-white border border-gray-200 rounded-lg p-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center mb-4">
                                                        <div className="flex-shrink-0">
                                                            {testimonial.avatar ? (
                                                            <img className="h-12 w-12 rounded-full" src={testimonial.avatar} alt={testimonial.customer_name || 'Customer'} />
                                                            ) : (
                                                            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                                            <span className="text-lg font-medium text-gray-600">
                                                            {testimonial.customer_name ? testimonial.customer_name.charAt(0) : 'C'}
                                                            </span>
                                                            </div>
                                                            )}
                                                        </div>
                                                        <div className="ml-4">
                                                            <h4 className="text-lg font-medium text-gray-900">{testimonial.customer_name || 'Anonymous Customer'}</h4>
                                                            <p className="text-sm text-gray-500">{testimonial.location || 'Customer'}</p>
                                                        </div>
                                                    </div>
                                                    <blockquote className="text-gray-700 italic mb-4">
                                                        "{testimonial.content && testimonial.content.length > 150 
                                                            ? testimonial.content.substring(0, 150) + '...' 
                                                            : (testimonial.content || 'No content available')}"
                                                    </blockquote>
                                                    <div className="flex items-center">
                                                        <div className="flex text-yellow-400">
                                                            {[...Array(5)].map((_, i) => (
                                                                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            ))}
                                                        </div>
                                                        <span className="ml-2 text-sm text-gray-500">{testimonial.rating || 5}/5</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex justify-end space-x-2 pt-4 border-t border-gray-200">
                                                <Link
                                                    href={route('admin.testimonials.edit', testimonial.id)}
                                                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(testimonial.id)}
                                                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-left md:text-center py-8">
                                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials found</h3>
                                    <p className="text-gray-600 mb-4">Get started by adding your first customer testimonial.</p>
                                    <Link
                                        href={route('admin.testimonials.create')}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        Add New Testimonial
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
