import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';

export default function Pasien({ pasiens }) {
    const { auth } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus pasien ini?')) {
            const url = route('pasiens.destroy', id);
            console.log(url); // Log the URL
            axios.delete(url)
                .then(() => {
                    Inertia.reload({ only: ['pasiens'] });
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Daftar Pasien</h2>}
        >
            <Head title="Pasien" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">
                            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Daftar Pasien</h3>
                                <button 
                                    className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg shadow transition-colors duration-300 ease-in-out hover:bg-blue-600 hover:text-white"
                                    onClick={() => window.location.href = route('pasiens.create')}
                                >
                                    Tambah Pasien
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-300 bg-white rounded-lg shadow table-auto">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nama</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Lahir</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">NIK</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Alamat</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {pasiens.map((pasien) => (
                                            <tr key={pasien.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-2 whitespace-nowrap text-sm">{pasien.nama}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm">{pasien.lahir}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm">{pasien.nik}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm">{pasien.alamat}</td>
                                                <td className="px-4 py-2 whitespace-nowrap flex space-x-2">
                                                    <button
                                                        className="border border-red-600 text-red-600 px-4 py-2 rounded-lg shadow transition-colors duration-300 ease-in-out hover:bg-red-600 hover:text-white text-sm"
                                                        onClick={() => handleDelete(pasien.id)}
                                                    >
                                                        Hapus
                                                    </button>
                                                    <button
                                                        className="border border-green-600 text-green-600 px-4 py-2 rounded-lg shadow transition-colors duration-300 ease-in-out hover:bg-green-600 hover:text-white text-sm"
                                                        onClick={() => window.location.href = route('pasiens.show', pasien.id)}
                                                    >
                                                        Detail
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
