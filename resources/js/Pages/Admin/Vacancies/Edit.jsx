import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Edit({ auth, vacancy }) {
    const { data, setData, put, processing, errors } = useForm({
        title: vacancy.title || '',
        description: vacancy.description || '',
        requirements: vacancy.requirements || '',
        responsibilities: vacancy.responsibilities || '',
        location: vacancy.location || '',
        department: vacancy.department || '',
        employment_type: vacancy.employment_type || 'Full-time',
        salary_range: vacancy.salary_range || '',
        experience_level: vacancy.experience_level || '',
        is_active: vacancy.is_active !== undefined ? vacancy.is_active : true,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.vacancies.update', vacancy.id));
    };

    return (
        <AdminLayout
            header={<h1 className="text-2xl font-bold text-gray-900">Edit Vacancy</h1>}
        >
            <Head title="Edit Vacancy" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Edit Job Vacancy Details</h3>
                                <Link
                                    href={route('admin.vacancies.index')}
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    ← Back to Vacancies
                                </Link>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                    {/* Title */}
                                    <div className="lg:col-span-2">
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                            Job Title *
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            id="location"
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="e.g., New York, NY"
                                        />
                                        {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                                    </div>

                                    {/* Department */}
                                    <div>
                                        <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                                            Department
                                        </label>
                                        <input
                                            type="text"
                                            id="department"
                                            value={data.department}
                                            onChange={(e) => setData('department', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="e.g., Engineering, Marketing"
                                        />
                                        {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
                                    </div>

                                    {/* Employment Type */}
                                    <div>
                                        <label htmlFor="employment_type" className="block text-sm font-medium text-gray-700">
                                            Employment Type
                                        </label>
                                        <select
                                            id="employment_type"
                                            value={data.employment_type}
                                            onChange={(e) => setData('employment_type', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Internship">Internship</option>
                                        </select>
                                        {errors.employment_type && <p className="mt-1 text-sm text-red-600">{errors.employment_type}</p>}
                                    </div>

                                    {/* Experience Level */}
                                    <div>
                                        <label htmlFor="experience_level" className="block text-sm font-medium text-gray-700">
                                            Experience Level
                                        </label>
                                        <select
                                            id="experience_level"
                                            value={data.experience_level}
                                            onChange={(e) => setData('experience_level', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Select level</option>
                                            <option value="Entry Level">Entry Level</option>
                                            <option value="Mid Level">Mid Level</option>
                                            <option value="Senior Level">Senior Level</option>
                                            <option value="Executive">Executive</option>
                                        </select>
                                        {errors.experience_level && <p className="mt-1 text-sm text-red-600">{errors.experience_level}</p>}
                                    </div>

                                    {/* Salary Range */}
                                    <div className="lg:col-span-2">
                                        <label htmlFor="salary_range" className="block text-sm font-medium text-gray-700">
                                            Salary Range
                                        </label>
                                        <input
                                            type="text"
                                            id="salary_range"
                                            value={data.salary_range}
                                            onChange={(e) => setData('salary_range', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="e.g., $50,000 - $70,000"
                                        />
                                        {errors.salary_range && <p className="mt-1 text-sm text-red-600">{errors.salary_range}</p>}
                                    </div>

                                    {/* Description */}
                                    <div className="lg:col-span-2">
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                            Job Description *
                                        </label>
                                        <textarea
                                            id="description"
                                            rows={4}
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Describe the role and what the candidate will be doing..."
                                            required
                                        />
                                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                                    </div>

                                    {/* Requirements */}
                                    <div className="lg:col-span-2">
                                        <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
                                            Requirements
                                        </label>
                                        <textarea
                                            id="requirements"
                                            rows={4}
                                            value={data.requirements}
                                            onChange={(e) => setData('requirements', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="List the required skills, education, and experience..."
                                        />
                                        {errors.requirements && <p className="mt-1 text-sm text-red-600">{errors.requirements}</p>}
                                    </div>

                                    {/* Responsibilities */}
                                    <div className="lg:col-span-2">
                                        <label htmlFor="responsibilities" className="block text-sm font-medium text-gray-700">
                                            Responsibilities
                                        </label>
                                        <textarea
                                            id="responsibilities"
                                            rows={4}
                                            value={data.responsibilities}
                                            onChange={(e) => setData('responsibilities', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="List the key responsibilities and duties..."
                                        />
                                        {errors.responsibilities && <p className="mt-1 text-sm text-red-600">{errors.responsibilities}</p>}
                                    </div>

                                    {/* Is Active */}
                                    <div className="lg:col-span-2">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="is_active"
                                                checked={data.is_active}
                                                onChange={(e) => setData('is_active', e.target.checked)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                                                Active (visible on careers page)
                                            </label>
                                        </div>
                                        {errors.is_active && <p className="mt-1 text-sm text-red-600">{errors.is_active}</p>}
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                                    <Link
                                        href={route('admin.vacancies.index')}
                                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Updating...' : 'Update Vacancy'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
