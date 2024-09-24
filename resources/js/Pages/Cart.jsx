import React from 'react';
import Navbar from '@/Components/Navbar';
import { Link, useForm } from '@inertiajs/react';

const Cart = ({ cartItems }) => {
    const { post } = useForm();

    const handleCheckout = () => {
        post('/checkout', { items: cartItems });
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-10">
                <h1 className="text-3xl font-bold">Keranjang</h1>
                {cartItems.length > 0 ? (
                    <div className="mt-6">
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item.id} className="mb-4">
                                    <p className="text-lg font-bold">{item.book.title}</p>
                                    <p className="text-gray-700">Rp {item.book.price.toLocaleString()}</p>
                                    <p className="text-gray-500">Jumlah: {item.quantity}</p>
                                </li>
                            ))}
                        </ul>
                        <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                            Checkout
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-500">Keranjang kosong.</p>
                )}
            </div>
        </div>
    );
};

export default Cart;
