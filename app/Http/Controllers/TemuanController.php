<?php

namespace App\Http\Controllers;

use App\Models\LaporTemuan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TemuanController extends Controller
{
    public function index()
    {
        $temuan = LaporTemuan::where('user_whatsapp', auth()->user()->whatsapp)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('temuan/TemuanList', [
            'temuan' => $temuan,
        ]);

    }


    public function show($id)
    {
        $temuan = LaporTemuan::with('provinsi', 'kota')
        ->findOrFail($id);

        return Inertia::render('temuan/TemuanShow', [
            'temuan' => $temuan,
        ]);
    }

    public function create()
    {
        return Inertia::render('temuan/TemuanCreate', [
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'deskripsi' => 'required|string|max:255',
            'tanggal_ditemukan' => 'required|date',
            'barang_kategori' => 'required|string',
            'barang_warna' => 'required|string',
            'barang_merk' => 'nullable|string',
            'provinsi_temuan' => 'nullable|string',
            'kota_temuan' => 'nullable|string', 
        ]);

        LaporTemuan::create([
            'user_whatsapp' => $request->user()->whatsapp,
            'deskripsi' => $request->deskripsi,
            'provinsi_temuan' => $request->provinsi_temuan,
            'kota_temuan' => $request->kota_temuan,
            'tanggal_temuan' => $request->tanggal_ditemukan,
            'barang_kategori' => $request->barang_kategori,
            'barang_warna' => $request->barang_warna,
            'barang_merk' => $request->barang_merk,
            'status' => $request->status ?? 'ditemukan',
        ]);

        return redirect()->route('temuan.index')->with('success', 'Laporan temuan berhasil dibuat.');
    }

    public function edit($id)
    {
        $temuan = LaporTemuan::findOrFail($id);
        return inertia('temuan/TemuanEdit', [
            'temuan' => $temuan,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'deskripsi' => 'required|string|max:1000',
            'barang_cirikhusus' => 'required|string|max:1000',
            'tanggal_temuan' => 'required|date',
            'provinsi_temuan' => 'nullable|string|max:255',
            'kota_temuan' => 'nullable|string|max:255',
            'barang_kategori' => 'nullable|string|max:255',
            'barang_warna' => 'nullable|string|max:255',
            'barang_merk' => 'nullable|string|max:255',
            'status' => 'required|string',
        ]);
        
        // dd($validated);
        $temuan = LaporTemuan::findOrFail($id);
        $temuan->update($validated);


        return redirect()->route('temuan.index')->with('success', 'Terima Kasih Data Temuan berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $temuan = LaporTemuan::findOrFail($id);
        $temuan->delete();

        return redirect()->route('temuan.index')->with('success', 'Laporan temuan berhasil dihapus.');
    }
}
