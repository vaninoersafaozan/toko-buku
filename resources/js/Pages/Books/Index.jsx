import React, { useState } from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function BookList({ books, search, auth }) {
    // console.log(books);
    const { flash } = usePage().props;
    const [searchTerm, setSearchTerm] = useState(search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        Inertia.get('/books', { search: searchTerm });
    };

    const deleteData = (id, title) => {
        if (confirm(`Apakah Anda Yakin Menghapus Data ${title} Dihapus ?`)) {
            Inertia.delete(`/books/${id}`)
        }
    }

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Daftar Buku</h2>}>
            <Head title="Daftar Buku" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="container px-6 my-10">
                            <h1 className="text-3xl font-bold">Daftar Buku</h1>
                            <div className='flex justify-between items-center my-7'>
                                {/* Tombol Tambah Buku */}
                                <Link href='/books/create' className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Tambah Buku
                                </Link>

                                {/* Input Pencarian */}
                                <form onSubmit={handleSearch} className="flex items-center ml-auto w-full max-w-md">
                                    <input 
                                        type="search"
                                        placeholder="Cari buku..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="border border-gray-400 p-2 rounded-l-lg w-full"
                                    />
                                    <button 
                                        type="submit" 
                                        className="bg-blue-500 text-white px-4 py-2.5 rounded-r-lg h-full"
                                    >
                                        Cari
                                    </button>
                                </form>
                            </div>

                            { flash && flash.message && <div className="bg-green-500 text-white border border-green-200 py-3 px-5 rounded mb-5">{flash.message }</div> }

                            <hr className='my-5 mb-10' />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                                {books.data.length > 0 ? books.data.map((book) => (
                                    <div key={book.id} className="p-6 rounded-lg shadow-xl shadow-blue-100">
                                        {book.cover_image && (
                                            <img 
                                                src={`/storage/${book.cover_image}`} 
                                                alt={`Sampul buku ${book.title}`} 
                                                className="w-full h-64 mb-4 rounded"
                                            />
                                        )}
                                        <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
                                        <p className="text-gray-700 mb-2">{book.description}</p>
                                        <p className="text-gray-900 font-bold">Rp {book.price.toLocaleString()}</p>
                                        <p className="text-gray-500">Stok: {book.stock}</p>
                                        <Link href={`/books/${book.id}/edit`} className="bg-yellow-500 mr-3 text-white px-4 py-2 rounded mt-4 inline-block">
                                            Edit
                                        </Link>
                                        <Link href={`/books/${book.id}/detail`} className="bg-blue-500 mr-3 text-white px-4 py-2 rounded mt-4 inline-block">
                                            Lihat Detail
                                        </Link>
                                        <button onClick={() => deleteData(book.id, book.title)} className="bg-red-500 text-white px-4 py-2 rounded mt-4 inline-block">
                                            hapus
                                        </button>
                                    </div>
                                )) : (
                                    <div className="col-span-3">
                                        <p className="mb-10 text-center text-gray-700">Tidak ada buku yang ditemukan.</p>
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            <div className="mt-6 text-center">
                                {books.links.map((link) => {
                                    let linkLabel = link.label;

                                    if (linkLabel.includes('raquo')) {
                                        linkLabel = 'Next >>';
                                    }
                                    
                                    if (linkLabel.includes('laquo')) {
                                        linkLabel = '<< Previous'
                                    }

                                    return(
                                        <Link 
                                            key={link.label} 
                                            href={link.url} 
                                            className={`px-4 py-2 ${link.active ? 'bg-blue-500 text-white' : 'text-blue-500'} rounded mr-2`}
                                        >
                                            {linkLabel}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
