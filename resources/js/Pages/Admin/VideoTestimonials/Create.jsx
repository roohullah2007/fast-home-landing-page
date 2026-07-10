import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        customer_name: '',
        location: '',
        content: '',
        video: null,
        video_url: '',
        rating: 5,
        is_featured: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.video-testimonials.store'), {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('video', file);
        }
    };

    return (
        <AdminLayout
            header={<h1 className="text-2xl font-bold text-gray-900">Add Video Testimonial</h1>}
        >
            <Head title="Add Video Testimonial" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Video Testimonial Details</h3>
                                <Link href={route('admin.video-testimonials.index')} className="text-gray-600 hover:text-gray-800">
                                    ← Back to Video Testimonials
                                </Link>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                    {/* Customer Name */}
                                    <div>
                                        <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700">
                                            Customer Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="customer_name"
                                            value={data.customer_name}
                                            onChange={(e) => setData('customer_name', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                        {errors.customer_name && <p className="mt-1 text-sm text-red-600">{errors.customer_name}</p>}
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            id="location"
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="e.g., Austin, TX"
                                        />
                                        {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                                    </div>

                                    {/* Upload Video */}
                                    <div className="lg:col-span-2">
                                        <label htmlFor="video" className="block text-sm font-medium text-gray-700">
                                            Upload Video
                                        </label>
                                        <input
                                            type="file"
                                            id="video"
                                            onChange={handleVideoChange}
                                            accept="video/mp4,video/webm,video/ogg,video/quicktime"
                                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                        {errors.video && <p className="mt-1 text-sm text-red-600">{errors.video}</p>}
                                        <p className="mt-1 text-xs text-gray-500">MP4, WebM or MOV — up to 50&nbsp;MB.</p>
                                    </div>

                                    {/* Video URL */}
                                    <div className="lg:col-span-2">
                                        <label htmlFor="video_url" className="block text-sm font-medium text-gray-700">
                                            …or Video URL
                                        </label>
                                        <input
                                            type="text"
                                            id="video_url"
                                            value={data.video_url}
                                            onChange={(e) => setData('video_url', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="https://www.youtube.com/watch?v=… or /videos/name.mp4"
                                        />
                                        {errors.video_url && <p className="mt-1 text-sm text-red-600">{errors.video_url}</p>}
                                        <p className="mt-1 text-xs text-gray-500">Paste a YouTube link or existing video path. Uploading a file takes precedence.</p>
                                    </div>

                                    {/* Caption / quote */}
                                    <div className="lg:col-span-2">
                                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                            Caption / Quote
                                        </label>
                                        <textarea
                                            id="content"
                                            rows={3}
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Optional short quote shown with the video."
                                        />
                                        {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                                    </div>

                                    {/* Is Featured */}
                                    <div className="lg:col-span-2">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="is_featured"
                                                checked={data.is_featured}
                                                onChange={(e) => setData('is_featured', e.target.checked)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-900">
                                                Featured (show first)
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                                    <Link
                                        href={route('admin.video-testimonials.index')}
                                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Create Video Testimonial'}
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
