import React, { useState, useEffect } from "react";
import { Head, usePage, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import ModalKomentar from "./ModalKomentar";
// import PredictCard from "./PredictCard";

export default function KehilanganList({ auth }) {
    const { temuan } = usePage().props;

    // State untuk simpan data komentar yang diambil dari API
    const [komentarList, setKomentarList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let intervalId;

        const fetchKomentar = async () => {
            try {
                const response = await fetch(`/komentar-hilang-new/${temuan.id}`);
                if (!response.ok) throw new Error("Failed to fetch komentar");
                const data = await response.json();
                setKomentarList(data); // asumsi data adalah array, atau bungkus dalam array jika 1 objek
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        // Panggil pertama kali saat komponen dimuat
        fetchKomentar();

        // Set interval untuk update setiap 10 detik
        intervalId = setInterval(fetchKomentar, 10000);

        // Bersihkan interval saat komponen unmount
        return () => clearInterval(intervalId);
    }, [temuan.id]);

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
            <div className="py-6 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <div className="mb-3 mt-21">
                        <div className="mb-3">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Detail Kehilangan</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                                <div>
                                    <p><span className="font-semibold">Kategori:</span> {temuan.barang_kategori}</p>
                                    <p><span className="font-semibold">Merk:</span> {temuan.barang_merk}</p>
                                    <p><span className="font-semibold">Warna:</span> {temuan.barang_warna}</p>
                                    <p><span className="font-semibold">Ciri Khusus:</span> {temuan.barang_cirikhusus}</p>
                                    <p><span className="font-semibold">Deskripsi:</span> {temuan.deskripsi}</p>
                                </div>
                                <div>
                                    <p><span className="font-semibold">Status:</span> {temuan.status}</p>
                                    <p>
                                        <span className="font-semibold">Tanggal Hilang:</span>{" "}
                                        {new Date(temuan.tanggal_hilang).toLocaleString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: false,
                                            timeZone: "Asia/Jakarta"
                                        })} WIB
                                    </p>
                                    <p className="capitalize"><span className="font-semibold">Provinsi:</span> {temuan.provinsi.name.toLowerCase()}</p>
                                    <p className="capitalize"><span className="font-semibold">Kota:</span> {temuan.kota.name.toLowerCase()}</p>
                                    <p><span className="font-semibold">Dilihat:</span> {temuan.jumlah_dilihat} kali</p>
                                    <p><span className="font-semibold">Hubungi WA:</span> <a href={`https://wa.me/` + temuan.user_whatsapp} target="_blank" className="text-blue-500 hover:underline" rel="noreferrer">{temuan.user_whatsapp}</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white mx-auto sm:px-6 lg:px-8 p-6 mt-4 shadow-sm sm:rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Komentar :</h3>

                    {loading && !komentarList.user && (
                        <div key={komentarList.id} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow flex gap-3 mb-4">
                            <p className="text-gray-500 mb-4">Sedang Memuat Komentarr...</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        {error && !loading && !komentarList.user && (
                            <div key={komentarList.id} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow flex gap-3 mb-4">
                                <p className="text-gray-500 mb-4">Tidak ada komentar...</p>
                            </div>
                        )}

                        {!loading && komentarList && komentarList.user && (
                            <div key={komentarList.id} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow flex gap-3">
                                <Link href={`/user/${komentarList.user?.whatsapp}`}>
                                    <img
                                        src={komentarList.user?.photo || "/default/profile.png"}
                                        alt={komentarList.user?.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                </Link>
                                <div>
                                    <Link href={`/user/${komentarList.user?.whatsapp}`}>
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
                                    </Link>

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

                        {/* <ModalKomentar id={temuan.id} /> */}
                    </div>
                </div>
                {/* <PredictCard id={temuan.id} /> */}
            </div>

        </AuthenticatedLayout>
    );
}
