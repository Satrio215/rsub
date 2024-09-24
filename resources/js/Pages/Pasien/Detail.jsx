import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';

export default function Detail({ pasien, rekams }) {
    const { auth } = usePage().props;
    const safeRekams = Array.isArray(rekams) ? rekams : [];
    console.log(pasien); // Cek apakah pasien terdefinisi


    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus rekam medis ini?')) {
            axios.delete(route('rekams.destroy', id))
                .then(() => {
                    Inertia.reload({ only: ['rekams'] });
                })
                .catch(error => {
                    if (error.response && error.response.status === 400) {
                        alert(error.response.data.error);
                    } else {
                        console.error('Terjadi kesalahan:', error);
                    }
                });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detail Pasien</h2>}
        >
            <Head title="Detail Pasien & Rekam Medis" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Detail Pasien */}
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">
                            {/* Informasi pasien */}
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Detail Pasien</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Nama</label>
                                    <p className="mt-1 text-sm text-gray-900">{pasien?.nama}</p>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
                                    <p className="mt-1 text-sm text-gray-900">{pasien?.lahir}</p>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">NIK</label>
                                    <p className="mt-1 text-sm text-gray-900">{pasien?.nik}</p>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Alamat</label>
                                    <p className="mt-1 text-sm text-gray-900">{pasien?.alamat}</p>
                                </div>
                            </div>
                            <button
                                className="border border-yellow-600 text-yellow-600 px-4 py-2 rounded-lg shadow transition-colors duration-300 ease-in-out hover:bg-yellow-600 hover:text-white text-sm"
                                onClick={() => window.location.href = route('pasiens.index')}
                            >
                                Kembali ke Daftar Pasien
                            </button>
                        </div>
                    </div>

                    {/* Daftar Rekam Medis */}
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-8">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">
                            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Daftar Rekam Medis</h3>
                                <button 
                                    className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg shadow transition-colors duration-300 ease-in-out hover:bg-blue-600 hover:text-white"
                                    onClick={() => window.location.href = route('rekams.create')}
                                >
                                    Tambah Rekam Medis
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                {safeRekams.length > 0 ? (
                                    <table className="min-w-full divide-y divide-gray-300 bg-white rounded-lg shadow table-auto">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Diagnosis (Dx)</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Treatment (Tx)</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Keterangan</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {safeRekams.map((rekam) => (
                                                <tr key={rekam.id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm">{rekam.dx}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm">{rekam.tx}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm">{rekam.keterangan}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap flex space-x-2">
                                                        <button
                                                            className="border border-red-600 text-red-600 px-4 py-2 rounded-lg shadow transition-colors duration-300 ease-in-out hover:bg-red-600 hover:text-white text-sm"
                                                            onClick={() => handleDelete(rekam.id)}
                                                        >
                                                            Hapus
                                                        </button>
                                                        <button
                                                            className="border border-green-600 text-green-600 px-4 py-2 rounded-lg shadow transition-colors duration-300 ease-in-out hover:bg-green-600 hover:text-white text-sm"
                                                            onClick={() => window.location.href = route('rekams.show', rekam.id)}
                                                        >
                                                            Detail
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-center text-gray-500">Tidak ada rekam medis yang ditemukan.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
