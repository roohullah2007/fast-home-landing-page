import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        customer_name: '',
        content: '',
        rating: 5,
        location: '',
        video_url: '',
        video: null,
        image: null,
        is_featured: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.testimonials.store'), {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
        }
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('video', file);
        }
    };

    return (
        <AdminLayout
            header={<h1 className="text-2xl font-bold text-gray-900">Create New Testimonial</h1>}
        >
            <Head title="Create New Testimonial" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Testimonial Details</h3>
                                <Link
                                    href={route('admin.testimonials.index')}
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    ← Back to Testimonials
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
                                            placeholder="e.g., New York, NY"
                                        />
                                        {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                                    </div>

                                    {/* Rating */}
                                    <div>
                                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                                            Rating
                                        </label>
                                        <select
                                            id="rating"
                                            value={data.rating}
                                            onChange={(e) => setData('rating', parseInt(e.target.value))}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value={5}>5 Stars</option>
                                            <option value={4}>4 Stars</option>
                                            <option value={3}>3 Stars</option>
                                            <option value={2}>2 Stars</option>
                                            <option value={1}>1 Star</option>
                                        </select>
                                        {errors.rating && <p className="mt-1 text-sm text-red-600">{errors.rating}</p>}
                                    </div>

                                    {/* Customer Image */}
                                    <div>
                                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                            Customer Image
                                        </label>
                                        <input
                                            type="file"
                                            id="image"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                        {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                                        <p className="mt-1 text-xs text-gray-500">Upload a customer photo (JPG, PNG, GIF)</p>
                                    </div>

                                    {/* Video Upload */}
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
                                        <p className="mt-1 text-xs text-gray-500">Upload a customer video (MP4, WebM, MOV — up to 50&nbsp;MB). Shown in the Video Testimonials section.</p>
                                    </div>

                                    {/* Video URL (alternative to upload) */}
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
                                        <p className="mt-1 text-xs text-gray-500">Optional. Paste a YouTube link or an existing video path. If you upload a file above, it takes precedence.</p>
                                    </div>

                                    {/* Testimonial Content */}
                                    <div className="lg:col-span-2">
                                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                            Testimonial Content *
                                        </label>
                                        <textarea
                                            id="content"
                                            rows={6}
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Write the customer's testimonial here..."
                                            required
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
                                                Featured testimonial (highlight on homepage)
                                            </label>
                                        </div>
                                        {errors.is_featured && <p className="mt-1 text-sm text-red-600">{errors.is_featured}</p>}
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                                    <Link
                                        href={route('admin.testimonials.index')}
                                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Creating...' : 'Create Testimonial'}
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
