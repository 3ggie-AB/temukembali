import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

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
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-blue-700 dark:text-blue-300">
                    Beranda
                </h2>
            }
        >
            <Head title="Beranda Temu Kembali" />
            <div className="py-8 bg-blue-50 min-h-[calc(100vh-80px)]">
                <div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8">
                    <div className="mb-8 text-center">
                        <h1 className="text-2xl sm:text-4xl font-extrabold text-blue-700 mb-2 drop-shadow">Portal Temu Kembali</h1>
                        <p className="text-base sm:text-lg text-blue-600">Temukan atau Laporkan Barang Hilang di Kampus</p>
                        <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                            <button className="px-4 py-2 sm:px-5 sm:py-2 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition text-sm sm:text-base">Laporkan Barang Hilang</button>
                            <button className="px-4 py-2 sm:px-5 sm:py-2 bg-white text-blue-600 border border-blue-600 rounded-full font-semibold shadow hover:bg-blue-50 transition text-sm sm:text-base">Lihat Semua Laporan</button>
                        </div>
                    </div>
                    <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {news.map(item => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-blue-100 flex flex-col overflow-hidden transition-all group"
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
                    <div className="mt-10 sm:mt-12 text-center text-blue-400 text-xs sm:text-sm">
                        &copy; 2025 Temu Kembali. Politeknik Siber Cerdika Internasional.
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}