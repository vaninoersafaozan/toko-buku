import React from 'react';
import Navbar from '@/Components/Navbar';
import { Link } from '@inertiajs/react';

const BookDetail = ({ book }) => {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-10">
                <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
                <p className="text-gray-700">{book.description}</p>
                <p className="text-gray-900 font-bold mt-4">Rp {book.price.toLocaleString()}</p>
                <p className="text-gray-500">Stok: {book.stock}</p>
                {book.stock > 0 ? (
                    <Link 
                        href={route('cart.add', book.id)} 
                        method="post" 
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block"
                    >
                        Tambah ke Keranjang
                    </Link>
                ) : (
                    <p className="text-red-500 mt-4">Stok Habis</p>
                )}
            </div>
        </div>
    );
};

export default BookDetail;
