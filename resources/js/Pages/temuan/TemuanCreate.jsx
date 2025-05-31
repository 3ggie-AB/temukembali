import { useForm } from '@inertiajs/react';
import React, { useState, useEffect, useRef } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function TemuanCreate({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        deskripsi: "",
        tanggal_ditemukan: "",
        provinsi_temuan: "",
        kota_temuan: "",
        barang_kategori: "",
        barang_warna: "",
        barang_merk: "",
        status: "ditemukan", 
        provinsi_hilang: "", 
        kota_hilang: "",  
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("temuan.store"), {
            onSuccess: () => reset(),
        });
    }

    const [provinsiId, setProvinsiId] = useState('');
    
        useEffect(() => {
            setProvinsiId(data.provinsi_hilang || '');
            setData('kota_hilang', '');
        }, [data.provinsi_hilang]);
    
        const handleProvinsiChange = (id) => {
            setData('provinsi_hilang', id);
        };
    
        const handleKotaChange = (id) => {
            setData('kota_hilang', id);
        };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Buat Laporan Temuan</h2>}
        >
            <Head title="Buat Temuan" />

            <div className="grid grid-cols-12 gap-4 px-4">
                <div className="col-span-12 m-6 p-6 bg-white dark:bg-gray-800 rounded shadow">
                    <form onSubmit={handleSubmit}>

                        <div className="mb-4">
                            <label htmlFor="deskripsi" className="block font-medium text-gray-700 dark:text-gray-300">
                                Deskripsi
                            </label>
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

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="provinsi_temuan" className="block font-medium text-gray-700 dark:text-gray-300">
                                    Provinsi
                                </label>
                                <input
                                    type="text"
                                    id="provinsi_temuan"
                                    value={data.provinsi_temuan}
                                    onChange={(e) => setData("provinsi_temuan", e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                />
                                {errors.provinsi_temuan && <p className="text-red-600 text-sm mt-1">{errors.provinsi_temuan}</p>}
                            </div>

                            <div>
                                <label htmlFor="kota_temuan" className="block font-medium text-gray-700 dark:text-gray-300">
                                    Kota
                                </label>
                                <input
                                    type="text"
                                    id="kota_temuan"
                                    value={data.kota_temuan}
                                    onChange={(e) => setData("kota_temuan", e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                />
                                {errors.kota_temuan && <p className="text-red-600 text-sm mt-1">{errors.kota_temuan}</p>}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="tanggal_ditemukan" className="block font-medium text-gray-700 dark:text-gray-300">
                                Tanggal Ditemukan
                            </label>
                            <input
                                type="date"
                                id="tanggal_ditemukan"
                                value={data.tanggal_ditemukan}
                                onChange={(e) => setData("tanggal_ditemukan", e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                required
                            />
                            {errors.tanggal_ditemukan && <p className="text-red-600 text-sm mt-1">{errors.tanggal_ditemukan}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label htmlFor="barang_kategori" className="block font-medium text-gray-700 dark:text-gray-300">
                                    Kategori Barang
                                </label>
                                <input
                                    type="text"
                                    id="barang_kategori"
                                    value={data.barang_kategori}
                                    onChange={(e) => setData("barang_kategori", e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                />
                                {errors.barang_kategori && <p className="text-red-600 text-sm mt-1">{errors.barang_kategori}</p>}
                            </div>

                            <div>
                                <label htmlFor="barang_warna" className="block font-medium text-gray-700 dark:text-gray-300">
                                    Warna Barang
                                </label>
                                <input
                                    type="text"
                                    id="barang_warna"
                                    value={data.barang_warna}
                                    onChange={(e) => setData("barang_warna", e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                />
                                {errors.barang_warna && <p className="text-red-600 text-sm mt-1">{errors.barang_warna}</p>}
                            </div>

                            <div>
                                <label htmlFor="barang_merk" className="block font-medium text-gray-700 dark:text-gray-300">
                                    Merk Barang
                                </label>
                                <input
                                    type="text"
                                    id="barang_merk"
                                    value={data.barang_merk}
                                    onChange={(e) => setData("barang_merk", e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                />
                                {errors.barang_merk && <p className="text-red-600 text-sm mt-1">{errors.barang_merk}</p>}
                            </div>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="status" className="block font-medium text-gray-700 dark:text-gray-300">
                                Status
                            </label>
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) => setData("status", e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                            >
                                <option value="Ditemukan">Ditemukan</option>
                                <option value="Baru">Baru</option>
                                <option value="Diproses">Diproses</option>
                                <option value="Selesai">Selesai</option>
                            </select>
                            {errors.status && <p className="text-red-600 text-sm mt-1">{errors.status}</p>}
                        </div>

                        <div className="flex justify-end gap-2">
                            <Link
                                href={route("temuan.index")}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                            >
                                Laporkan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
