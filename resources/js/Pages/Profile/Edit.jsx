import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AdminLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile Settings
                </h2>
            }
        >
            <Head title="Profile Settings" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* Profile Header */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700">
                            <div className="flex items-center space-x-4">
                                <div className="h-16 w-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-white">
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-white">{auth.user.name}</h1>
                                    <p className="text-blue-100">{auth.user.email}</p>
                                    <p className="text-blue-200 text-sm">Administrator</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Information */}
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Profile Information
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                                Update your account's profile information and email address.
                            </p>
                        </div>
                        <div className="p-6">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>
                    </div>

                    {/* Password Update */}
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Update Password
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                                Ensure your account is using a long, random password to stay secure.
                            </p>
                        </div>
                        <div className="p-6">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    </div>

                    {/* Account Management */}
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                                Delete Account
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                                Once your account is deleted, all of its resources and data will be permanently deleted.
                            </p>
                        </div>
                        <div className="p-6">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>

                    {/* Admin Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <div className="flex items-start">
                            <svg className="w-6 h-6 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h4 className="text-sm font-medium text-blue-800">Administrator Account</h4>
                                <p className="text-sm text-blue-700 mt-1">
                                    You have full access to all administrative functions of Fast Home Cash Offers. 
                                    Use this access responsibly and keep your login credentials secure.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
