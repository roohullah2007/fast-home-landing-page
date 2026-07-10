import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import TeamMemberForm from './TeamMemberForm';

export default function Edit({ teamMember }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: teamMember.name || '',
        position: teamMember.position || '',
        bio: teamMember.bio || '',
        photo: null,
        email: teamMember.email || '',
        phone: teamMember.phone || '',
        linkedin_url: teamMember.linkedin_url || '',
        sort_order: teamMember.sort_order ?? 0,
        is_active: teamMember.is_active ?? true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.team-members.update', teamMember.id), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold text-gray-800">Edit Team Member</h2>}>
            <Head title={`Edit ${teamMember.name} - Admin`} />

            <div className="py-6">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link
                            href={route('admin.team-members.index')}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                            &larr; Back to Team Members
                        </Link>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <TeamMemberForm
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            onSubmit={handleSubmit}
                            submitLabel="Update Team Member"
                            currentImageUrl={teamMember.image_url}
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
