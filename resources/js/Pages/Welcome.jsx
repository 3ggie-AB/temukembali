import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Temu Kembali - Temukan & Kembalikan Barang Hilang" />
            <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
                {/* Hero Section */}
                <header className="relative flex flex-col items-center justify-center py-20 px-4 text-center">
                    <img
                        src="/icon/icon.svg"
                        alt="Logo Temu Kembali"
                        className="mx-auto mb-6 w-28 h-28 rounded-full shadow-lg border-4 border-white dark:border-gray-700 bg-white object-cover"
                    />
                    <h1 className="text-4xl md:text-6xl font-extrabold text-blue-700 dark:text-white drop-shadow-lg mb-4 tracking-tight">
                        Temu Kembali
                    </h1>
                    <p className="max-w-xl mx-auto text-base md:text-xl text-blue-800/90 dark:text-gray-200 mb-8 font-medium leading-relaxed">
                        Platform Sosial <span className="font-bold text-blue-600 dark:text-blue-400">Laporan</span> & <span className="font-bold text-blue-400 dark:text-blue-300">Temuan</span> Barang hilang yang mudah, aman, dan cepat.  
                        Bergabung dan Membantu Sesama
                    </p>

                    <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto mb-2 sm:flex sm:flex-row sm:gap-4 sm:justify-center">
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="col-span-2 sm:col-auto px-8 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition"
                            >
                                Kunjungi Beranda
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('register')}
                                    className="px-6 py-3 rounded-full bg-blue-500 text-white font-semibold shadow-lg hover:bg-blue-600 transition text-sm"
                                >
                                    Daftar Sekarang
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="px-6 py-3 rounded-full bg-white text-blue-700 font-semibold border border-blue-400 shadow-lg hover:bg-blue-50 transition dark:bg-gray-900 dark:text-white dark:border-gray-400 text-sm"
                                >
                                    Masuk Sekarang
                                </Link>
                            </>
                        )}
                    </div>
                </header>

                {/* Features Section */}
                <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 transition">
                        <svg className="w-14 h-14 mb-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="12" cy="12" r="10" />
                        </svg>
                        <h3 className="font-bold text-xl mb-2 text-blue-700 dark:text-blue-300">Pelaporan Praktis</h3>
                        <p className="text-blue-700/80 dark:text-gray-300">Laporkan barang hilang atau temuan hanya dalam beberapa langkah, tanpa proses yang rumit.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 transition">
                        <svg className="w-14 h-14 mb-4 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <h3 className="font-bold text-xl mb-2 text-blue-700 dark:text-blue-300">Pencarian Efisien</h3>
                        <p className="text-blue-700/80 dark:text-gray-300">Temukan barang berdasarkan kategori, lokasi, dan deskripsi secara cepat dan akurat.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 transition">
                        <svg className="w-14 h-14 mb-4 text-blue-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <h3 className="font-bold text-xl mb-2 text-blue-700 dark:text-blue-300">Aman & Terverifikasi</h3>
                        <p className="text-blue-700/80 dark:text-gray-300">Data pengguna dan laporan dijaga kerahasiaannya. Komunitas saling membantu dengan sistem yang terpercaya.</p>
                    </div>
                </section>

                <section className="max-w-6xl mx-auto px-4 py-8">
                    <div className="bg-white/80 dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
                        <h4 className="text-lg md:text-xl font-bold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
                            <svg className="w-6 h-6 text-green-500 inline" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.472-.148-.67.15-.198.297-.767.967-.94 1.166-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.363.71.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                            </svg>
                            Smart Fitur Temu Kembali 
                        </h4>
                        <ul className="text-blue-800 dark:text-gray-200 text-sm md:text-base space-y-2 pl-2">
                            <li>
                                <span className="font-semibold text-green-600">•</span> Verifikasi Registrasi <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded ml-1">Aktif</span>
                            </li>
                            <li>
                                <span className="font-semibold text-green-600">•</span> Verifikasi Lupa Password <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded ml-1">Aktif</span>
                            </li>
                            <li>
                                <span className="font-semibold text-green-600">•</span> Notifikasi Laporan Kehilangan berhasil <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded ml-1">Aktif</span>
                            </li>
                            <li>
                                <span className="font-semibold text-green-600">•</span> Notifikasi Laporan Temuan berhasil <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded ml-1">Aktif</span>
                            </li>
                            <li>
                                <span className="font-semibold text-green-600">•</span> Komentar Pada temuan kamu <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded ml-1">Aktif</span>
                            </li>
                            <li>
                                <span className="font-semibold text-green-600">•</span> Komentar Pada kehilangan kamu <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded ml-1">Aktif</span>
                            </li>
                            <li>
                                <span className="font-semibold text-green-600">•</span> Temuan Pengguna lain mirip 50% dengan kehilangan kamu <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded ml-1">Aktif</span>
                            </li>
                        </ul>
                        <div className="mt-3 text-xs text-blue-500 dark:text-blue-200">
                            Semua notifikasi penting langsung ke WhatsApp Kamu. Praktis, Real-time, dan tanpa aplikasi tambahan!
                        </div>
                    </div>
                </section>

                
                {/* Call To Action */}
                <section className="py-14 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 text-white text-center">
                    <h2 className="text-2xl md:text-4xl font-bold mb-4 drop-shadow-lg leading-snug">
                        Bersama Temu Kembali,<br className="block md:hidden" /> Setiap Barang Bisa Kembali <br className="block md:hidden" /> ke Pemiliknya.
                    </h2>
                    <p className="mb-8 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                        Lapor Cari barang hilang Kamu sekarang.<br className="block md:hidden" /> Setiap kontribusi Kamu sangat berarti bagi banyak orang.
                    </p>
                    <Link
                        href={auth?.user ? route('temuan.create') : route('register')}
                        className="inline-block px-8 py-4 rounded-full bg-white text-blue-700 font-bold shadow-lg hover:bg-blue-100 transition dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 text-base md:text-lg"
                    >
                        Lapor & Temukan Sekarang
                    </Link>
                </section>

                {/* Footer */}
                <footer className="py-8 text-center text-blue-700/80 dark:text-gray-400 text-sm flex flex-col gap-2 items-center">
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
            </div>
        </>
    );
}   