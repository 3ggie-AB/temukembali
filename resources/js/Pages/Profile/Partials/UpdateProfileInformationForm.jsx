import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            role: user.role,
            alamat: user.alamat,
            photo: null,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    // const handleAmbilRole = () => {
    //     alert("Fitur ambil role belum diimplementasikan 😄");
    // };

    return (
        <div className="max-w-4xl mx-auto py-7 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Edit Profil</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Perbarui informasi profilmu di sini.</p>

            {/* Header Profile */}
            <div className="flex items-center gap-7 mb-10">
                <img
                    src={user.photo ? `/storage/${user.photo}` : '/default/profile.png'}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border"
                />

                <div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{user.name}</h1>
                    <p className="font-medium text-gray-500 dark:text-white">{user.email}</p>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded ml-0">
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>

                </div>
            </div>

            <form onSubmit={submit} className="space-y-6">

                <div>
                    <InputLabel htmlFor="name" value="Nama Baru" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="email"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="alamat" value="Alamat" />
                    <TextInput
                        id="alamat"
                        className="mt-1 block w-full"
                        value={data.alamat}
                        onChange={(e) => setData('alamat', e.target.value)}
                        autoComplete="street-address"
                    />
                    <InputError className="mt-1" message={errors.alamat} />
                </div>

              <div className="mt-4">
                <label
                    htmlFor="photo"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Upload Foto
                </label>
                <input
                    id="photo"
                    type="file"
                    className="w-full text-slate-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
                    onChange={(e) => setData('photo', e.target.files[0])}
                />
            </div>


                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="text-sm text-gray-800 dark:text-gray-200">
                        Email kamu belum diverifikasi.
                        <Link
                            href={route('verification.send')}
                            method="post"
                            as="button"
                            className="ml-2 text-indigo-600 underline hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                            Klik di sini untuk verifikasi ulang.
                        </Link>
                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-green-600 dark:text-green-400">
                                Link verifikasi baru telah dikirim ke emailmu.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center justify-end gap-4">
                    <PrimaryButton disabled={processing}>Simpan</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition-opacity duration-200"
                        enterFrom="opacity-0"
                        leave="transition-opacity duration-200"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600 dark:text-green-400">Data berhasil disimpan.</p>
                    </Transition>
                </div>
            </form>
        </div>
    );
}
