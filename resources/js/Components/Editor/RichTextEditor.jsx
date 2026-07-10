import { useRef, useEffect, useState } from 'react';

export default function RichTextEditor({ 
    value = '', 
    onChange, 
    placeholder = 'Start writing your blog post...', 
    className = '',
    id = 'editor'
}) {
    const editorRef = useRef(null);
    const fileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (editorRef.current && value !== editorRef.current.innerHTML) {
            editorRef.current.innerHTML = value;
        }
    }, [value]);

    const handleInput = () => {
        if (editorRef.current && onChange) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const handleKeyDown = (e) => {
        // Handle common shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'b':
                    e.preventDefault();
                    document.execCommand('bold');
                    break;
                case 'i':
                    e.preventDefault();
                    document.execCommand('italic');
                    break;
                case 'u':
                    e.preventDefault();
                    document.execCommand('underline');
                    break;
            }
        }
    };

    const formatText = (command, value = null) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
        handleInput();
    };

    const handleImageUpload = async (file) => {
        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('/admin/upload-image', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            });

            if (response.ok) {
                const data = await response.json();
                const imageUrl = data.url;
                
                // Insert image at cursor position
                const img = `<img src="${imageUrl}" alt="Uploaded image" style="max-width: 100%; height: auto; margin: 10px 0;" />`;
                document.execCommand('insertHTML', false, img);
                handleInput();
            } else {
                alert('Failed to upload image. Please try again.');
            }
        } catch (error) {
            console.error('Image upload error:', error);
            alert('Failed to upload image. Please try again.');
        } finally {
            setIsUploading(false);
        }
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

    const insertLink = () => {
        const url = prompt('Enter the URL:');
        if (url) {
            const text = window.getSelection().toString() || url;
            formatText('insertHTML', `<a href="${url}" target="_blank">${text}</a>`);
        }
    };

    const ToolbarButton = ({ onClick, title, children, isActive = false }) => (
        <button
            type="button"
            onClick={onClick}
            title={title}
            className={`p-2 rounded-md border transition-colors ${
                isActive 
                    ? 'bg-blue-100 border-blue-300 text-blue-700' 
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
        >
            {children}
        </button>
    );

    return (
        <div className={`border border-gray-300 rounded-md ${className}`}>
            {/* Toolbar */}
            <div className="border-b border-gray-200 p-3 bg-gray-50 rounded-t-md">
                <div className="flex flex-wrap gap-1">
                    {/* Text Formatting */}
                    <div className="flex gap-1 mr-3">
                        <ToolbarButton onClick={() => formatText('bold')} title="Bold (Ctrl+B)">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6V4zM6 12h9a4 4 0 014 4 4 4 0 01-4 4H6v-8z" />
                            </svg>
                        </ToolbarButton>
                        <ToolbarButton onClick={() => formatText('italic')} title="Italic (Ctrl+I)">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 4l4 16M6 8h12M4 16h12" />
                            </svg>
                        </ToolbarButton>
                        <ToolbarButton onClick={() => formatText('underline')} title="Underline (Ctrl+U)">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l7-7 3 3-7 7-3-3z" />
                            </svg>
                        </ToolbarButton>
                    </div>

                    {/* Headers */}
                    <div className="flex gap-1 mr-3">
                        <ToolbarButton onClick={() => formatText('formatBlock', 'h2')} title="Heading 2">
                            <span className="text-sm font-bold">H2</span>
                        </ToolbarButton>
                        <ToolbarButton onClick={() => formatText('formatBlock', 'h3')} title="Heading 3">
                            <span className="text-sm font-bold">H3</span>
                        </ToolbarButton>
                        <ToolbarButton onClick={() => formatText('formatBlock', 'p')} title="Paragraph">
                            <span className="text-sm">P</span>
                        </ToolbarButton>
                    </div>

                    {/* Lists */}
                    <div className="flex gap-1 mr-3">
                        <ToolbarButton onClick={() => formatText('insertUnorderedList')} title="Bullet List">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </ToolbarButton>
                        <ToolbarButton onClick={() => formatText('insertOrderedList')} title="Numbered List">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0-8V3m0 0l3 3m-3-3L6 6" />
                            </svg>
                        </ToolbarButton>
                    </div>

                    {/* Link and Image */}
                    <div className="flex gap-1 mr-3">
                        <ToolbarButton onClick={insertLink} title="Insert Link">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                        </ToolbarButton>
                        <ToolbarButton 
                            onClick={() => fileInputRef.current?.click()} 
                            title="Insert Image"
                        >
                            {isUploading ? (
                                <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            )}
                        </ToolbarButton>
                    </div>

                    {/* Alignment */}
                    <div className="flex gap-1">
                        <ToolbarButton onClick={() => formatText('justifyLeft')} title="Align Left">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8M4 18h16" />
                            </svg>
                        </ToolbarButton>
                        <ToolbarButton onClick={() => formatText('justifyCenter')} title="Align Center">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M8 12h8M4 18h16" />
                            </svg>
                        </ToolbarButton>
                        <ToolbarButton onClick={() => formatText('justifyRight')} title="Align Right">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M12 12h8M4 18h16" />
                            </svg>
                        </ToolbarButton>
                    </div>
                </div>
            </div>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
            />

            {/* Editor */}
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                className="min-h-[400px] p-4 focus:outline-none"
                style={{ 
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word'
                }}
                data-placeholder={placeholder}
                suppressContentEditableWarning={true}
            />

            <style jsx>{`
                [contenteditable]:empty:before {
                    content: attr(data-placeholder);
                    color: #9ca3af;
                    font-style: italic;
                }
                [contenteditable] h2 {
                    font-size: 1.5em;
                    font-weight: bold;
                    margin: 0.83em 0;
                }
                [contenteditable] h3 {
                    font-size: 1.25em;
                    font-weight: bold;
                    margin: 1em 0;
                }
                [contenteditable] p {
                    margin: 1em 0;
                }
                [contenteditable] ul,
                [contenteditable] ol {
                    margin: 1em 0;
                    padding-left: 2em;
                }
                [contenteditable] a {
                    color: #3b82f6;
                    text-decoration: underline;
                }
                [contenteditable] img {
                    display: block;
                    max-width: 100%;
                    height: auto;
                    margin: 10px auto;
                    border-radius: 8px;
                }
            `}</style>
        </div>
    );
}
