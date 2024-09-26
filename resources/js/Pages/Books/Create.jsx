import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const CreateBook = ({ auth }) => {
    const { post, data, setData, errors, progress } = useForm({
        title: '',
        description: '',
        category: '',
        stock: '',
        price: '',
        cover_image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('stock', data.stock);
        formData.append('price', data.price);
        formData.append('cover_image', data.cover_image);

        post('/books', formData, {
            forceFormData: true,
        });
    };

    const handleFileChange = (e) => {
        setData('cover_image', e.target.files[0]);
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Buku</h2>}>
            <Head title="Tambah Buku" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="container px-6 my-10">
                            <h1 className="text-3xl font-bold mb-4 border-b-2 pb-2">Tambah Buku</h1>
                            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                                
                                {/* Baris 1: Judul dan Kategori */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-md font-bold text-gray-700">Judul</label>
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={e => setData('title', e.target.value)}
                                            placeholder="Masukkan judul buku"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                        />
                                        {errors.title && <span className="text-red-500">{errors.title}</span>}
                                    </div>
                                    <div>
                                        <label className="block text-md font-bold text-gray-700">Kategori</label>
                                        <input
                                            type="text"
                                            value={data.category}
                                            onChange={e => setData('category', e.target.value)}
                                            placeholder="Masukkan kategori buku"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                        />
                                        {errors.category && <span className="text-red-500">{errors.category}</span>}
                                    </div>
                                </div>

                                {/* Baris 2: Deskripsi dan Jumlah Buku */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-md font-bold text-gray-700">Deskripsi</label>
                                        <textarea
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            placeholder="Masukkan deskripsi buku"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                        />
                                        {errors.description && <span className="text-red-500">{errors.description}</span>}
                                    </div>
                                    <div>
                                        <label className="block text-md font-bold text-gray-700">Jumlah Buku (Stok)</label>
                                        <input
                                            type="number"
                                            value={data.stock}
                                            onChange={e => setData('stock', e.target.value)}
                                            placeholder="Masukkan jumlah buku"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                        />
                                        {errors.stock && <span className="text-red-500">{errors.stock}</span>}
                                    </div>
                                </div>

                                {/* Baris 3: Sampul dan Harga */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-md font-bold text-gray-700">Sampul Buku:</label>
                                        <input 
                                            type="file" 
                                            id="cover_image"
                                            name="cover_image" 
                                            onChange={handleFileChange}
                                            className="p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm" 
                                        />
                                        {errors.cover_image && <span className="text-red-500">{errors.cover_image}</span>}
                                    </div>
                                    <div>
                                        <label className="block text-md font-bold text-gray-700">Harga (Rp)</label>
                                        <input
                                            type="number"
                                            value={data.price}
                                            onChange={e => setData('price', e.target.value)}
                                            placeholder="Masukkan harga buku"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                        />
                                        {errors.price && <span className="text-red-500">{errors.price}</span>}
                                    </div>
                                </div>

                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Tambah Buku
                                </button>
                                {progress && <progress value={progress.percentage} max="100">{progress.percentage}%</progress>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreateBook;
