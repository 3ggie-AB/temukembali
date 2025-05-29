<?php

namespace App\Http\Controllers;

use App\Models\Temuan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TemuanController extends Controller
{
    public function index()
    {
        $temuan = Temuan::where('user_whatsapp', auth()->user()->whatsapp)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('temuan/TemuanList', [
            'temuan' => Temuan::orderBy('created_at', 'desc')->get(),
        ]);

    }


    public function show($id)
    {
        $temuan = Temuan::findOrFail($id);

        return Inertia::render('Temuan/Show', [
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
        ]);

        Temuan::create([
            'user_id' => auth()->id(),
            'deskripsi' => $request->deskripsi,
            'tanggal_ditemukan' => $request->tanggal_ditemukan,
            'barang_kategori' => $request->barang_kategori,
            'barang_warna' => $request->barang_warna,
            'barang_merk' => $request->barang_merk,
            'status' => 'belum diklaim', // default status
        ]);

        return redirect()->route('temuan.index')->with('success', 'Laporan temuan berhasil dibuat.');
    }

    public function edit($id)
    {
        $temuan = Temuan::findOrFail($id);

        return Inertia::render('Temuan/Edit', [
            'temuan' => $temuan,
        ]);
    }

    public function update(Request $request, $id)
    {
        $temuan = Temuan::findOrFail($id);

        $request->validate([
            'deskripsi' => 'required|string|max:255',
            'tanggal_ditemukan' => 'required|date',
            'barang_kategori' => 'required|string',
            'barang_warna' => 'required|string',
            'barang_merk' => 'nullable|string',
            'status' => 'required|string',
        ]);

        $temuan->update($request->only([
            'deskripsi', 'tanggal_ditemukan', 'barang_kategori', 'barang_warna', 'barang_merk', 'status'
        ]));

        return redirect()->route('temuan.index')->with('success', 'Laporan temuan berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $temuan = Temuan::findOrFail($id);
        $temuan->delete();

        return redirect()->route('temuan.index')->with('success', 'Laporan temuan berhasil dihapus.');
    }
}
