import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const news = [
    {
        id: 1,
        title: "Dompet Ditemukan di Area Parkir",
        description: "Seseorang menemukan dompet berwarna coklat di area parkir kampus. Silakan hubungi admin jika merasa kehilangan.",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
        date: "31 Mei 2025",
        category: "Dompet",
    },
    {
        id: 2,
        title: "Kunci Motor Telah Ditemukan",
        description: "Kunci motor dengan gantungan biru ditemukan di dekat kantin. Segera laporkan jika ini milik Anda.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        date: "30 Mei 2025",
        category: "Kunci",
    },
    {
        id: 3,
        title: "Jaket Biru Hilang",
        description: "Jaket biru dengan logo kampus hilang di ruang kelas B2. Jika menemukan, mohon hubungi pemilik.",
        image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
        date: "29 Mei 2025",
        category: "Jaket",
    },
    {
        id: 4,
        title: "Handphone Ditemukan di Perpustakaan",
        description: "Sebuah handphone ditemukan di meja pojok perpustakaan. Silakan konfirmasi ke petugas.",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
        date: "28 Mei 2025",
        category: "Handphone",
    },
];

export default function Dashboard({ user }) {
    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState('');

    const filteredNews = news.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AuthenticatedLayout>
            <Head title="Beranda Temu Kembali" />
            {/* <div className="sticky top-0 z-30 w-full backdrop-blur bg-blue-50/80 py-4 mb-4 rounded-b-2xl flex items-center justify-between px-4">
                <h2 className="text-xl font-semibold leading-tight text-blue-700 dark:text-blue-300 text-center flex-1">
                    Beranda
                </h2>
                <button
                    className="ml-2 text-blue-700 hover:text-blue-900"
                    onClick={() => setShowSearch(s => !s)}
                    aria-label="Cari"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                    </svg>
                </button>
            </div> */}
            {showSearch && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-2xl shadow-xl w-11/12 max-w-md p-4 mx-auto">
                        <div className="flex items-center mb-2">
                            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                            </svg>
                            <input
                                type="text"
                                className="flex-1 px-3 py-2 border border-blue-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Cari barang hilang atau ditemukan..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                autoFocus
                            />
                            <button
                                className="ml-2 text-gray-400 hover:text-blue-600"
                                onClick={() => setShowSearch(false)}
                                aria-label="Tutup"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="py-8 bg-blue-50 min-h-[calc(100vh-80px)] pb-24">
                <div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8">
                    <div className="mb-8 mt-6 text-center">
                        <h1 className="text-2xl sm:text-4xl font-extrabold text-blue-700 mb-2 drop-shadow">
                            Ingin Melapor atau Menemukan Sesuatu Hari Ini?
                        </h1>
                        <p className="text-base sm:text-lg text-blue-600">
                           Temu Kembali Barang Kesayanganmu.
                        </p>
                    </div>
                    <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredNews.length === 0 && (
                            <div className="col-span-full text-center text-blue-400 py-10">
                                Tidak ada data Temu Kembali ditemukan.
                            </div>
                        )}
                        {filteredNews.map(item => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-blue-100 flex flex-col overflow-hidden transition-all group mt-6"
                            >
                                <div className="relative">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform"
                                    />
                                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow font-semibold">
                                        {item.category}
                                    </span>
                                </div>
                                <div className="p-4 sm:p-5 flex flex-col flex-1">
                                    <h3 className="text-lg sm:text-xl font-bold text-blue-700 mb-1">{item.title}</h3>
                                    <p className="text-gray-700 mb-3 sm:mb-4 flex-1 text-sm sm:text-base">{item.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-blue-400">{item.date}</span>
                                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold hover:bg-blue-200 transition">Detail</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <footer className="py-6 text-center text-blue-700/80 dark:text-gray-400 text-sm flex flex-col gap-2 items-center">
                <span>
                    &copy; {new Date().getFullYear()} Temu Kembali &mdash; Platform Sosial Barang Hilang & Temuan
                </span>
                <a
                    href="https://polteksci.ac.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-blue-600 hover:underline font-semibold"
                >
                    Politeknik Siber Cerdika Internasional
                </a>
            </footer>
            {/* <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-blue-100 rounded-full bottom-4 left-1/2 shadow-lg">
                <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
                    <button type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-blue-50 group focus:outline-none">
                        <svg className="w-5 h-5 mb-1 text-blue-600 group-hover:text-blue-800" fill="currentColor" viewBox="0 0 20 20">
                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                        </svg>
                        <span className="sr-only">Beranda</span>
                    </button>
                    <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-blue-50 group focus:outline-none"
                        onClick={() => setShowSearch(true)}>
                        <svg className="w-5 h-5 mb-1 text-blue-600 group-hover:text-blue-800" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                        </svg>
                        <span className="sr-only">Cari</span>
                    </button>
                    <button type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-blue-50 group focus:outline-none">
                        <svg className="w-5 h-5 mb-1 text-blue-600 group-hover:text-blue-800" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                        </svg>
                        <span className="sr-only">Profil</span>
                    </button>
                </div>
            </div> */}
        </AuthenticatedLayout>
    );
}