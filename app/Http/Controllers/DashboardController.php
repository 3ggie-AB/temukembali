<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Dashboard', [
            'user' => auth()->user(),
        ]);
    }
    public function data(Request $request)
    {
        $perPage = $request->get('per_page', 6);
        $page = $request->get('page', 1);

        $temuan = DB::table('lapor_temuan')
            ->orderBy('created_at', 'desc')
            ->select('*', DB::raw('"temuan" as type'));
        $hilang = DB::table('lapor_hilang')
            ->orderBy('created_at', 'desc')
            ->select('*', DB::raw('"hilang" as type'));

        $data = $temuan->unionAll($hilang)
        ->orderBy('created_at', 'desc')
        ->skip(($page - 1) * $perPage)
        ->take($perPage)
        ->get();

        return response()->json([
            'data' => $data,
            'total' => $temuan->count() + $hilang->count(),
            'per_page' => $perPage,
            'current_page' => $page,
        ]);
    }
}
