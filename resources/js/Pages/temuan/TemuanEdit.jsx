import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Provinsi } from '@/Components/laravolt/Provinsi';
import { Kota } from '@/Components/laravolt/Kota';

export default function TemuanEdit({ auth, temuan }) {
    const { data, setData, put, processing, errors } = useForm({
        deskripsi: temuan.deskripsi || '',
        provinsi_temuan: temuan.provinsi_temuan || '',
        kota_temuan: temuan.kota_temuan || '',
        tanggal_temuan: new Date(temuan.tanggal_temuan).toISOString().split("T")[0] || '',
        barang_kategori: temuan.barang_kategori || '',
        barang_warna: temuan.barang_warna || '',
        barang_merk: temuan.barang_merk || '',
        barang_cirikhusus: temuan.barang_cirikhusus || '',
    });


    useEffect(() => {
        if (data.provinsi_temuan !== temuan.provinsi_temuan) {
            setData('kota_temuan', '');
        }
    }, [data.provinsi_temuan]);

    const submit = (e) => {
        e.preventDefault();
        put(route('temuan.update', temuan.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Edit Laporan Temuan</h2>}
        >
            <Head title="Edit Temuan" />

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
                                <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Provinsi Temuan</label>
                                <Provinsi
                                    value={data.provinsi_temuan}
                                    onChange={(id) => {
                                        setData('provinsi_temuan', id);
                                        setData('kota_temuan', '');
                                    }}
                                    className={`mt-1 w-full border rounded-md shadow-sm dark:bg-gray-700 dark:text-white ${
                                        errors.provinsi_temuan ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                {errors.provinsi_temuan && <p className="text-red-600 text-sm mt-1">{errors.provinsi_temuan}</p>}
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Kota Temuan</label>
                                <Kota
                                    ProvinsiKode={data.provinsi_temuan}
                                    value={data.kota_temuan}
                                    onChange={(id) => setData('kota_temuan', id)}
                                    className={`mt-1 w-full border rounded-md shadow-sm dark:bg-gray-700 dark:text-white ${
                                        errors.kota_temuan ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    disabled={!data.provinsi_temuan}
                                />
                                {errors.kota_temuan && <p className="text-red-600 text-sm mt-1">{errors.kota_temuan}</p>}
                            </div>
                        </div>

                        {/* Tanggal, Kategori, Warna, Merk, Ciri Khas - copy saja dari Create */}
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal Temuan</label>
                            <input
                                type="date"
                                value={data.tanggal_temuan}
                                onChange={(e) => setData('tanggal_temuan', e.target.value)}
                                className={`mt-1 block w-full border rounded-md shadow-sm dark:bg-gray-700 dark:text-white ${
                                    errors.tanggal_temuan ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.tanggal_temuan && <p className="text-red-600 text-sm">{errors.tanggal_temuan}</p>}
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
