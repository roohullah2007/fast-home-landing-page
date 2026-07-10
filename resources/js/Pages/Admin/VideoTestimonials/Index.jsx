import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

const isFileVideo = (url) => /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url || '');

const toEmbedUrl = (url) => {
    const yt = (url || '').match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/);
    return yt ? `https://www.youtube.com/embed/${yt[1]}` : url;
};

export default function Index({ videoTestimonials = [] }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this video testimonial?')) {
            destroy(route('admin.video-testimonials.destroy', id));
        }
    };

    return (
        <AdminLayout
            header={<h1 className="text-2xl font-bold text-gray-900">Manage Video Testimonials</h1>}
        >
            <Head title="Manage Video Testimonials" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Video Testimonials</h3>
                                <Link
                                    href={route('admin.video-testimonials.create')}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Add Video Testimonial
                                </Link>
                            </div>

                            {videoTestimonials.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {videoTestimonials.map((item) => (
                                        <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                            <div className="aspect-video bg-black">
                                                {isFileVideo(item.video_url) ? (
                                                    <video className="w-full h-full" controls preload="metadata">
                                                        <source src={item.video_url} />
                                                    </video>
                                                ) : (
                                                    <iframe
                                                        className="w-full h-full"
                                                        src={toEmbedUrl(item.video_url)}
                                                        title={`Testimonial from ${item.name}`}
                                                        frameBorder="0"
                                                        allowFullScreen
                                                    ></iframe>
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <h4 className="text-base font-medium text-gray-900">{item.name || 'Anonymous'}</h4>
                                                <p className="text-sm text-gray-500">{item.location || '—'}</p>
                                                {item.is_featured && (
                                                    <span className="inline-block mt-2 text-xs font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                                                        Featured
                                                    </span>
                                                )}
                                                <div className="mt-4 flex justify-end space-x-3 pt-3 border-t border-gray-200">
                                                    <Link
                                                        href={route('admin.video-testimonials.edit', item.id)}
                                                        className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="text-red-600 hover:text-red-900 text-sm font-medium"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-left md:text-center py-8">
                                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No video testimonials yet</h3>
                                    <p className="text-gray-600 mb-4">Upload your first customer video testimonial.</p>
                                    <Link
                                        href={route('admin.video-testimonials.create')}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        Add Video Testimonial
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
