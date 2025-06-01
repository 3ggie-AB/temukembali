import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function KehilanganEdit({ auth, kehilangan }) {
    const { data, setData, post, processing, errors } = useForm({
        photo: null,
    });

    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('photo', file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('kehilangan.upload-foto', kehilangan.id), {
            forceFormData: true, // penting agar file dikirim sebagai FormData
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Upload Foto Kehilangan</h2>}
        >
            <Head title="Upload Foto" />

            <div className="grid grid-cols-12 gap-4 px-4">
                <div className="col-span-12 m-6 p-6 bg-white dark:bg-gray-800 rounded shadow">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">Foto Barang</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                                           file:rounded-full file:border-0
                                           file:text-sm file:font-semibold
                                           file:bg-blue-50 file:text-blue-700
                                           hover:file:bg-blue-100"
                            />
                            {errors.photo && <p className="text-red-600 text-sm mt-1">{errors.photo}</p>}
                        </div>

                        {preview && (
                            <div>
                                <p className="text-gray-700 dark:text-gray-300 mb-2">Preview Foto Baru :</p>
                                <img src={preview} alt="Preview" className="max-h-64 rounded border" />
                            </div>
                        )}

                        {kehilangan.photo ? (
                            <div>
                                <p className="text-gray-700 dark:text-gray-300 mb-1">Foto Lama:</p>
                                <img src={'/' + kehilangan.photo} alt="Foto Lama" className="max-h-64 rounded border" />
                            </div>
                        ) : (
                            <div>
                                <p className="text-gray-700 dark:text-gray-300 mb-1">Foto Lama:</p>
                                <p className="text-gray-500 dark:text-gray-400">Tidak ada foto lama.</p>
                            </div>
                        )}


                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200 disabled:opacity-50"
                            >
                                Upload Foto
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
