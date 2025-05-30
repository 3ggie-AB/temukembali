import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Edit({ user, temuan, kehilangan }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Profile User {user.name}
                </h2>
            }
        >
            <Head title={`Profile ${user.name}`} />
                <div className="mx-auto max-w-20xl space-y-6 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
                        <div className="flex items-center gap-6">
                            <img
                                src={user.photo || "/default/profile.png"}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover border-2 border-slate-500 p-1"
                            />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                                <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                                {user.is_verified && (
                                    <span className="inline-block mt-1 text-xs text-green-600 font-semibold bg-green-100 px-2 py-0.5 rounded">
                                        Verified
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 space-y-2 text-gray-700">
                            <p><span className="font-semibold">Email:</span> {user.email}</p>
                            <p><span className="font-semibold">WhatsApp:</span> {user.whatsapp}</p>
                            <p><span className="font-semibold">Alamat:</span> {user.alamat}</p>
                            <p><span className="font-semibold">Provinsi:</span> {user.provinsi}</p>
                            <p><span className="font-semibold">Kota:</span> {user.kota}</p>
                            <p><span className="font-semibold">Laporan Hilang:</span> {kehilangan} Laporan</p>
                            <p><span className="font-semibold">Laporan Temuan:</span> {temuan} Laporan</p>
                        </div>
                    </div>
                </div>
        </AuthenticatedLayout>
    );
}
