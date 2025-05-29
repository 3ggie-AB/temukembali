import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function ModalKomentar({ id }) {
    const [isOpen, setIsOpen] = useState(false);
    const [translateY, setTranslateY] = useState(0);
    const [komentar, setKomentar] = useState([]);
    const [isiKomentar, setIsiKomentar] = useState("");
    const touchStartY = useRef(null);

    const toggleModal = () => {
        setIsOpen(!isOpen);
        setTranslateY(0);
    };

    const handleTouchStart = (e) => {
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
        if (touchStartY.current === null) return;
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - touchStartY.current;
        if (deltaY > 0) setTranslateY(deltaY);
    };

    const handleTouchEnd = () => {
        if (translateY > 100) setIsOpen(false);
        else setTranslateY(0);
        touchStartY.current = null;
    };

    const fetchKomentar = async () => {
        try {
            const res = await axios.get(`/komentar-hilang/${id}`);
            setKomentar(res.data);
        } catch (err) {
            console.error("Gagal fetch komentar:", err);
        }
    };

    const handleKirimKomentar = async () => {
        if (!isiKomentar.trim()) return;
        try {
            await axios.post(`/komentar-hilang/${id}`, {
                komentar: isiKomentar
            });
            setIsiKomentar("");
            fetchKomentar(); // refresh komentar setelah kirim
        } catch (err) {
            console.error("Gagal kirim komentar:", err);
        }
    };

    useEffect(() => {
        if (!isOpen) return;

        fetchKomentar();
        const interval = setInterval(fetchKomentar, 5000); // polling setiap 5 detik

        return () => clearInterval(interval);
    }, [isOpen]);

    return (
        <>
            <button onClick={toggleModal} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Lihat Semua Komentar
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50">
                    <div
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        style={{
                            transform: `translateY(${translateY}px)`,
                            transition: translateY === 0 ? "transform 0.3s ease" : "none"
                        }}
                        className="bg-white dark:bg-gray-800 w-full h-[85%] rounded-t-2xl shadow-lg p-4 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex flex-col items-center mb-4">
                            <div className="w-12 h-1.5 bg-gray-400 rounded-full mb-2"></div>
                            <div className="flex justify-between items-center w-full">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Komentar</h2>
                                <button onClick={toggleModal} className="text-gray-600 dark:text-gray-300 text-xl font-bold">×</button>
                            </div>
                        </div>

                        {/* List Komentar */}
                        <div className="space-y-3 overflow-y-auto flex-1 pr-2">
                            {komentar.length === 0 ? (
                                <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                                    Belum ada komentar.
                                </p>
                            ) : komentar.map((item, i) => (
                                <div key={i} className="bg-gray-100 dark:bg-gray-700 p-3 rounded flex gap-3">
                                    <img
                                        src={item.user?.photo || "/default/profile.png"}
                                        alt={item.user?.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-xs font-medium text-gray-400 dark:text-white">
                                            {'@' + (item.user?.name || "Pengguna")} - {
                                                item.created_at ? (() => {
                                                    const created = new Date(item.created_at);
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

                                        <p className="text-sm text-gray-800 dark:text-white">{item.komentar}</p>

                                        <span className="text-xs text-gray-500">
                                            {item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            }) : 'Tanggal tidak tersedia'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Komentar */}
                        <div className="mt-4">
                            <textarea
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
                                rows="3"
                                placeholder="Tulis komentar..."
                                value={isiKomentar}
                                onChange={(e) => setIsiKomentar(e.target.value)}
                            ></textarea>
                            <button
                                onClick={handleKirimKomentar}
                                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
                            >
                                Kirim Komentar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
