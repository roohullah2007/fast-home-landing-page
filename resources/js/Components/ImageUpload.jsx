import { useState, useRef } from 'react';
import { router } from '@inertiajs/react';

export default function ImageUpload({ currentImage, onImageChange, label = "Upload Image", className = "" }) {
    const [preview, setPreview] = useState(currentImage);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB');
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);

        // Upload file using axios with CSRF token
        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            // Get CSRF token from meta tag
            const csrfToken = document.head.querySelector('meta[name="csrf-token"]')?.content;

            // Use axios which is already configured with CSRF token in Laravel
            const response = await window.axios.post('/api/upload/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-TOKEN': csrfToken,
                },
            });

            if (response.data && response.data.url) {
                onImageChange(response.data.url);
                setPreview(response.data.url);
            }
        } catch (error) {
            console.error('Upload error:', error);
            const errorMessage = error.response?.data?.message || 'Failed to upload image';
            alert(errorMessage);
            setPreview(currentImage);
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        onImageChange('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            
            <div className="flex items-start space-x-4">
                {/* Preview */}
                <div className="flex-shrink-0">
                    {preview ? (
                        <div className="relative">
                            <img 
                                src={preview} 
                                alt="Preview" 
                                className="h-32 w-32 object-cover rounded-lg border border-gray-300"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2U1ZTdlYiIvPgogIDxjaXJjbGUgY3g9IjUwIiBjeT0iMzUiIHI9IjE1IiBmaWxsPSIjOWNhM2FmIi8+CiAgPGVsbGlwc2UgY3g9IjUwIiBjeT0iNzUiIHJ4PSIzMCIgcnk9IjIwIiBmaWxsPSIjOWNhM2FmIi8+Cjwvc3ZnPg==';
                                }}
                            />
                            {uploading && (
                                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                                    <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-32 w-32 border-2 border-gray-300 border-dashed rounded-lg flex items-center justify-center bg-gray-50">
                            <svg className="h-12 w-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                            </svg>
                        </div>
                    )}
                </div>

                {/* Upload Controls */}
                <div className="flex-1">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="image-upload"
                        disabled={uploading}
                    />
                    
                    <div className="space-y-2">
                        <label
                            htmlFor="image-upload"
                            className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 0 1-.88-7.903A5 5 0 1 1 15.9 6L16 6a5 5 0 0 1 1 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            {uploading ? 'Uploading...' : 'Choose File'}
                        </label>
                        
                        {preview && (
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                disabled={uploading}
                            >
                                <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16" />
                                </svg>
                                Remove
                            </button>
                        )}
                    </div>
                    
                    <p className="mt-2 text-xs text-gray-500">
                        PNG, JPG, GIF up to 5MB
                    </p>
                </div>
            </div>
        </div>
    );
}