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
        let intervalId;

        const fetchKomentar = async () => {
            try {
                const response = await fetch(`/komentar-hilang-new/${kehilangan.id}`);
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
                                    <p><span className="font-semibold">Kategori:</span> {kehilangan.barang_kategori}</p>
                                    <p><span className="font-semibold">Merk:</span> {kehilangan.barang_merk}</p>
                                    <p><span className="font-semibold">Warna:</span> {kehilangan.barang_warna}</p>
                                    <p><span className="font-semibold">Ciri Khusus:</span> {kehilangan.barang_cirikhusus}</p>
                                    <p><span className="font-semibold">Deskripsi:</span> {kehilangan.deskripsi}</p>
                                </div>
                                <div>
                                    <p><span className="font-semibold">Status:</span> {kehilangan.status}</p>
                                    <p>
                                        <span className="font-semibold">Tanggal Hilang:</span>{" "}
                                        {new Date(kehilangan.tanggal_hilang).toLocaleString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: false,
                                            timeZone: "Asia/Jakarta"
                                        })} WIB
                                    </p>
                                    <p className="capitalize"><span className="font-semibold">Provinsi:</span> {kehilangan.provinsi.name.toLowerCase()}</p>
                                    <p className="capitalize"><span className="font-semibold">Kota:</span> {kehilangan.kota.name.toLowerCase()}</p>
                                    <p><span className="font-semibold">Dilihat:</span> {kehilangan.jumlah_dilihat} kali</p>
                                    <p><span className="font-semibold">Hubungi WA:</span> <a href={`https://wa.me/` + kehilangan.user_whatsapp} target="_blank" className="text-blue-500 hover:underline" rel="noreferrer">{kehilangan.user_whatsapp}</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                

                <div class="max-w-sm mt-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img class="rounded-t-lg" src={'/berita/motorbeat.webp'} alt="" />
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Kendaraan Roda Dua</h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Deksripsi Kendaraan Motor Beat, Kehilangan Dengan Ciri Khas, Warna, Merk, Status, Tanggal Hilang.</p>
                        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read more
                            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="bg-white mx-auto sm:px-6 lg:px-8 p-6 mt-4 shadow-sm sm:rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Komentar :</h3>

                    {loading && (
                        <div key={komentarList.id} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow flex gap-3 mb-4">
                            <p className="text-gray-500 mb-4">Sedang Memuat Komentar...</p>
                        </div>
                    )}
                    {error && (
                        <div key={komentarList.id} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow flex gap-3 mb-4">
                            <p className="text-gray-500 mb-4">Tidak ada komentar...</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        {!loading && !komentarList && (
                            <div key={komentarList.id} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow flex gap-3 mb-4">
                                <p className="text-gray-500 mb-4">Tidak ada komentar...</p>
                            </div>
                        )}

                        {!error && !loading && komentarList && (
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
