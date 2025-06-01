import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Lupa kata sandi Anda? Tidak masalah. Kami akan mengirimkan Kode Verifikasi untuk mengatur ulang kata sandi Anda Lewat Nomor Whatsapp yang anda masukkan.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        +62
                    </span>
                    <input
                        type="tel"
                        name="whatsapp"
                        id="whatsapp"
                        className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="8123456789"
                        value={data.whatsapp}
                        onChange={(e) => setData('whatsapp', e.target.value)}
                        required
                    />
                </div>

                <InputError message={errors.whatsapp} className="mt-2" />

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Kirim Kode Verifikasi
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
