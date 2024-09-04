import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Detail({ rekam }) {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detail Rekam Medis</h2>}
        >
            <Head title="Detail Rekam Medis" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Detail Rekam Medis</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Diagnosis (Dx)</label>
                                    <p className="mt-1 text-sm text-gray-900">{rekam?.dx}</p>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Treatment (Tx)</label>
                                    <p className="mt-1 text-sm text-gray-900">{rekam?.tx}</p>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Keterangan</label>
                                    <p className="mt-1 text-sm text-gray-900">{rekam?.keterangan}</p>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Tanggal Pembuatan</label>
                                    <p className="mt-1 text-sm text-gray-900">{rekam?.created_at}</p>
                                </div>
                            </div>
                            <button
                                className="border border-yellow-600 text-yellow-600 px-4 py-2 rounded-lg shadow transition-colors duration-300 ease-in-out hover:bg-yellow-600 hover:text-white text-sm"
                                onClick={() => window.location.href = route('rekams.index')}
                            >
                                Kembali ke Daftar Rekam Medis
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
