import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

const CartIndex = ({ cartItems }) => {
    const [selectedBooks, setSelectedBooks] = useState([]);

    const toggleSelectBook = (bookId) => {
        if (selectedBooks.includes(bookId)) {
            setSelectedBooks(selectedBooks.filter(id => id !== bookId));
        } else {
            setSelectedBooks([...selectedBooks, bookId]);
        }
    };

    const calculateTotalPrice = () => {
        let total = 0;
        selectedBooks.forEach(bookId => {
            const item = cartItems.find(cartItem => cartItem.book.id === bookId);
            if (item) {
                total += item.book.price * item.quantity;
            }
        });
        return total;
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-10">
                <h1 className="text-3xl font-bold">Keranjang Anda</h1>
                {cartItems.length === 0 ? (
                    <p className="mt-4">Keranjang Anda kosong.</p>
                ) : (
                    <>
                        <form method="POST" action={route('checkout')}>
                            <ul className="mt-4">
                                {cartItems.map(item => (
                                    <li key={item.book.id} className="flex justify-between items-center mb-4">
                                        <div>
                                            <h2 className="font-semibold">{item.book.title}</h2>
                                            <p>Harga: Rp {item.book.price}</p>
                                            <p>Jumlah: {item.quantity}</p>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    value={item.book.id}
                                                    checked={selectedBooks.includes(item.book.id)}
                                                    onChange={() => toggleSelectBook(item.book.id)}
                                                />
                                                Pilih untuk Checkout
                                            </label>
                                        </div>
                                        <form action={route('cart.remove', item.id)} method="POST">
                                            <button type="submit" className="text-red-500">
                                                Hapus
                                            </button>
                                        </form>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4">
                                <h3 className="font-semibold">Total Harga: Rp {calculateTotalPrice()}</h3>
                                <button type="submit" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
                                    Checkout
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartIndex;
