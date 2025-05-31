import React, { useState, useEffect, useRef } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

function ActionDropdown({ itemId }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
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
                >
                    <div className="py-1" role="none">
                        <Link
                            href={`/temuan/${itemId}`}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-700"
                            role="menuitem"
                            tabIndex="-1"
                            onClick={() => setOpen(false)}
                        >
                            Detail Temuan
                        </Link>
                        <Link
                            href={`/temuan/${itemId}/edit`}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            onClick={() => setOpen(false)}
                        >
                            Perbarui
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function TemuanList({ auth }) {
    const { temuan, flash = {} } = usePage().props;
    const [search, setSearch] = useState("");
    const [showAlert, setShowAlert] = useState(!!flash.success);

    useEffect(() => {
            if (flash.success) setShowAlert(true);
        }, [flash.success]);

    const filtered = temuan.filter((item) => {
        const q = search.toLowerCase();
        return (
            item.deskripsi?.toLowerCase().includes(q) ||
            item.provinsi_temuan?.toLowerCase().includes(q) ||
            item.kota_temuan?.toLowerCase().includes(q) ||
            (item.tanggal_temuan && new Date(item.tanggal_temuan).toLocaleDateString().includes(q)) ||
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
                    Daftar Temuan
                </h2>
            }
        >
            <Head title="List Temuan" />
            <div className="py-6 max-w-7xl mx-auto sm:px-6 lg:px-8">
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
                            href={route("temuan.create")}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                        >
                            Laporkan Temuan
                        </Link>
                        <form className="w-full md:w-64" onSubmit={e => e.preventDefault()}>
                            <label htmlFor="temuan-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                                Search
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input
                                    type="search"
                                    id="temuan-search"
                                    className="block w-full px-3 py-2 ps-10 text-sm border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Cari deskripsi, status, dll..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    autoComplete="off"
                                />
                            </div>
                        </form>
                    </div>


                    {filtered.length === 0 ? (
                        <p className="text-gray-600 dark:text-gray-300">
                            Belum ada laporan temuan.
                        </p>
                    ) : (
                        <div className="overflow-x-auto relative">
                            <table className="min-w-full table-auto mt-5">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-3 text-center bg-blue-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-tl-xl">
                                            No
                                        </th>
                                        <th className="px-4 py-3 text-center bg-blue-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold">
                                            Deskripsi
                                        </th>
                                        <th className="px-4 py-3 text-center bg-blue-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold">
                                            Provinsi
                                        </th>
                                        <th className="px-4 py-3 text-center bg-blue-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold">
                                            Kota
                                        </th>
                                        <th className="px-4 py-3 text-center bg-blue-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold">
                                            Kategori
                                        </th>
                                        <th className="px-4 py-3 text-center bg-blue-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold">
                                            Merk
                                        </th>
                                        <th className="px-4 py-3 text-center bg-blue-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold">
                                            Warna
                                        </th>
                                        <th className="px-4 py-3 text-center bg-blue-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 text-center bg-blue-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold">
                                            Tanggal Temuan
                                        </th>
                                        <th className="px-4 py-3 text-center bg-blue-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-tr-xl">
                                            Aksi
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {filtered.map((item, index) => {
                                        const tanggal = new Date(item.tanggal_temuan);
                                        const formattedTanggal = [
                                        String(tanggal.getDate()).padStart(2, "0"),
                                        String(tanggal.getMonth() + 1).padStart(2, "0"),
                                        tanggal.getFullYear(),
                                        ].join("-");

                                        return (
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
                                            <td className="px-4 py-3">{index + 1}</td>
                                            <td className="px-4 py-3 first:rounded-bl-xl last:rounded-br-xl">{item.deskripsi}</td>
                                            <td className="px-4 py-3">{item.provinsi_temuan}</td>
                                            <td className="px-4 py-3">{item.kota_temuan}</td>
                                            <td className="px-4 py-3">{item.barang_kategori || "-"}</td>
                                            <td className="px-4 py-3">{item.barang_merk || "-"}</td>
                                            <td className="px-4 py-3">{item.barang_warna || "-"}</td>
                                            <td className="px-4 py-3">{item.status}</td>
                                            <td className="px-4 py-3">{formattedTanggal}</td>
                                            <td className="px-4 py-3 text-center relative">
                                            <ActionDropdown itemId={item.id} />
                                            </td>
                                        </tr>
                                        );
                                    })}
                                    </tbody>

                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}