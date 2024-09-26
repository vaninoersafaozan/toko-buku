import React from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

const EditBook = ({ book }) => {
    const { put, data, setData, errors } = useForm({
        title: book.title || '',
        description: book.description || '',
        category: book.category || '',
        stock: book.stock || '',
        price: book.price || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/books/${book.id}`);
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-10">
                <h1 className="text-3xl font-bold mb-4">Edit Buku</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Judul</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.title && <span className="text-red-500">{errors.title}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                        <textarea
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.description && <span className="text-red-500">{errors.description}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Kategori</label>
                        <input
                            type="text"
                            value={data.category}
                            onChange={e => setData('category', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.category && <span className="text-red-500">{errors.category}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Jumlah Buku (Stok)</label>
                        <input
                            type="number"
                            value={data.stock}
                            onChange={e => setData('stock', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.stock && <span className="text-red-500">{errors.stock}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Harga (Rp)</label>
                        <input
                            type="number"
                            value={data.price}
                            onChange={e => setData('price', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.price && <span className="text-red-500">{errors.price}</span>}
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Update Buku
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditBook;