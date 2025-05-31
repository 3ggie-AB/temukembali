import { useForm } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const formatDate = (value) => {
    if (!value) return '';
    return new Date(value).toISOString().split('T')[0];
};

export default function TemuanEdit({ auth, temuan }) {
    const { data, setData, put, processing, errors } = useForm({
        deskripsi: temuan.deskripsi || '',
        tanggal_ditemukan: formatDate(temuan.tanggal_ditemukan ?? temuan.tanggal_temuan),
        provinsi_temuan: temuan.provinsi_temuan || '',
        kota_temuan: temuan.kota_temuan || '',
        barang_kategori: temuan.barang_kategori || '',
        barang_warna: temuan.barang_warna || '',
        barang_merk: temuan.barang_merk || '',
        status: temuan.status || 'Ditemukan',
        provinsi_hilang: temuan.provinsi_hilang || '',
        kota_hilang: temuan.kota_hilang || '',
        user_whatsapp: temuan.user_whatsapp || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('temuan.update', temuan.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Perbarui Temuan</h2>}
        >
            <Head title="Perbarui Temuan" />

            <div className="grid grid-cols-12 gap-4 px-4">
                <div className="col-span-12 m-6 p-6 bg-white dark:bg-gray-800 rounded shadow">
                    <form onSubmit={handleSubmit}>


                        {/* Deskripsi */}
                        <div className="mb-4">
                            <label htmlFor="deskripsi" className="block font-medium text-gray-700 dark:text-gray-300">Deskripsi</label>
                            <textarea
                                id="deskripsi"
                                value={data.deskripsi}
                                onChange={(e) => setData("deskripsi", e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                rows={3}
                                required
                            />
                            {errors.deskripsi && <p className="text-red-600 text-sm mt-1">{errors.deskripsi}</p>}
                        </div>

                        {/* Lokasi Temuan */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="provinsi_temuan" className="block font-medium text-gray-700 dark:text-gray-300">Provinsi Temuan</label>
                                <input
                                    type="text"
                                    id="provinsi_temuan"
                                    value={data.provinsi_temuan}
                                    onChange={(e) => setData("provinsi_temuan", e.target.value)}
                                    className="mt-1 block w-full rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="kota_temuan" className="block font-medium text-gray-700 dark:text-gray-300">Kota Temuan</label>
                                <input
                                    type="text"
                                    id="kota_temuan"
                                    value={data.kota_temuan}
                                    onChange={(e) => setData("kota_temuan", e.target.value)}
                                    className="mt-1 block w-full rounded-md"
                                />
                            </div>
                        </div>

                        {/* Tanggal */}
                        <div className="mb-4">
                            <label htmlFor="tanggal_ditemukan" className="block font-medium text-gray-700 dark:text-gray-300">Tanggal Ditemukan</label>
                            <input
                                type="date"
                                id="tanggal_ditemukan"
                                value={data.tanggal_ditemukan}
                                onChange={(e) => setData("tanggal_ditemukan", e.target.value)}
                                className="mt-1 block w-full rounded-md"
                                required
                            />
                        </div>

                        {/* Detail Barang */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label htmlFor="barang_kategori" className="block font-medium text-gray-700 dark:text-gray-300">Kategori</label>
                                <input
                                    type="text"
                                    id="barang_kategori"
                                    value={data.barang_kategori}
                                    onChange={(e) => setData("barang_kategori", e.target.value)}
                                    className="mt-1 block w-full rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="barang_warna" className="block font-medium text-gray-700 dark:text-gray-300">Warna</label>
                                <input
                                    type="text"
                                    id="barang_warna"
                                    value={data.barang_warna}
                                    onChange={(e) => setData("barang_warna", e.target.value)}
                                    className="mt-1 block w-full rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="barang_merk" className="block font-medium text-gray-700 dark:text-gray-300">Merk</label>
                                <input
                                    type="text"
                                    id="barang_merk"
                                    value={data.barang_merk}
                                    onChange={(e) => setData("barang_merk", e.target.value)}
                                    className="mt-1 block w-full rounded-md"
                                />
                            </div>
                        </div>

                        {/* Status */}
                        <div className="mb-4">
                            <label htmlFor="status" className="block font-medium text-gray-700 dark:text-gray-300">Status</label>
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) => setData("status", e.target.value)}
                                className="mt-1 block w-full rounded-md"
                            >
                                <option value="Ditemukan">Ditemukan</option>
                                <option value="Baru">Baru</option>
                                <option value="Diproses">Diproses</option>
                                <option value="Selesai">Selesai</option>
                            </select>
                        </div>

                        {/* Aksi */}
                        <div className="flex justify-end gap-2">
                            <a
                                href={route("temuan.index")}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Batal
                            </a>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                            >
                                Simpan Perubahan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
