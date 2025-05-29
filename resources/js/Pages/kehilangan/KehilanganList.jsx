import React, { useState, useEffect, useRef } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

function ActionDropdown({ itemId }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Tutup dropdown kalau klik di luar
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-center" ref={dropdownRef}>
            <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
                aria-expanded={open}
                aria-haspopup="true"
                aria-label="Buka menu aksi"
            >
                <svg
                    className="w-5 h-5 text-gray-600 dark:text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                >
                    <circle cx="10" cy="4" r="2" />
                    <circle cx="10" cy="10" r="2" />
                    <circle cx="10" cy="16" r="2" />
                </svg>
            </button>

            {open && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-20"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex="-1"
                >
                    <div className="py-1" role="none">
                        <Link
                            href={`/kehilangan/${itemId}`}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            onClick={() => setOpen(false)}
                        >
                            Detail
                        </Link>
                        <Link
                            href={`/kehilangan/saya/${itemId}/edit`}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            onClick={() => setOpen(false)}
                        >
                            Edit
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function KehilanganList({ auth }) {
    const { kehilangan } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Daftar Kehilangan
                </h2>
            }
        >
            <Head title="List Kehilangan" />
            <div className="py-6 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <div className="mb-3 text-end mt-21">
                        <Link
                            href={route("kehilangan.create")}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Lapor Kehilangan
                        </Link>
                    </div>

                    {kehilangan.length === 0 ? (
                        <p className="text-gray-600 dark:text-gray-300">
                            Belum ada laporan kehilangan.
                        </p>
                    ) : (
                        <table className="min-w-full table-auto border-collapse mt-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700">
                                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-center">
                                        Deskripsi
                                    </th>
                                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-center">
                                        Tanggal Hilang
                                    </th>
                                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-center">
                                        Kategori
                                    </th>
                                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-center">
                                        Warna
                                    </th>
                                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-center">
                                        Merk
                                    </th>
                                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-center">
                                        Status
                                    </th>
                                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-center">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                              
                                {kehilangan.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-center">
                                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                                            {item.deskripsi}
                                        </td>
                                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                                            {new Date(
                                                item.tanggal_hilang
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                                            {item.barang_kategori}
                                        </td>
                                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                                            {item.barang_warna}
                                        </td>
                                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                                            {item.barang_merk}
                                        </td>
                                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                                            {item.status}
                                        </td>
                                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-center">
                                            <ActionDropdown itemId={item.id} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
