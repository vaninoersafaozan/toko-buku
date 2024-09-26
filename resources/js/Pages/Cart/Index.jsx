import React, { useState } from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const CartIndex = ({ cartItems, auth }) => {
    const [selectedBooks, setSelectedBooks] = useState([]);
    const { flash } = usePage().props;

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

    const handleCheckout = async (e) => {
        e.preventDefault();
        // Logic untuk melakukan checkout
    };
    
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Keranjang</h2>}>
            <Head title="Keranjang" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="container px-6 my-10">
                            <h1 className="text-3xl font-bold">Keranjang Anda</h1>

                            {flash && flash.message && (
                                <div className="bg-green-500 text-white border border-green-200 py-3 px-5 rounded mb-5">{flash.message}</div>
                            )}

                            {cartItems.length === 0 ? (
                                <p className="mt-4">Keranjang Anda kosong.</p>
                            ) : (
                                <form onSubmit={handleCheckout}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                                        {cartItems.map(item => (
                                            <div key={item.book.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col">
                                                <h2 className="font-semibold">{item.book.title}</h2>
                                                <p>Harga: Rp {item.book.price.toLocaleString()}</p>
                                                <p>Jumlah: {item.quantity}</p>
                                                <label className="flex items-center mt-2">
                                                    <input
                                                        type="checkbox"
                                                        value={item.book.id}
                                                        checked={selectedBooks.includes(item.book.id)}
                                                        onChange={() => toggleSelectBook(item.book.id)}
                                                        className="mr-2"
                                                    />
                                                    Pilih untuk Checkout
                                                </label>
                                                <Link href={route('cart.remove', item.id)} method="delete" className="text-red-500 mt-4">
                                                    Hapus
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="mt-4">
                                        <h3 className="font-semibold">Total Harga: Rp {calculateTotalPrice().toLocaleString()}</h3>
                                        <button 
                                            type="submit" 
                                            className={`mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded ${selectedBooks.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={selectedBooks.length === 0}
                                        >
                                            Checkout
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CartIndex;
