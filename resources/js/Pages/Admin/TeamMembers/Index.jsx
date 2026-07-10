import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ teamMembers }) {
    const handleDelete = (id, name) => {
        if (confirm(`Are you sure you want to remove ${name} from the team?`)) {
            router.delete(route('admin.team-members.destroy', id));
        }
    };

    const handleToggleActive = (member) => {
        router.put(route('admin.team-members.update', member.id), {
            ...member,
            is_active: !member.is_active,
        }, { preserveScroll: true });
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold text-gray-800">Team Members</h2>}>
            <Head title="Team Members - Admin" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium text-gray-900">
                            {teamMembers.length} Team Member{teamMembers.length !== 1 ? 's' : ''}
                        </h3>
                        <Link
                            href={route('admin.team-members.create')}
                            className="inline-flex items-center px-4 py-2 bg-[#03407F] text-white rounded-md hover:bg-[#02356b] transition-colors text-sm font-medium"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Team Member
                        </Link>
                    </div>

                    <div className="bg-white shadow overflow-hidden rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Photo</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {teamMembers.map((member) => (
                                    <tr key={member.id} className={!member.is_active ? 'bg-gray-50 opacity-60' : ''}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {member.image_url ? (
                                                <img
                                                    src={member.image_url}
                                                    alt={member.name}
                                                    className="h-12 w-12 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <span className="text-gray-500 text-lg font-medium">
                                                        {member.name.charAt(0)}
                                                    </span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                            {member.email && (
                                                <div className="text-sm text-gray-500">{member.email}</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {member.position}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {member.sort_order ?? '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => handleToggleActive(member)}
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer ${
                                                    member.is_active
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {member.is_active ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                            <Link
                                                href={route('admin.team-members.edit', member.id)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(member.id, member.name)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {teamMembers.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                            No team members yet. Click "Add Team Member" to get started.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
