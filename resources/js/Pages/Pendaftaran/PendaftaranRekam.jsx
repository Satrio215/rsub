import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { BsCheckCircle, BsXCircle } from 'react-icons/bs';

export default function PendaftaranRekam({ message }) {
    const { data, setData, post, processing, errors } = useForm({
        pasien_id: '',
        dx: '',
        tx: '',
        keterangan: '',
    });

    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('rekams.store'));
    };

    useEffect(() => {
        if (message) {
            setShowModal(true);
            const timer = setTimeout(() => {
                setShowModal(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-blue-600 text-white text-center p-4">
                        <h4 className="text-lg font-semibold">Pendaftaran Rekam Medis</h4>
                    </div>
                {/* Modal */}
                <div className="p-6">
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-sm">
                            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                                <h5 className="text-lg font-semibold">Status</h5>
                                <button type="button" className="text-gray-500 hover:text-gray-700" onClick={() => setShowModal(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                            <div className="p-4 text-center">
                                {message.includes('Berhasil') ? (
                                    <BsCheckCircle className="text-green-500 mx-auto" size={40} />
                                ) : (
                                    <BsXCircle className="text-red-500 mx-auto" size={40} />
                                )}
                                <p className="mt-3">{message}</p>
                            </div>
                            <div className="p-4 border-t border-gray-200 text-right">
                                <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg" onClick={() => setShowModal(false)}>
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="pasien_id" className="block text-sm font-medium text-gray-700">ID Pasien</label>
                            <input
                                type="text"
                                id="pasien_id"
                                value={data.pasien_id}
                                onChange={e => setData('pasien_id', e.target.value)}
                                className={`mt-1 block w-full border ${errors.pasien_id ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                                placeholder="Masukkan ID Pasien"
                            />
                            {errors.pasien_id && <p className="mt-2 text-sm text-red-600">{errors.pasien_id}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="dx" className="block text-sm font-medium text-gray-700">Diagnosis (dx)</label>
                            <input
                                type="text"
                                id="dx"
                                value={data.dx}
                                onChange={e => setData('dx', e.target.value)}
                                className={`mt-1 block w-full border ${errors.dx ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                                placeholder="Masukkan Diagnosis"
                            />
                            {errors.dx && <p className="mt-2 text-sm text-red-600">{errors.dx}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="tx" className="block text-sm font-medium text-gray-700">Treatment (tx)</label>
                            <input
                                type="text"
                                id="tx"
                                value={data.tx}
                                onChange={e => setData('tx', e.target.value)}
                                className={`mt-1 block w-full border ${errors.tx ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                                placeholder="Masukkan Treatment"
                            />
                            {errors.tx && <p className="mt-2 text-sm text-red-600">{errors.tx}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="keterangan" className="block text-sm font-medium text-gray-700">Keterangan</label>
                            <textarea
                                id="keterangan"
                                value={data.keterangan}
                                onChange={e => setData('keterangan', e.target.value)}
                                className={`mt-1 block w-full border ${errors.keterangan ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                                placeholder="Masukkan Keterangan Tambahan"
                                rows="4"
                            />
                            {errors.keterangan && <p className="mt-2 text-sm text-red-600">{errors.keterangan}</p>}
                        </div>

                        <div className="mb-6">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                {processing ? (
                                    <span>
                                        <span className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full" role="status" aria-hidden="true"></span>
                                        &nbsp; Menyimpan...
                                    </span>
                                ) : 'Simpan Rekam Medis'}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="bg-gray-100 text-center p-4">
                    <small className="block mb-4">Pastikan semua data yang dimasukkan sudah benar sebelum menyimpan rekam medis.</small>
                    <button
                        className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg shadow transition-colors duration-300 ease-in-out hover:bg-blue-600 hover:text-white text-sm "
                            onClick={() => window.location.href = route('rekams.index')}
                    >
                        Kembali ke Daftar Pasien
                    </button>
                </div>
            </div>
        </div>
    );
}
