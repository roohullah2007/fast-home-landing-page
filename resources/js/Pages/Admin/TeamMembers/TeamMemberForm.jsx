import { useState, useRef } from 'react';
import { formatPhoneNumber } from '@/utils/phone';

export default function TeamMemberForm({ data, setData, errors, processing, onSubmit, submitLabel, currentImageUrl }) {
    const [preview, setPreview] = useState(currentImageUrl || null);
    const fileInputRef = useRef(null);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('photo', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleRemovePhoto = () => {
        setData('photo', null);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            {/* Photo Upload */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
                <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                        {preview ? (
                            <img src={preview} alt="Preview" className="h-24 w-24 rounded-full object-cover" />
                        ) : (
                            <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                                <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        )}
                    </div>
                    <div className="space-y-2">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {preview && (
                            <button
                                type="button"
                                onClick={handleRemovePhoto}
                                className="text-sm text-red-600 hover:text-red-800"
                            >
                                Remove photo
                            </button>
                        )}
                        <p className="text-xs text-gray-500">JPG, PNG, or WebP. Max 5MB.</p>
                    </div>
                </div>
                {errors.photo && <p className="mt-1 text-sm text-red-600">{errors.photo}</p>}
            </div>

            {/* Name */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name *</label>
                <input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Position */}
            <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position *</label>
                <input
                    id="position"
                    type="text"
                    value={data.position}
                    onChange={(e) => setData('position', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                />
                {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position}</p>}
            </div>

            {/* Bio */}
            <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                    id="bio"
                    rows={4}
                    value={data.bio}
                    onChange={(e) => setData('bio', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                        id="phone"
                        type="text"
                        value={data.phone}
                        onChange={(e) => setData('phone', formatPhoneNumber(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>
            </div>

            {/* LinkedIn */}
            <div>
                <label htmlFor="linkedin_url" className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
                <input
                    id="linkedin_url"
                    type="url"
                    value={data.linkedin_url}
                    onChange={(e) => setData('linkedin_url', e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {errors.linkedin_url && <p className="mt-1 text-sm text-red-600">{errors.linkedin_url}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sort Order */}
                <div>
                    <label htmlFor="sort_order" className="block text-sm font-medium text-gray-700">Display Order</label>
                    <input
                        id="sort_order"
                        type="number"
                        value={data.sort_order}
                        onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    <p className="mt-1 text-xs text-gray-500">Lower numbers appear first</p>
                </div>

                {/* Active Status */}
                <div className="flex items-center pt-6">
                    <input
                        id="is_active"
                        type="checkbox"
                        checked={data.is_active}
                        onChange={(e) => setData('is_active', e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                        Active (visible on website)
                    </label>
                </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
                <a
                    href={route('admin.team-members.index')}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Cancel
                </a>
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center px-4 py-2 bg-[#03407F] text-white text-sm font-medium rounded-md hover:bg-[#02356b] disabled:opacity-50 transition-colors"
                >
                    {processing ? 'Saving...' : submitLabel}
                </button>
            </div>
        </form>
    );
}
