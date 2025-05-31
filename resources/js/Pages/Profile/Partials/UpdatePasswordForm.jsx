import { useState, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function UpdatePasswordForm({ className = '' }) {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <div className="max-w-2xl mx-auto py-7 px-4 sm:px-6 lg:px-8">
            <section className={className}>
                <header className="mb-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">Update Password</h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Pastikan kamu menggunakan kata sandi yang kuat untuk menjaga keamanan akun.
                    </p>
                </header>

                <form onSubmit={updatePassword} className="space-y-6">

                    {/* Current Password */}
                    <div>
                        <label htmlFor="current_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Kata Sandi Saat Ini
                        </label>
                        <div className="relative">
                            <TextInput
                                id="current_password"
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) => setData('current_password', e.target.value)}
                                type={showCurrent ? 'text' : 'password'}
                                className="block w-full pr-10"
                                autoComplete="current-password"
                            />
                            <span
                                onClick={() => setShowCurrent(!showCurrent)}
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 text-sm"
                            >
                                {showCurrent ? '🤫' : '🫣'}
                            </span>
                        </div>
                        <InputError message={errors.current_password} className="mt-2" />
                    </div>

                    {/* New Password */}
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Kata Sandi Baru
                        </label>
                        <div className="relative">
                            <TextInput
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                type={showNew ? 'text' : 'password'}
                                className="block w-full pr-10"
                                autoComplete="new-password"
                            />
                            <span
                                onClick={() => setShowNew(!showNew)}
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 text-sm"
                            >
                                {showNew ? '🤫' : '🫣'}
                            </span>
                        </div>
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Konfirmasi Kata Sandi Baru
                        </label>
                        <div className="relative">
                            <TextInput
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                type={showConfirm ? 'text' : 'password'}
                                className="block w-full pr-10"
                                autoComplete="new-password"
                            />
                            <span
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 text-sm"
                            >
                                {showConfirm ? '🤫' : '🫣'}
                            </span>
                        </div>
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <PrimaryButton disabled={processing}>Simpan</PrimaryButton>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition-opacity duration-200"
                            enterFrom="opacity-0"
                            leave="transition-opacity duration-200"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-green-600 dark:text-green-400">Kata sandi berhasil diperbarui.</p>
                        </Transition>
                    </div>
                </form>
            </section>
        </div>
    );
}
