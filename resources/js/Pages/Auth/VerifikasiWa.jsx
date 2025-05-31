import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Provinsi } from '@/Components/laravolt/Provinsi';
import { Kota } from '@/Components/laravolt/Kota';

export default function VerifikasiWaForm({ user, token }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token || '',
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-green-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all">
            <Head title="Verifikasi WhatsApp" />
            <div className="relative w-full max-w-lg mx-auto p-8 rounded-3xl shadow-2xl bg-white/70 dark:bg-gray-800/80 backdrop-blur-md border border-blue-200 dark:border-gray-700">
                {/* WhatsApp Icon */}
                <div className="flex justify-center mb-4">
                    <div className="bg-green-500 rounded-full p-3 shadow-lg">
                        <svg width="30" height="32" fill="currentColor" className="text-white" viewBox="0 0 24 24">
                            <path d="M12.004 2.003c-5.523 0-9.997 4.474-9.997 9.997 0 1.762.464 3.482 1.344 4.995l-1.406 5.14a1 1 0 0 0 1.23 1.23l5.14-1.406a9.963 9.963 0 0 0 4.995 1.344c5.523 0 9.997-4.474 9.997-9.997s-4.474-9.997-9.997-9.997zm0 18.001a7.96 7.96 0 0 1-4.07-1.13l-.29-.17-3.05.83.82-2.98-.19-.3a7.96 7.96 0 0 1-1.13-4.07c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8zm4.42-5.59c-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.42-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.28-.22.22-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.13 3.54.58.2 1.03.32 1.38.41.58.15 1.1.13 1.52.08.46-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-2xl font-extrabold text-center text-gray-800 dark:text-white mb-2 tracking-tight">
                    Verifikasi WhatsApp
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                    Cek pesan yang dikirimkan ke WhatsApp Kamu untuk verifikasi Akun.
                </p>

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <label htmlFor="token" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Token Verifikasi
                        </label>
                        <input
                            type="text"
                            name="token"
                            id="token"
                        value={data.token || token || ''}
                            onChange={handleChange}
                            className="block w-full px-4 py-2 border border-blue-300 dark:border-blue-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition"
                            placeholder="Masukkan token dari WhatsApp"
                            required
                        />
                        {errors.token && <p className="text-red-500 text-xs mt-1">{errors.token}</p>}
                    </div>

                    <div>
                        <label htmlFor="alamat" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Alamat Lengkap
                        </label>
                        <textarea
                            name="alamat"
                            id="alamat"
                            rows="3"
                            value={data.alamat}
                            onChange={handleChange}
                            className="block w-full px-4 py-2 border border-blue-300 dark:border-blue-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition"
                            placeholder="Contoh: Jl. Mawar No. 123, RT 01 RW 02"
                            required
                        />
                        {errors.alamat && <p className="text-red-500 text-xs mt-1">{errors.alamat}</p>}
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label htmlFor="provinsi" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                Provinsi
                            </label>
                            <Provinsi
                                className={`flex w-full px-4 py-2 border border-blue-300 dark:border-blue-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition`}
                                onChange={(id) => {
                                    setData('provinsi', id);
                                    setData('kota', '');
                                }}
                                value={data.provinsi}
                            />
                            {errors.provinsi && <p className="text-red-500 text-xs mt-1">{errors.provinsi}</p>}
                        </div>
                        <div className="flex-1">
                            <label htmlFor="kota" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                Kota/Kabupaten
                            </label>
                            <Kota
                                className={`flex w-full px-4 py-2 border border-blue-300 dark:border-blue-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition`}
                                ProvinsiKode={data.provinsi}
                                onChange={(id) => setData('kota', id)}
                                value={data.kota}
                                disabled={!data.provinsi}
                            />
                            {errors.kota && <p className="text-red-500 text-xs mt-1">{errors.kota}</p>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-white-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {processing && (
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                        )}
                        Verifikasi Akun
                    </button>
                </form>
            </div>
        </div>
    );
}