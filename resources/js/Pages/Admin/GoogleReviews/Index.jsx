import { Head, useForm, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

function Stars({ rating = 5 }) {
    return (
        <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
                <svg
                    key={i}
                    className={`w-4 h-4 ${i < rating ? 'fill-current' : 'fill-current text-gray-300'}`}
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

export default function Index({ auth, reviews = [], placeId = '', hasApiKey = false, rating = null, total = null }) {
    const { flash } = usePage().props;
    const [searchQuery, setSearchQuery] = useState('');
    const [searching, setSearching] = useState(false);
    const [candidates, setCandidates] = useState([]);
    const [searchError, setSearchError] = useState(null);

    const { data, setData, post, processing } = useForm({
        place_id: placeId || '',
    });

    const handleDownload = (e) => {
        e.preventDefault();
        post(route('admin.google-reviews.sync'), { preserveScroll: true });
    };

    const findBusiness = async () => {
        if (!searchQuery.trim()) return;
        setSearching(true);
        setSearchError(null);
        setCandidates([]);

        try {
            const response = await fetch(route('admin.google-reviews.search'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '',
                },
                body: JSON.stringify({ query: searchQuery }),
            });

            if (!response.ok) {
                setSearchError(`Server returned ${response.status} ${response.statusText}.`);
                return;
            }

            const result = await response.json();
            if (!result.success) {
                setSearchError(result.error || 'No results found.');
                return;
            }
            if (!result.candidates || result.candidates.length === 0) {
                setSearchError('No matching business found. Try a more specific name or address.');
                return;
            }
            setCandidates(result.candidates);
        } catch (error) {
            setSearchError('Could not reach the server to search Google.');
        } finally {
            setSearching(false);
        }
    };

    const toggleVisible = (review) => {
        router.patch(
            route('admin.google-reviews.update', review.id),
            { is_visible: !review.is_visible },
            { preserveScroll: true }
        );
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this review?')) {
            router.delete(route('admin.google-reviews.destroy', id), { preserveScroll: true });
        }
    };

    return (
        <AdminLayout header={<h1 className="text-2xl font-bold text-gray-900">Google Reviews</h1>}>
            <Head title="Google Reviews" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {flash?.success && (
                        <div className="rounded-md bg-green-50 border border-green-200 p-4 text-sm text-green-800">
                            {flash.success}
                        </div>
                    )}
                    {flash?.error && (
                        <div className="rounded-md bg-red-50 border border-red-200 p-4 text-sm text-red-800">
                            {flash.error}
                        </div>
                    )}

                    {rating ? (
                        <div className="rounded-md bg-blue-50 border border-blue-200 p-4 text-sm text-blue-900">
                            Current Google rating: <span className="font-semibold">{Number(rating).toFixed(1)}</span>
                            {total ? <> ({total} reviews)</> : null}
                        </div>
                    ) : null}

                    {/* Download panel */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-1">Download Reviews from Google</h3>
                            <p className="text-sm text-gray-500 mb-4">
                                Google returns up to 5 reviews per fetch (a Google limitation). The Place ID must
                                belong to a business that has public Google reviews.
                            </p>

                            {!hasApiKey && (
                                <div className="rounded-md bg-yellow-50 border border-yellow-200 p-4 text-sm text-yellow-800 mb-4">
                                    No Google Places API key is configured. Add one under{' '}
                                    <a href={route('admin.settings.index')} className="font-medium underline">Settings</a>{' '}
                                    before downloading reviews.
                                </div>
                            )}

                            {/* Find my business */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Find my business
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="e.g. Fast Home Cash Offers, City"
                                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={findBusiness}
                                        disabled={searching || !hasApiKey}
                                        className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
                                    >
                                        {searching ? 'Searching…' : 'Find my business'}
                                    </button>
                                </div>
                                {searchError && (
                                    <p className="mt-2 text-sm text-red-600">{searchError}</p>
                                )}
                                {candidates.length > 0 && (
                                    <ul className="mt-3 border border-gray-200 rounded-md divide-y divide-gray-200">
                                        {candidates.map((c) => (
                                            <li key={c.place_id}>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setData('place_id', c.place_id);
                                                        setCandidates([]);
                                                    }}
                                                    className="w-full text-left px-4 py-3 hover:bg-gray-50"
                                                >
                                                    <span className="block font-medium text-gray-900">{c.name}</span>
                                                    <span className="block text-sm text-gray-500">{c.formatted_address}</span>
                                                    <span className="block text-xs text-gray-400 mt-1">{c.place_id}</span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Place ID + download */}
                            <form onSubmit={handleDownload}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Google Place ID
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={data.place_id}
                                        onChange={(e) => setData('place_id', e.target.value)}
                                        placeholder="ChIJ..."
                                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    <button
                                        type="submit"
                                        disabled={processing || !hasApiKey || !data.place_id}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                                    >
                                        {processing ? 'Downloading…' : 'Download Reviews'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Imported reviews */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Imported Reviews ({reviews.length})
                            </h3>

                            {reviews.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead>
                                            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                <th className="px-3 py-2">Author</th>
                                                <th className="px-3 py-2">Rating</th>
                                                <th className="px-3 py-2">Review</th>
                                                <th className="px-3 py-2">Date</th>
                                                <th className="px-3 py-2">Visible</th>
                                                <th className="px-3 py-2"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {reviews.map((review) => (
                                                <tr key={review.id} className="align-top">
                                                    <td className="px-3 py-3">
                                                        <div className="flex items-center">
                                                            {review.author_photo_url ? (
                                                                <img className="h-9 w-9 rounded-full mr-3" src={review.author_photo_url} alt={review.author_name} />
                                                            ) : (
                                                                <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                                                    <span className="text-sm font-medium text-gray-600">
                                                                        {review.author_name?.charAt(0) || 'G'}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            <span className="text-sm font-medium text-gray-900">{review.author_name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-3 py-3"><Stars rating={review.rating} /></td>
                                                    <td className="px-3 py-3 max-w-md">
                                                        <p className="text-sm text-gray-700">
                                                            {review.text && review.text.length > 160
                                                                ? review.text.substring(0, 160) + '…'
                                                                : (review.text || '—')}
                                                        </p>
                                                    </td>
                                                    <td className="px-3 py-3 text-sm text-gray-500 whitespace-nowrap">
                                                        {review.relative_time_description || '—'}
                                                    </td>
                                                    <td className="px-3 py-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleVisible(review)}
                                                            className={`px-2 py-1 rounded text-xs font-medium ${
                                                                review.is_visible
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : 'bg-gray-100 text-gray-600'
                                                            }`}
                                                        >
                                                            {review.is_visible ? 'Visible' : 'Hidden'}
                                                        </button>
                                                    </td>
                                                    <td className="px-3 py-3 text-right">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(review.id)}
                                                            className="text-red-600 hover:text-red-900 text-sm font-medium"
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
                                <div className="text-center py-8">
                                    <p className="text-gray-600">
                                        No reviews imported yet. Enter your Google Place ID above and click
                                        “Download Reviews”.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
