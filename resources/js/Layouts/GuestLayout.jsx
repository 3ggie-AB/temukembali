import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 dark:bg-gray-900">
            <div className="flex flex-col items-center">
                <Link href="/">
                    <ApplicationLogo className="h-40 w-40 fill-current text-gray-500" />
                </Link>
                <h1 className="mt-0 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    Welcome Back Temu Kembali
                </h1>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg dark:bg-gray-800">
                {children}
            </div>
        </div>
    );
}
