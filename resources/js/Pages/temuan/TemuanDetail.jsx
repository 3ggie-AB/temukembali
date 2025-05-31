import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function TemuanDetail({ auth, temuan }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Detail Temuan {temuan.barang_merk || '-'}
                </h2>
            }
        >
            <Head title="Detail Temuan" />

            <div className="px-4 py-6 max-w-8xl mx-auto">
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                    <div className="space-y-4 mb-6">
                        <DetailItem label="Deskripsi" value={temuan.deskripsi || '-'} />
                        <DetailItem label="Tanggal Ditemukan" value={temuan.tanggal_temuan || '-'} />
                        <DetailItem label="Provinsi" value={temuan.provinsi_temuan || '-'} />
                        <DetailItem label="Kota" value={temuan.kota_temuan || '-'} />
                        <DetailItem label="Kategori Barang" value={temuan.barang_kategori || '-'} />
                        <DetailItem label="Warna Barang" value={temuan.barang_warna || '-'} />
                        <DetailItem label="Merk Barang" value={temuan.barang_merk || '-'} />
                        <DetailItem label="Ciri Khas" value={temuan.barang_cirikhusus || '-'} />
                        <DetailItem label="Status" value={temuan.status || '-'} />
                        <DetailItem label="Jumlah Dilihat" value={`${temuan.jumlah_dilihat || 0} kali`} />
                    </div>

                    <div className="flex justify-end mt-6">
                        <Link
                            href={route('temuan.index')}
                            className="bg-gray-700 hover:bg-gray-900 text-white text-sm px-4 py-2 rounded transition duration-200"
                        >
                            &larr; Kembali
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

const DetailItem = ({ label, value }) => (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-2 last:border-none">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-300">{label}</p>
        <p className="text-base font-semibold text-gray-800 dark:text-white">{value}</p>
    </div>
);
