import React, { useState, useEffect, useRef } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ModalKomentar from "./ModalKomentar";

export default function KehilanganList({ auth }) {
    const { kehilangan } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Detail Kehilangan
                </h2>
            }
        >
            <Head title="List Kehilangan" />
            <div className="py-6 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <div className="mb-3 mt-21">
                        <div className="mb-3">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Detail Kehilangan</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                                <div>
                                    <p><span className="font-semibold">Kategori:</span> Handphone</p>
                                    <p><span className="font-semibold">Merk:</span> Iphone</p>
                                    <p><span className="font-semibold">Warna:</span> Ungu</p>
                                    <p><span className="font-semibold">Ciri Khusus:</span> Kesing HP dengan desain bunga merah</p>
                                    <p><span className="font-semibold">Deskripsi:</span> Iphone x 25 x pro</p>
                                </div>
                                <div>
                                    <p><span className="font-semibold">Status:</span> Hilang</p>
                                    <p><span className="font-semibold">Tanggal Hilang:</span> 31 Mei 2025</p>
                                    <p><span className="font-semibold">Provinsi:</span> 15</p>
                                    <p><span className="font-semibold">Kota:</span> 1506</p>
                                    <p><span className="font-semibold">Dilihat:</span> 0 kali</p>
                                    <p><span className="font-semibold">Hubungi WA:</span> <a href="https://wa.me/6285875477953" target="_blank" className="text-blue-500 hover:underline">6285875477953</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white mx-auto sm:px-6 lg:px-8 p-6 mt-4 shadow-sm sm:rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Komentar :</h3>
                    <div className="space-y-4">
                        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow">
                            <p className="text-sm text-gray-800 dark:text-white">Saya melihat barang seperti ini di dekat stasiun kemarin.</p>
                            <span className="text-xs text-gray-500">29 Mei 2025</span>
                        </div>
                        <ModalKomentar/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
