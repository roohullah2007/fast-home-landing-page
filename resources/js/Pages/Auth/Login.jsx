import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <>
            <Head title="Login | Fast Home Cash Offers" />
            
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                
                <main className="mt-[80px] lg:mt-[102px]">
                    {/* Hero Section */}
                    <section className="relative bg-cover bg-center bg-no-repeat py-20" style={{
                        backgroundImage: 'url(/images/login-bg.jpg), url(https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
                    }}>
                        {/* Background Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                        
                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                {/* Left Side - Welcome Text */}
                                <div className="text-white">
                                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                        Welcome Back
                                    </h1>
                                    <p className="text-xl mb-8">
                                        Access your admin dashboard to manage your website content, team members, and job postings.
                                    </p>
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>Manage job postings and applications</span>
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>Update team member profiles</span>
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>Manage customer testimonials</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Right Side - Login Form */}
                                <div className="w-full max-w-md mx-auto">
                                    <div className="bg-white rounded-lg shadow-2xl p-8">
                                        <div className="mb-8 text-left md:text-center">
                                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
                                            <p className="text-gray-600">Access your admin dashboard</p>
                                        </div>

                                        {status && (
                                            <div className="mb-4 font-medium text-sm text-green-600 bg-green-50 p-3 rounded-md">
                                                {status}
                                            </div>
                                        )}

                                        <form onSubmit={submit} className="space-y-6">
                                            <div>
                                                <InputLabel htmlFor="email" value="Email Address" className="text-gray-700 font-medium" />
                                                <TextInput
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    value={data.email}
                                                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    autoComplete="username"
                                                    isFocused={true}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    placeholder="Enter your email"
                                                />
                                                <InputError message={errors.email} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="password" value="Password" className="text-gray-700 font-medium" />
                                                <TextInput
                                                    id="password"
                                                    type="password"
                                                    name="password"
                                                    value={data.password}
                                                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    autoComplete="current-password"
                                                    onChange={(e) => setData('password', e.target.value)}
                                                    placeholder="Enter your password"
                                                />
                                                <InputError message={errors.password} className="mt-2" />
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <label className="flex items-center">
                                                    <Checkbox
                                                        name="remember"
                                                        checked={data.remember}
                                                        onChange={(e) => setData('remember', e.target.checked)}
                                                        className="text-blue-600"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                                </label>

                                                {canResetPassword && (
                                                    <Link
                                                        href={route('password.request')}
                                                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                                    >
                                                        Forgot password?
                                                    </Link>
                                                )}
                                            </div>

                                            <div>
                                                <PrimaryButton 
                                                    className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200" 
                                                    disabled={processing}
                                                >
                                                    {processing ? 'Signing in...' : 'Sign In'}
                                                </PrimaryButton>
                                            </div>

                                            <div className="text-left md:text-center">
                                                <p className="text-sm text-gray-600">
                                                    Don't have an account?{' '}
                                                    <Link
                                                        href={route('register')}
                                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                                    >
                                                        Create one here
                                                    </Link>
                                                </p>
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
