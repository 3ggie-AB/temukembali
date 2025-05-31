import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    Profil
                </h2>
            }
        >
            <Head title="Profil" />

            <div className="py-0">
                <div className="mx-auto max-w-7xl space-y-10">
                    <section className="bg-white shadow-sm sm:rounded-none dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b pb-2">
                            Informasi Pribadi
                        </h3>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </section>

                    <section className="bg-white shadow-sm sm:rounded-none dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b pb-2">
                            Ubah Password
                        </h3>
                        <UpdatePasswordForm className="max-w-xl" />
                    </section>

                    <section className="bg-white shadow-sm sm:rounded-none dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4 border-b pb-2">
                            Hapus Akun
                        </h3>
                        <DeleteUserForm className="max-w-xl" />
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
