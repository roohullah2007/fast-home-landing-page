import { useRef, useState, useEffect } from 'react';

export default function FeaturedImageUpload({ 
    value = '', 
    onChange, 
    className = '',
    error = null 
}) {
    const fileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState(value);
    const [imageLoading, setImageLoading] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Update preview when value changes
    useEffect(() => {
        if (value && value !== preview) {
            setPreview(value);
            setImageError(false);
        }
    }, [value]);

    const handleImageLoad = () => {
        setImageLoading(false);
        setImageError(false);
    };

    const handleImageError = () => {
        setImageLoading(false);
        setImageError(true);
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageUpload(file);
        } else {
            alert('Please select a valid image file.');
        }
        // Reset input
        e.target.value = '';
    };

    const handleImageUpload = async (file) => {
        setIsUploading(true);
        const formData = new FormData();
        formData.append('featured_image', file);

        try {
            const response = await fetch('/admin/upload-featured-image', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Upload response:', data); // Debug log
                const imageUrl = data.url;
                setPreview(imageUrl);
                setImageError(false);
                if (onChange) {
                    onChange(imageUrl);
                }
            } else {
                console.error('Upload failed:', response.status, response.statusText); // Debug log
                alert('Failed to upload featured image. Please try again.');
            }
        } catch (error) {
            console.error('Featured image upload error:', error);
            alert('Failed to upload featured image. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = () => {
        setPreview('');
        setImageError(false);
        if (onChange) {
            onChange('');
        }
    };

    return (
        <div className={className}>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
            />

            {preview ? (
                <div className="relative">
                    {imageError ? (
                        <div className="w-full h-48 bg-gray-100 border border-gray-300 rounded-lg flex flex-col items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm text-gray-500">Failed to load image</p>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                                Upload new image
                            </button>
                        </div>
                    ) : (
                        <>
                            {imageLoading && (
                                <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                            <img 
                                src={preview} 
                                alt="Featured image preview" 
                                className="w-full h-48 object-cover rounded-lg border border-gray-300"
                                onLoad={handleImageLoad}
                                onError={handleImageError}
                                onLoadStart={() => setImageLoading(true)}
                                style={{ display: imageLoading ? 'none' : 'block' }}
                            />
                        </>
                    )}
                    <div className="absolute top-2 right-2 flex space-x-2">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                            title="Change image"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={removeImage}
                            className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
                            title="Remove image"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            ) : (
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                    {isUploading ? (
                        <div className="text-center">
                            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                            <p className="text-sm text-gray-600">Uploading...</p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-sm text-gray-600 mb-1">Click to upload featured image</p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                        </div>
                    )}
                </div>
            )}

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}
