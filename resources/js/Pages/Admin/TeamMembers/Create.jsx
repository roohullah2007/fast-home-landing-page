import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import TeamMemberForm from './TeamMemberForm';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        position: '',
        bio: '',
        photo: null,
        email: '',
        phone: '',
        linkedin_url: '',
        sort_order: 0,
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.team-members.store'), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold text-gray-800">Add Team Member</h2>}>
            <Head title="Add Team Member - Admin" />

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
                            submitLabel="Add Team Member"
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
