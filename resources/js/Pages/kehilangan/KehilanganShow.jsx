import React, { useState, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ModalKomentar from "./ModalKomentar";

export default function KehilanganList({ auth }) {
    const { kehilangan } = usePage().props;

    // State untuk simpan data komentar yang diambil dari API
    const [komentarList, setKomentarList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fungsi fetch komentar
        const fetchKomentar = async () => {
            try {
                const response = await fetch(`/komentar-hilang-new/${kehilangan.id}`);
                if (!response.ok) throw new Error("Failed to fetch komentar");
                const data = await response.json();
                // console.log("Komentar data:", data); // Debugging log
                setKomentarList(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchKomentar();
    }, [kehilangan.id]);

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
                                    <p><span className="font-semibold">Hubungi WA:</span> <a href="https://wa.me/6285875477953" target="_blank" className="text-blue-500 hover:underline" rel="noreferrer">6285875477953</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white mx-auto sm:px-6 lg:px-8 p-6 mt-4 shadow-sm sm:rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Komentar :</h3>

                    {loading && <p>Loading komentar...</p>}
                    {error && <p className="text-red-500">Error: {error}</p>}

                    <div className="space-y-4">
                        {!loading && !komentarList && (
                            <p className="text-gray-500">Tidak ada komentar.</p>
                        )}

                        {komentarList && (
                            <div key={komentarList.id} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow flex gap-3">
                                    <img
                                        src={komentarList.user?.photo || "/default/profile.png"}
                                        alt={komentarList.user?.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-xs font-medium text-gray-400 dark:text-white">
                                            {'@' + (komentarList.user?.name || "Pengguna")} - {
                                                komentarList.created_at ? (() => {
                                                    const created = new Date(komentarList.created_at);
                                                    const now = new Date();
                                                    const diffMs = now - created;
                                                    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                                                    const diffMinutes = Math.floor(diffMs / (1000 * 60)) % 60;

                                                    if (diffHours > 0) {
                                                        return `${diffHours} jam yang lalu`;
                                                    } else if (diffMinutes > 0) {
                                                        return `${diffMinutes} menit yang lalu`;
                                                    } else {
                                                        return 'Baru saja';
                                                    }
                                                })() : 'Waktu tidak tersedia'}
                                        </p>

                                        <p className="text-sm text-gray-800 dark:text-white">{komentarList.komentar}</p>

                                        <span className="text-xs text-gray-500">
                                            {komentarList.created_at ? new Date(komentarList.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            }) : 'Tanggal tidak tersedia'}
                                        </span>
                                    </div>
                                </div>
                        )}

                        <ModalKomentar id={kehilangan.id} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
