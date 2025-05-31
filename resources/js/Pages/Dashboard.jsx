import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Dashboard({ user }) {
    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState('');
    const [news, setNews] = useState([]);  // state untuk data news dari API
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/data')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setNews(data.data);
                setLoading(false);
            })
            .catch(() => {
                setNews([]);
                setLoading(false);
            });
    }, []);

    const filteredNews = news.filter(item =>
        item.barang_merk.toLowerCase().includes(search.toLowerCase()) ||
        item.barang_cirikhusus.toLowerCase().includes(search.toLowerCase()) ||
        item.barang_kategori.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <AuthenticatedLayout>
            <Head title="Beranda Temu Kembali" />
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
                    {loading ? (
                        <div className="text-center text-blue-600">Loading data...</div>
                    ) : (
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
                                    {item.image && (
                                        <div className="relative">
                                            <img
                                                src={item.image || ''}
                                                alt={item.title}
                                                className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform"
                                            />
                                            <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow font-semibold">
                                                {item.barang_kategori}
                                            </span>
                                        </div>
                                    )}
                                    <div className="p-4 sm:p-5 flex flex-col flex-1">
                                        <h3 className="text-lg sm:text-xl font-bold text-blue-700 mb-1">{item.barang_merk}</h3>
                                        <p className="text-gray-700 mb-3 sm:mb-4 flex-1 text-sm sm:text-base">{item.deskripsi}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-blue-400">{item.tanggal_temuan}</span>
                                            <Link
                                                href={item.type == 'temuan' ? `/temuan/detail/${item.id}` : `/kehilangan/detail/${item.id}`}
                                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold hover:bg-blue-200 transition"
                                            >
                                                Detail
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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
        </AuthenticatedLayout>
    );
}