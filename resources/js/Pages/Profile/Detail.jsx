import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Edit({ user, temuan, kehilangan }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-blue-900 dark:text-blue-200">
                    Profile User {user.name}
                </h2>
            }
        >
            <Head title={`Profile ${user.name}`} />
            <div className="w-full max-w-5xl mx-auto px-0 sm:px-6 lg:px-12 py-0 sm:py-10">
                <div
                    className={`
                        relative bg-gradient-to-br from-blue-100/80 via-white/80 to-blue-100/80
                        dark:from-blue-100/80 dark:via-gray-900/80 dark:to-blue-900/40 shadow-xl overflow-hidden
                        min-h-[400px]
                        rounded-none sm:rounded-3xl
                        w-full
                    `}
                >
                    <div className="h-40 w-full bg-gradient-to-r from-blue-100/70 via-blue-100/30 to-white/0"></div>
                    <div className="absolute left-1/2 sm:left-12 top-24 -translate-x-1/2 sm:translate-x-0 z-20">
                        <img src={user.photo || "/default/profile.png"} alt="Profile" className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-lg object-cover bg-blue-100"
                        />
                    </div>
                    <div className="pt-28 pb-10 px-0 sm:px-8 lg:pl-64">
                        <div className="flex me-2 flex-col sm:flex-row sm:items-center sm:gap-6 px-4 sm:px-0">
                            <div>
                                <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-100">{user.name}</h2>
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded ml-0">
                                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                </span>
                                {user.is_verified && (
                                    <span className="inline-block mt-1 text-xs text-green-700 font-semibold bg-green-100 px-2 py-0.5 rounded">
                                        Verified
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-gray-900 dark:text-blue-100 px-4 sm:px-0">
                            <div>
                                <span className="font-semibold">Email:</span> {user.email}
                            </div>
                            <div>
                                <span className="font-semibold">WhatsApp:</span> {user.whatsapp || "-"}
                            </div>
                            <div>
                                <span className="font-semibold">Alamat:</span> {user.alamat}
                            </div>
                            <div>
                                <span className="font-semibold">Provinsi:</span> {user.provinsi || "-"}
                            </div>
                            <div>
                                <span className="font-semibold">Kota:</span> {user.kota || "-"}
                            </div>
                            <div>
                                <span className="font-semibold">Laporan Hilang:</span> {kehilangan} Laporan
                            </div>
                            <div>
                                <span className="font-semibold">Laporan Temuan:</span> {temuan} Laporan
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}