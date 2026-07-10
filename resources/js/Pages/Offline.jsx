import { Head } from '@inertiajs/react';

export default function Offline() {
    return (
        <>
            <Head title="Offline" />

            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="max-w-md w-full text-left md:text-center">
                    {/* Offline Icon */}
                    <div className="mb-8">
                        <svg
                            className="mx-auto h-24 w-24 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
                            />
                        </svg>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        You're Offline
                    </h1>

                    {/* Description */}
                    <p className="text-lg text-gray-600 mb-8">
                        It looks like you've lost your internet connection. Please check your
                        connection and try again.
                    </p>

                    {/* Retry Button */}
                    <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        <svg
                            className="mr-2 h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                        Try Again
                    </button>

                    {/* Tips */}
                    <div className="mt-12 text-left">
                        <h2 className="text-sm font-semibold text-gray-900 mb-3">
                            Tips to get back online:
                        </h2>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                Check your WiFi or mobile data connection
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                Try turning airplane mode on and off
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                Restart your router if using WiFi
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                Contact your internet service provider if the issue persists
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
