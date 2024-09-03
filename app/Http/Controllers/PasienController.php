<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Pasien;
use Illuminate\Http\Request;

class PasienController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pasiens = Pasien::latest()->get();

        return Inertia::render('Pasien/Pasien', [
            'pasiens' => $pasiens

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Pendaftaran/Pendaftaran');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required',
            'lahir' => 'required|date',
            'nik' => 'required|unique:pasiens,nik',
            'alamat' => 'required',

        ], [
            'nik.unique' => 'NIK sudah terdaftar. Mohon masukkan NIK yang lain.',
        ]);

        Pasien::create($validated);
        return redirect()->route('pasiens.index')->with('message', 'Data Pasien berhasil ditambahkan');
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
        $pasiens = Pasien::findOrFail($id);

        $pasiens->delete();
    
        return redirect()->route('pasiens.index')->with('message', 'Data Berhasil Dihapus!');
    }
}
