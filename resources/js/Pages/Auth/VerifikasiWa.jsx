import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifikasiWaForm({ user }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        token: '',
        alamat: '',
        provinsi: '',
        kota: '',
    });
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };
    const submit = (e) => {
        e.preventDefault();

        post(route('verifikasi.token.wa'), data);
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md dark:bg-gray-800 dark:text-white">
            <h2 className="text-xl font-bold mb-4">Buka Pesan yang di Kirim ke Whatsapp Anda untuk Verifikasi !</h2>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label htmlFor="token" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Token</label>
                    <input
                        type="text"
                        name="token"
                        id="token"
                        value={data.token}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="alamat" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Alamat</label>
                    <textarea
                        name="alamat"
                        id="alamat"
                        rows="3"
                        value={data.alamat}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="provinsi" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Provinsi</label>
                    <input
                        type="text"
                        name="provinsi"
                        id="provinsi"
                        value={data.provinsi}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="kota" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Kota</label>
                    <input
                        type="text"
                        name="kota"
                        id="kota"
                        value={data.kota}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                    Verifikasi
                </button>
            </form>
        </div>
    );
}
