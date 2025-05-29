import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Provinsi } from '@/Components/laravolt/Provinsi';
import { Kota } from '@/Components/laravolt/Kota';

export default function KehilanganCreate({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        deskripsi: '',
        provinsi_hilang: '',
        kota_hilang: '',
        tanggal_hilang: '',
        barang_kategori: '',
        barang_warna: '',
        barang_merk: '',
        barang_cirikhusus: '',
    });

    const [provinsiId, setProvinsiId] = useState('');

    useEffect(() => {
        setProvinsiId(data.provinsi_hilang || '');
        setData('kota_hilang', '');
    }, [data.provinsi_hilang]);

    const handleProvinsiChange = (id) => {
        setData('provinsi_hilang', id);
    };

    const handleKotaChange = (id) => {
        setData('kota_hilang', id);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('kehilangan.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Lapor Kehilangan
                </h2>
            }
        >
            <Head title="Lapor Kehilangan" />

            <div className="grid grid-cols-12 gap-4 px-4">
                <div className="col-span-12 m-6 p-6 bg-white dark:bg-gray-800 rounded shadow">
                    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Deskripsi */}
                        <div className="md:col-span-2">
                            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Deskripsi
                            </label>
                            <textarea
                                value={data.deskripsi}
                                onChange={(e) => setData('deskripsi', e.target.value)}
                                className={`mt-1 block w-full border rounded-md shadow-sm dark:bg-gray-700 dark:text-white ${
                                    errors.deskripsi ? 'border-red-500' : 'border-gray-300'
                                }`}
                                rows={3}
                            />
                            {errors.deskripsi && <p className="text-red-600 text-sm">{errors.deskripsi}</p>}
                        </div>

                        {/* Provinsi dan Kota */}
                        <div className="md:col-span-2 grid grid-cols-2 gap-4">
  {/* Provinsi */}
  <div>
    <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
      Pilih Provinsi Hilang
    </label>
    <Provinsi
      className={`mt-1 w-full border rounded-md shadow-sm dark:bg-gray-700 dark:text-white ${
        errors.provinsi_hilang ? 'border-red-500' : 'border-gray-300'
      }`}
      onChange={(id) => {
        setData('provinsi_hilang', id);
        setData('kota_hilang', '');
      }}
      value={data.provinsi_hilang}
    />
    {errors.provinsi_hilang && (
      <p className="text-red-600 text-sm mt-1">{errors.provinsi_hilang}</p>
    )}
  </div>

  {/* Kota */}
  <div>
    <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
      Pilih Kota Hilang
    </label>
    <Kota
      className={`mt-1 w-full border rounded-md shadow-sm dark:bg-gray-700 dark:text-white ${
        errors.kota_hilang ? 'border-red-500' : 'border-gray-300'
      }`}
      ProvinsiKode={data.provinsi_hilang}
      onChange={(id) => setData('kota_hilang', id)}
      value={data.kota_hilang}
      disabled={!data.provinsi_hilang}
    />
    {errors.kota_hilang && (
      <p className="text-red-600 text-sm mt-1">{errors.kota_hilang}</p>
    )}
  </div>
</div>


                        {/* Tanggal Hilang */}
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Tanggal Hilang
                            </label>
                            <input
                                type="date"
                                value={data.tanggal_hilang}
                                onChange={(e) => setData('tanggal_hilang', e.target.value)}
                                className={`mt-1 block w-full border rounded-md shadow-sm dark:bg-gray-700 dark:text-white ${
                                    errors.tanggal_hilang ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.tanggal_hilang && <p className="text-red-600 text-sm">{errors.tanggal_hilang}</p>}
                        </div>

                        {/* Kategori Barang */}
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Kategori Barang
                            </label>
                            <input
                                type="text"
                                value={data.barang_kategori}
                                onChange={(e) => setData('barang_kategori', e.target.value)}
                                className={`mt-1 block w-full border rounded-md shadow-sm dark:bg-gray-700 dark:text-white ${
                                    errors.barang_kategori ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.barang_kategori && (
                                <p className="text-red-600 text-sm">{errors.barang_kategori}</p>
                            )}
                        </div>

                        {/* Warna Barang */}
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Warna Barang
                            </label>
                            <input
                                type="text"
                                value={data.barang_warna}
                                onChange={(e) => setData('barang_warna', e.target.value)}
                                className={`mt-1 block w-full border rounded-md shadow-sm dark:bg-gray-700 dark:text-white ${
                                    errors.barang_warna ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.barang_warna && <p className="text-red-600 text-sm">{errors.barang_warna}</p>}
                        </div>

                        {/* Merk Barang */}
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Merk Barang
                            </label>
                            <input
                                type="text"
                                value={data.barang_merk}
                                onChange={(e) => setData('barang_merk', e.target.value)}
                                className={`mt-1 block w-full border rounded-md shadow-sm dark:bg-gray-700 dark:text-white ${
                                    errors.barang_merk ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.barang_merk && <p className="text-red-600 text-sm">{errors.barang_merk}</p>}
                        </div>

                        {/* Ciri Khas */}
                        <div className="md:col-span-2">
                            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Ciri Khas
                            </label>
                            <textarea
                                value={data.barang_cirikhusus}
                                onChange={(e) => setData('barang_cirikhusus', e.target.value)}
                                className={`mt-1 block w-full border rounded-md shadow-sm dark:bg-gray-700 dark:text-white ${
                                    errors.barang_cirikhusus ? 'border-red-500' : 'border-gray-300'
                                }`}
                                rows={3}
                            />
                            {errors.barang_cirikhusus && (
                                <p className="text-red-600 text-sm">{errors.barang_cirikhusus}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-2 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200 disabled:opacity-50"
                            >
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}