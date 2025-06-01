import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Dashboard({ user }) {
    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState('');
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/data')
            .then(res => res.json())
            .then(data => {
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

    const hilang = filteredNews.filter(item => item.type === 'hilang');
    const temuan = filteredNews.filter(item => item.type === 'temuan');

    const Card = ({ item, color, detailUrl, dateField }) => (
        <div
            className="min-w-[270px] max-w-xs w-full bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-blue-100 flex flex-col overflow-hidden transition-all group"
        >
            {item.image && (
                <div className="relative">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-40 object-cover"
                    />
                    <span className={`absolute top-3 left-3 bg-${color}-600 text-white text-xs px-3 py-1 rounded-full shadow font-semibold`}>
                        {item.barang_kategori}
                    </span>
                </div>
            )}
            <div className="p-4 flex flex-col flex-1">
                <img
                    src={`/${item.photo}`}
                    alt={item.barang_merk}
                    className="w-full h-40 object-cover"
                    />
                <h3 className="text-lg font-bold text-blue-700 mb-1">{item.barang_merk}</h3>
                <p className="text-gray-700 mb-3 flex-1 text-sm">{item.deskripsi}</p>
                <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-400">{item[dateField]}</span>
                    <Link
                        href={detailUrl}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold hover:bg-blue-200 transition"
                    >
                        Detail
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <AuthenticatedLayout>
            <Head title="Beranda Temu Kembali" />
            {showSearch && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-2xl shadow-xl w-11/12 max-w-md p-4 mx-auto">
                        <div className="flex items-center mb-2">
                        </div>
                    </div>
                </div>
            )}
            <div className="py-8 bg-blue-50 min-h-[calc(100vh-80px)] pb-18">
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
                        <div className="flex flex-col gap-10">
                            <section>
                                <h2 className="text-xl font-bold mb-4">Laporan Kehilangan</h2>
                                {hilang.length === 0 ? (
                                    <div className="text-center text-blue-400 py-6">
                                        Tidak ada barang hilang ditemukan.
                                    </div>
                                ) : (
                                    <div className="
                                        flex gap-6 overflow-x-auto pb-2
                                        sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-x-visible
                                    ">
                                        {hilang.map(item => (
                                            <Card
                                                key={`hilang-${item.id}`}
                                                item={item}
                                                color="red"
                                                detailUrl={`/kehilangan/detail/${item.id}`}
                                                dateField="tanggal_temuan"
                                            />
                                        ))}
                                    </div>
                                    
                                )}
                            </section>
                            <section>
                                <h2 className="text-xl font-bold mb-4">Laporan Temuan</h2>
                                {temuan.length === 0 ? (
                                    <div className="text-center text-blue-400 py-6">
                                        Tidak ada barang ditemukan.
                                    </div>
                                ) : (
                                    <div className="
                                        flex gap-6 overflow-x-auto pb-2
                                        sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-x-visible
                                    ">
                                        {temuan.map(item => (
                                            <Card
                                                key={`temuan-${item.id}`}
                                                item={item}
                                                color="green"
                                                detailUrl={`/temuan/detail/${item.id}`}
                                                dateField="tanggal_temuan"
                                            />
                                        ))}
                                    </div>
                                )}
                            </section>
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