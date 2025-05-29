<?php

namespace App\Http\Controllers;

use App\Models\KomentarHilang;
use Illuminate\Http\Request;

class KomentarHilangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        return KomentarHilang::where('id_hilang', $id)
            ->with(['user'])
            ->orderBy('created_at', 'desc')
            ->get([
                'id',
                'id_hilang',
                'user_whatsapp',
                'komentar',
                'created_at',
            ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $id)
    {
        KomentarHilang::create([
            'id_hilang' => $id,
            'user_whatsapp' => auth()->user()->whatsapp,
            'komentar' => $request->komentar,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function new($id)
    {
        return KomentarHilang::where('id_hilang', $id)
            ->with(['user'])
            ->orderBy('created_at', 'desc')
            ->first([
                'id',
                'id_hilang',
                'user_whatsapp',
                'komentar',
                'created_at',
            ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(KomentarHilang $komentarHilang)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, KomentarHilang $komentarHilang)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KomentarHilang $komentarHilang)
    {
        //
    }
}
