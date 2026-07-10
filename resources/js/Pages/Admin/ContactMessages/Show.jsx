import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Show({ auth, contact }) {
    const { data, setData, patch, processing } = useForm({
        status: contact.status,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('admin.contact-messages.update', contact.id));
    };

    const getStatusColor = (status) => {
        const colors = {
            'new': 'bg-blue-100 text-blue-800',
            'replied': 'bg-green-100 text-green-800',
            'closed': 'bg-gray-100 text-gray-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Contact: ${contact.full_name}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h1 className="text-2xl font-semibold text-gray-900">Contact Message Details</h1>
                                    <div className="mt-2">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(contact.status)}`}>
                                            {contact.status}
                                        </span>
                                    </div>
                                </div>
                                <Link
                                    href={route('admin.contact-messages.index')}
                                    className="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                >
                                    ← Back to Messages
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Contact Information */}
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Full Name</label>
                                            <div className="text-gray-900">{contact.full_name}</div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Email</label>
                                            <div className="text-gray-900">
                                                <a href={`mailto:${contact.email}`} className="text-blue-600 hover:text-blue-800">
                                                    {contact.email}
                                                </a>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Phone</label>
                                            <div className="text-gray-900">
                                                <a href={`tel:${contact.phone}`} className="text-blue-600 hover:text-blue-800">
                                                    {contact.phone}
                                                </a>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Address</label>
                                            <div className="text-gray-900">{contact.address || 'Not provided'}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Preferences */}
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Preferences</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Best Time to Contact</label>
                                            <div className="text-gray-900 capitalize">{contact.best_time || 'Not specified'}</div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Preferred Contact Method</label>
                                            <div className="text-gray-900 capitalize">{contact.contact_method || 'Not specified'}</div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">How They Heard About Us</label>
                                            <div className="text-gray-900 capitalize">{contact.hear_about || 'Not specified'}</div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Property Owner</label>
                                            <div className="text-gray-900">
                                                {contact.is_owner ? 'Yes' : contact.is_owner === 'no' ? 'No' : 'Not specified'}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Property Listed</label>
                                            <div className="text-gray-900">
                                                {contact.is_listed ? 'Yes' : contact.is_listed === 'no' ? 'No' : 'Not specified'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Message Information */}
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Message Information</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Submitted</label>
                                            <div className="text-gray-900">{formatDate(contact.created_at)}</div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Last Updated</label>
                                            <div className="text-gray-900">{formatDate(contact.updated_at)}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Update */}
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Update Status</h3>
                                    <form onSubmit={handleSubmit}>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                                <select
                                                    value={data.status}
                                                    onChange={(e) => setData('status', e.target.value)}
                                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    <option value="new">New</option>
                                                    <option value="replied">Replied</option>
                                                    <option value="closed">Closed</option>
                                                </select>
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                                            >
                                                {processing ? 'Updating...' : 'Update Status'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Message Content */}
                            <div className="mt-6 bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Message</h3>
                                <div className="text-gray-900 whitespace-pre-wrap">{contact.message}</div>
                            </div>

                            {/* Additional Data */}
                            {contact.additional_data && Object.keys(contact.additional_data).length > 0 && (
                                <div className="mt-6 bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
                                    <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                                        {JSON.stringify(contact.additional_data, null, 2)}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
