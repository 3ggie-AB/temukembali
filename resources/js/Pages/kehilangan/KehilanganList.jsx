import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function KehilanganList({ auth }) {
  const { kehilangan } = usePage().props;

  return (
    <AuthenticatedLayout user={auth.user} header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Daftar Kehilangan 
        </h2>
      }>
      <Head title="List Kehilangan" />

      <div className="py-6 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
          <div className="mb-3">
              <Link href={route('kehilangan.create')} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Laporkan Kehilangan
              </Link>
          </div>

          {kehilangan.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">Belum ada laporan kehilangan.</p>
          ) : (
            <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="border border-gray-300 px-4 py-2 text-left">Deskripsi</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Tanggal Hilang</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Kategori</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Warna</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Merk</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {kehilangan.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="border border-gray-300 px-4 py-2">{item.deskripsi}</td>
                    <td className="border border-gray-300 px-4 py-2">{new Date(item.tanggal_hilang).toLocaleDateString()}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.barang_kategori}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.barang_warna}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.barang_merk}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.status}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <Link href={`/kehilangan/${item.id}`} className="text-blue-600 hover:underline mr-3">
                        Detail
                      </Link>
                      <Link href={`/kehilangan/saya/${item.id}/edit`} className="text-green-600 hover:underline">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
