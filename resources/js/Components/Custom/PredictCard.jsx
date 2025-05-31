'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

export default function PredictCard({ id, onClick, name }) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return;

        axios.get(`/predict/manual-${name}-${id}`)
            .then((res) => {
                setData(res.data.data)
            })
            .catch((err) => {
                console.error('Gagal fetch data:', err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [id])

    if (loading) {
        return <div className="text-center py-4">Loading...</div>
    }

    if (!data) {
        return <div className="text-center py-4 text-red-500">Data tidak ditemukan.</div>
    }

    return (
        <>
            {data.length === 0 ? (
                <div className="text-center py-4 text-red-500">Tidak Ada Laporan Temuan yang Mirip dengan Data Ini.</div>
            ) : (
                <>
                    <h3 className="mt-10 text-xl font-semibold mb-4">Hasil Prediksi Data di Atas dengan Temuan :</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {data.map((item, index) => (
                            <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                                {item.gambar && item.gambar !== 'null' && item.gambar !== 'undefined' ? (
                                    <img className="rounded-t-lg" src={`/berita/${item.gambar || ''}`} alt={item.data_temuan.barang_kategori || 'Gambar'} />
                                ) : (
                                    <></>
                                )}
                                <div className="p-5">
                                    <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {item.data_temuan.barang_kategori || 'Kategori Tidak Tersedia'}
                                    </h5>
                                    <p className=" font-normal text-gray-700 dark:text-gray-400">
                                        {item.data_temuan.deskripsi || 'Deskripsi tidak tersedia.'}
                                    </p>
                                    <p className="mb-5 font-normal text-gray-700 dark:text-gray-400">
                                        Kemiripan Data : {item.persentase_kemiripan || '0'} %
                                    </p>
                                    <a href={`/temuan/detail/` + item.temuan_id || '#'} className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Read more
                                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    )
}
