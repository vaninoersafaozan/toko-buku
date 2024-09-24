import React from 'react';
import { Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

const BookList = ({ books }) => {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-10">
                <h1 className="text-3xl font-bold">Daftar Buku</h1>
                <Link href='/books/create'>Tambah Buku</Link>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {books.map((book) => (
                        <div key={book.id} className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
                            <p className="text-gray-700 mb-2">{book.description}</p>
                            <p className="text-gray-900 font-bold">Rp {book.price.toLocaleString()}</p>
                            <p className="text-gray-500">Stok: {book.stock}</p>
                            <Link href={`/books/${book.id}/detail`} className="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block">
                                Lihat Detail
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookList;
