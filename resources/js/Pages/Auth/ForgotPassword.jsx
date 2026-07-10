import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot Password | Fast Home Cash Offers" />
            
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                
                <main className="mt-[80px] lg:mt-[102px]">
                    {/* Hero Section */}
                    <section className="relative bg-cover bg-center bg-no-repeat py-20" style={{
                        backgroundImage: 'url(/images/forgot-password-bg.jpg), url(https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
                    }}>
                        {/* Background Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                        
                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-center">
                                {/* Forgot Password Form */}
                                <div className="w-full max-w-md">
                                    <div className="bg-white rounded-lg shadow-2xl p-8">
                                        <div className="mb-8 text-left md:text-center">
                                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
                                            </p>
                                        </div>

                                        {status && (
                                            <div className="mb-4 font-medium text-sm text-green-600 bg-green-50 p-3 rounded-md">
                                                {status}
                                            </div>
                                        )}

                                        <form onSubmit={submit} className="space-y-6">
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email Address
                                                </label>
                                                <TextInput
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    value={data.email}
                                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    isFocused={true}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    placeholder="Enter your email address"
                                                />
                                                <InputError message={errors.email} className="mt-2" />
                                            </div>

                                            <div>
                                                <PrimaryButton 
                                                    className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200" 
                                                    disabled={processing}
                                                >
                                                    {processing ? 'Sending...' : 'Email Password Reset Link'}
                                                </PrimaryButton>
                                            </div>

                                            <div className="text-left md:text-center">
                                                <a
                                                    href={route('login')}
                                                    className="text-sm text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                                                >
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                                    </svg>
                                                    Back to login
                                                </a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                
                <Footer />
            </div>
        </>
    );
}
