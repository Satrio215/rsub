<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Rekam;
use App\Models\Pasien;
use Illuminate\Http\Request;

class RekamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rekams = Rekam::join('pasiens', 'rekams.pasien_id', '=', 'pasiens.id')
                   ->select('rekams.*', 'pasiens.nik as pasien_nik')
                   ->orderBy('rekams.created_at', 'desc')
                   ->get();

    return Inertia::render('Rekam/Rekam', [
        'rekams' => $rekams
    ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Pendaftaran/PendaftaranRekam');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $validatedData = $request->validate([
        'pasien_id' => 'required|exists:pasiens,nik', // Validasi menggunakan kolom 'nik'
        'dx' => 'required|string|max:255',
        'tx' => 'required|string|max:255',
        'keterangan' => 'nullable|string'
    ]);

    // Temukan pasien berdasarkan 'nik'
    $pasien = Pasien::where('nik', $validatedData['pasien_id'])->first();

    if (!$pasien) {
        return redirect()->back()->withErrors(['pasien_id' => 'Pasien dengan NIK tersebut tidak ditemukan.']);
    }

    $rekamData = [
        'pasien_id' => $pasien->id, // Gunakan 'id' pasien, bukan 'nik'
        'dx' => $validatedData['dx'],
        'tx' => $validatedData['tx'],
        'keterangan' => $validatedData['keterangan']
    ];

    // Simpan data rekam medis  
    Rekam::create($rekamData);

    // Redirect kembali ke halaman pembuatan rekam medis dengan pesan sukses
    return redirect()->route('rekams.index')->with('success', 'Rekam medis berhasil ditambahkan.');
}



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $rekams = Rekam::findOrFail($id);

        $rekams->delete();
    
        return redirect()->route('rekams.index')->with('message', 'Data Berhasil Dihapus!');
    }
}
