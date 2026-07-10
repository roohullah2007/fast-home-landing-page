import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <>
            <Head title="Register | Fast Home Cash Offers" />
            
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                
                <main className="mt-[80px] lg:mt-[102px]">
                    {/* Hero Section */}
                    <section className="relative bg-cover bg-center bg-no-repeat py-20" style={{
                        backgroundImage: 'url(/images/register-bg.jpg), url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
                    }}>
                        {/* Background Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                        
                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                {/* Left Side - Welcome Text */}
                                <div className="text-white">
                                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                        Join Our Team
                                    </h1>
                                    <p className="text-xl mb-8">
                                        Create your admin account to start managing your website content and help grow our real estate business.
                                    </p>
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            <span>Full admin dashboard access</span>
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                            </svg>
                                            <span>Manage team and content</span>
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                            <span>Track applications and analytics</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Right Side - Register Form */}
                                <div className="w-full max-w-md mx-auto">
                                    <div className="bg-white rounded-lg shadow-2xl p-8">
                                        <div className="mb-8 text-left md:text-center">
                                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                                            <p className="text-gray-600">Get started with your admin dashboard</p>
                                        </div>

                                        <form onSubmit={submit} className="space-y-6">
                                            <div>
                                                <InputLabel htmlFor="name" value="Full Name" className="text-gray-700 font-medium" />
                                                <TextInput
                                                    id="name"
                                                    name="name"
                                                    value={data.name}
                                                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    autoComplete="name"
                                                    isFocused={true}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    placeholder="Enter your full name"
                                                    required
                                                />
                                                <InputError message={errors.name} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="email" value="Email Address" className="text-gray-700 font-medium" />
                                                <TextInput
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    value={data.email}
                                                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    autoComplete="username"
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    placeholder="Enter your email"
                                                    required
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
                                                    autoComplete="new-password"
                                                    onChange={(e) => setData('password', e.target.value)}
                                                    placeholder="Create a password"
                                                    required
                                                />
                                                <InputError message={errors.password} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-gray-700 font-medium" />
                                                <TextInput
                                                    id="password_confirmation"
                                                    type="password"
                                                    name="password_confirmation"
                                                    value={data.password_confirmation}
                                                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    autoComplete="new-password"
                                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                                    placeholder="Confirm your password"
                                                    required
                                                />
                                                <InputError message={errors.password_confirmation} className="mt-2" />
                                            </div>

                                            <div>
                                                <PrimaryButton 
                                                    className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200" 
                                                    disabled={processing}
                                                >
                                                    {processing ? 'Creating Account...' : 'Create Account'}
                                                </PrimaryButton>
                                            </div>

                                            <div className="text-left md:text-center">
                                                <p className="text-sm text-gray-600">
                                                    Already have an account?{' '}
                                                    <Link
                                                        href={route('login')}
                                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                                    >
                                                        Sign in here
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
