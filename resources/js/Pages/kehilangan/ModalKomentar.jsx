import { useState, useRef } from "react";

export default function ModalKomentar() {
    const [isOpen, setIsOpen] = useState(false);
    const [translateY, setTranslateY] = useState(0);
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

        if (deltaY > 0) {
            setTranslateY(deltaY); // geser ke bawah
        }
    };

    const handleTouchEnd = () => {
        if (translateY > 100) {
            setIsOpen(false); // tutup jika drag jauh
        } else {
            setTranslateY(0); // reset ke posisi awal
        }
        touchStartY.current = null;
    };

    return (
        <>
            <button
                onClick={toggleModal}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
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
                        {/* Drag Indicator dan Header */}
                        <div className="flex flex-col items-center mb-4">
                            <div className="w-12 h-1.5 bg-gray-400 rounded-full mb-2"></div>
                            <div className="flex justify-between items-center w-full">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Komentar</h2>
                                <button
                                    onClick={toggleModal}
                                    className="text-gray-600 dark:text-gray-300 text-xl font-bold"
                                >
                                    ×
                                </button>
                            </div>
                        </div>

                        {/* List Komentar */}
                        <div className="space-y-3 overflow-y-auto flex-1 pr-2">
                            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                                <p className="text-sm text-gray-800 dark:text-white">
                                    Saya melihat barang seperti ini di dekat stasiun kemarin.
                                </p>
                                <span className="text-xs text-gray-500">29 Mei 2025</span>
                            </div>
                        </div>

                        {/* Input Komentar */}
                        <div className="mt-4">
                            <textarea
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
                                rows="3"
                                placeholder="Tulis komentar..."
                            ></textarea>
                            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full">
                                Kirim Komentar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
