import React, { useState, useEffect, useRef } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

function ActionDropdown({ itemId }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);


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
                    className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex="-1"
                    style={{ minWidth: "8rem" }}
                >
                    <div className="py-1" role="none">
                        <Link
                            href={`/kehilangan/detail/${itemId}`}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-700"
                            role="menuitem"
                            tabIndex="-1"
                            onClick={() => setOpen(false)}>
                            Detail Kehilangan
                        </Link>
                        <Link
                            href={`/kehilangan/${itemId}/edit`}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            onClick={() => setOpen(false)}>
                            Perbarui
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function KehilanganList({ auth }) {
    const { kehilangan, flash = {} } = usePage().props;
    const [search, setSearch] = useState("");
    const [showAlert, setShowAlert] = useState(!!flash.success);

    useEffect(() => {
        if (flash.success) setShowAlert(true);
    }, [flash.success]);

    const filtered = kehilangan.filter((item) => {
        const q = search.toLowerCase();
        return (
            item.deskripsi?.toLowerCase().includes(q) ||
            (item.tanggal_hilang && new Date(item.tanggal_hilang).toLocaleDateString().includes(q)) ||
            item.barang_kategori?.toLowerCase().includes(q) ||
            item.barang_warna?.toLowerCase().includes(q) ||
            item.barang_merk?.toLowerCase().includes(q) ||
            item.status?.toLowerCase().includes(q)
        );
    });

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
            <div className="py-6 max-w-7xl mx-auto sm:px-6 lg:px-8 rounded-lg">
                    {showAlert && flash.success && (
                        <div className="text-center py-4 lg:px-4 mb-4">
                            <div
                                className="py-2 lg:px-4 bg-blue-800 items-center text-green-100 leading-none lg:rounded-full flex lg:inline-flex justify-between"
                                role="alert"
                            >
                                <span className="flex rounded-full bg-green-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                                    Success
                                </span>
                                <span className="font-semibold mr-2 text-left flex-auto">{flash.success}</span>
                                <button
                                    className="ml-4 text-green-200 hover:text-green-100 focus:outline-none"
                                    onClick={() => setShowAlert(false)}
                                    aria-label="Close alert"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    )}
                <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
                    <div className="mb-3 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                        <Link
                            href={route("kehilangan.create")}
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        >
                            Lapor Kehilangan
                        </Link>
                        <input
                            type="text"
                            className="w-full md:w-64 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white"
                            placeholder="Cari deskripsi, status, dll..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>


                    {filtered.length === 0 ? (
                        <p className="text-gray-600 dark:text-gray-300">
                            Belum ada laporan kehilangan.
                        </p>
                    ) : (
                        <div className="overflow-x-auto relative">
                            <table className="min-w-full table-auto mt-5">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-3 text-center bg-blue-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-tl-xl">
                                            No
                                        </th>
                                        <th className="px-4 py-3 text-center bg-blue-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-tl-xl">
                                            Deskripsi
                                        </th>
                                        <th className="px-4 py-3 text-center bg-blue-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold">
                                            Warna
                                        </th>
                                        <th className="px-4 py-3 text-center bg-blue-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold">
                                            Kategori
                                        </th>
                                        <th className="px-4 py-3 text-center bg-blue-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold">
                                            Merk
                                        </th>
                                        <th className="px-4 py-3 text-center bg-blue-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 text-center bg-blue-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold">
                                            Tanggal Hilang
                                        </th>
                                        <th className="px-4 py-3 text-center bg-blue-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-tr-xl">
                                            Aksi
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {filtered.map((item, idx) => (
                                            <tr
                                            key={item.id}
                                            className="bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow hover:bg-gray-50 dark:hover:bg-gray-700 text-center rounded-xl"
                                            style={{
                                                borderRadius: "0.75rem",
                                                boxShadow: "0 1px 4px 0 rgb(0 0 0 / 0.04)",
                                                marginBottom: "8px",
                                                overflow: "hidden",
                                            }}
                                            >
                                            <td className="px-4 py-3">{idx + 1}</td>
                                            <td className="px-4 py-3">{item.deskripsi}</td>
                                            <td className="px-4 py-3">{item.barang_warna}</td>
                                            <td className="px-4 py-3">{item.barang_kategori}</td>
                                            <td className="px-4 py-3">{item.barang_merk}</td>
                                            <td className="px-4 py-3">{item.status}</td>
                                            <td className="px-4 py-3">
                                                {(() => {
                                                    const date = new Date(item.tanggal_hilang);
                                                    const pad = (n) => String(n).padStart(2, "0");
                                                    return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()}`;
                                                })()}
                                            </td>
                                            <td className="px-4 py-3 text-center relative">
                                                <ActionDropdown itemId={item.id} />
                                            </td>
                                            </tr>
                                        ))}
                                        </tbody>

                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}