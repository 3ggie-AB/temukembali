import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Provinsi } from '@/Components/laravolt/Provinsi';
import { Kota } from '@/Components/laravolt/Kota';

export default function KehilanganEdit({ auth, kehilangan }) {
    const { data, setData, put, processing, errors } = useForm({
        deskripsi: kehilangan.deskripsi || '',
        provinsi_hilang: kehilangan.provinsi_hilang || '',
        kota_hilang: kehilangan.kota_hilang || '',
        tanggal_hilang: kehilangan.tanggal_hilang || '',
        barang_kategori: kehilangan.barang_kategori || '',
        barang_warna: kehilangan.barang_warna || '',
        barang_merk: kehilangan.barang_merk || '',
        barang_cirikhusus: kehilangan.barang_cirikhusus || '',
    });


    useEffect(() => {
        if (data.provinsi_hilang !== kehilangan.provinsi_hilang) {
            setData('kota_hilang', '');
        }
    }, [data.provinsi_hilang]);

    const submit = (e) => {
        e.preventDefault();
        put(route('kehilangan.update', kehilangan.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Edit Laporan Kehilangan</h2>}
        >
            <Head title="Edit Kehilangan" />

            <div className="grid grid-cols-12 gap-4 px-4">
                <div className="col-span-12 m-6 p-6 bg-white dark:bg-gray-800 rounded shadow">
                    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi</label>
                            <textarea
                                value={data.deskripsi}
                                onChange={(e) => setData('deskripsi', e.target.value)}
                                className={`mt-1 block w-full border rounded-md shadow-sm dark:bg-gray-700 dark:text-white ${
                                    errors.deskripsi ? 'border-red-500' : 'border-gray-300'
                                }`}
                                rows={3}
                            />
                            {errors.deskripsi && <p className="text-red-600 text-sm">{errors.deskripsi}</p>}
                        </div>

                        {/* Provinsi dan Kota */}
                        <div className="md:col-span-2 grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Provinsi Hilang</label>
                                <Provinsi
                                    value={data.provinsi_hilang}
                                    onChange={(id) => {
                                        setData('provinsi_hilang', id);
                                        setData('kota_hilang', '');
                                    }}
                                    className={`mt-1 w-full border rounded-md shadow-sm dark:bg-gray-700 dark:text-white ${
                                        errors.provinsi_hilang ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                {errors.provinsi_hilang && <p className="text-red-600 text-sm mt-1">{errors.provinsi_hilang}</p>}
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Kota Hilang</label>
                                <Kota
                                    ProvinsiKode={data.provinsi_hilang}
                                    value={data.kota_hilang}
                                    onChange={(id) => setData('kota_hilang', id)}
                                    className={`mt-1 w-full border rounded-md shadow-sm dark:bg-gray-700 dark:text-white ${
                                        errors.kota_hilang ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    disabled={!data.provinsi_hilang}
                                />
                                {errors.kota_hilang && <p className="text-red-600 text-sm mt-1">{errors.kota_hilang}</p>}
                            </div>
                        </div>

                        {/* Tanggal, Kategori, Warna, Merk, Ciri Khas - copy saja dari Create */}
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal Hilang</label>
                            <input
                                type="date"
                                value={data.tanggal_hilang}
                                onChange={(e) => setData('tanggal_hilang', e.target.value)}
                                className={`mt-1 block w-full border rounded-md shadow-sm dark:bg-gray-700 dark:text-white ${
                                    errors.tanggal_hilang ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.tanggal_hilang && <p className="text-red-600 text-sm">{errors.tanggal_hilang}</p>}
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Kategori Barang</label>
                            <input
                                type="text"
                                value={data.barang_kategori}
                                onChange={(e) => setData('barang_kategori', e.target.value)}
                                className={`mt-1 block w-full border rounded-md shadow-sm dark:bg-gray-700 dark:text-white ${
                                    errors.barang_kategori ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.barang_kategori && <p className="text-red-600 text-sm">{errors.barang_kategori}</p>}
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Warna Barang</label>
                            <input
                                type="text"
                                value={data.barang_warna}
                                onChange={(e) => setData('barang_warna', e.target.value)}
                                className={`mt-1 block w-full border rounded-md shadow-sm dark:bg-gray-700 dark:text-white ${
                                    errors.barang_warna ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.barang_warna && <p className="text-red-600 text-sm">{errors.barang_warna}</p>}
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Merk Barang</label>
                            <input
                                type="text"
                                value={data.barang_merk}
                                onChange={(e) => setData('barang_merk', e.target.value)}
                                className={`mt-1 block w-full border rounded-md shadow-sm dark:bg-gray-700 dark:text-white ${
                                    errors.barang_merk ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.barang_merk && <p className="text-red-600 text-sm">{errors.barang_merk}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Ciri Khas</label>
                            <textarea
                                value={data.barang_cirikhusus}
                                onChange={(e) => setData('barang_cirikhusus', e.target.value)}
                                className={`mt-1 block w-full border rounded-md shadow-sm dark:bg-gray-700 dark:text-white ${
                                    errors.barang_cirikhusus ? 'border-red-500' : 'border-gray-300'
                                }`}
                                rows={3}
                            />
                            {errors.barang_cirikhusus && <p className="text-red-600 text-sm">{errors.barang_cirikhusus}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-2 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200 disabled:opacity-50"
                            >
                                Update Laporan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
