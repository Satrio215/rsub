import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function Pendaftaran({ message }) {
    const { data, setData, post, processing, errors } = useForm({
        nama: '',
        lahir: '',
        nik: '',
        alamat: '',
    });

    // State untuk mengontrol tampilan modal
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('pasiens.store'));
    };

    useEffect(() => {
        if (message) {
            setShowModal(true); // Tampilkan modal ketika ada pesan
            const timer = setTimeout(() => {
                setShowModal(false); // Sembunyikan modal setelah 5 detik
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-green-600 text-white text-center p-4">
                    <h4 className="text-lg font-semibold">Pendaftaran Pasien Baru</h4>
                </div>
                <div className="p-6">
                    {/* Modal Pop-up untuk menampilkan pesan sukses */}
                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                            <div className="bg-white rounded-lg shadow-lg w-full max-w-sm">
                                <div className="p-4 border-b border-gray-200">
                                    <h5 className="text-lg font-semibold">Berhasil</h5>
                                    <button 
                                        type="button" 
                                        className="text-gray-500 hover:text-gray-700" 
                                        onClick={() => setShowModal(false)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                                <div className="p-4">
                                    <p>{message}</p>
                                </div>
                                <div className="p-4 border-t border-gray-200 text-right">
                                    <button 
                                        type="button" 
                                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg" 
                                        onClick={() => setShowModal(false)}
                                    >
                                        Tutup
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama</label>
                            <input
                                type="text"
                                id="nama"
                                value={data.nama}
                                onChange={e => setData('nama', e.target.value)}
                                className={`mt-1 block w-full border ${errors.nama ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                                placeholder="Masukkan nama pasien"
                            />
                            {errors.nama && <p className="mt-2 text-sm text-red-600">{errors.nama}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="lahir" className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
                            <input
                                type="date"
                                id="lahir"
                                value={data.lahir}
                                onChange={e => setData('lahir', e.target.value)}
                                className={`mt-1 block w-full border ${errors.lahir ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                            />
                            {errors.lahir && <p className="mt-2 text-sm text-red-600">{errors.lahir}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="nik" className="block text-sm font-medium text-gray-700">NIK</label>
                            <input
                                type="text"
                                id="nik"
                                value={data.nik}
                                onChange={e => setData('nik', e.target.value)}
                                className={`mt-1 block w-full border ${errors.nik ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                                placeholder="Masukkan NIK pasien"
                            />
                            {errors.nik && <p className="mt-2 text-sm text-red-600">{errors.nik}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">Alamat</label>
                            <textarea
                                id="alamat"
                                value={data.alamat}
                                onChange={e => setData('alamat', e.target.value)}
                                className={`mt-1 block w-full border ${errors.alamat ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                                placeholder="Masukkan alamat pasien"
                                rows="4"
                            />
                            {errors.alamat && <p className="mt-2 text-sm text-red-600">{errors.alamat}</p>}
                        </div>

                        <div className="mb-6">
                            <button 
                                type="submit" 
                                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                {processing ? (
                                    <span>
                                        <span className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full" role="status" aria-hidden="true"></span>
                                        &nbsp; Mendaftarkan...
                                    </span>
                                ) : 'Daftar Pasien'}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="bg-gray-100 text-center p-4">
                    <small>Pastikan semua data yang dimasukkan sudah benar sebelum mendaftar.</small>
                </div>
            </div>
        </div>
    );
}
