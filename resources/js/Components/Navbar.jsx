import React from 'react';
import { Link, usePage } from '@inertiajs/react';

const Navbar = () => {
    const { auth } = usePage().props;

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between">
                <Link href="/" className="text-white text-lg font-bold">
                    Toko Buku
                </Link>
                <div className="flex space-x-4">
                    <Link href="/dashboard" className="text-white">Dashboard</Link>
                    <Link href="/books" className="text-white">Buku</Link>
                    <Link href="/cart" className="text-white">Keranjang</Link>
                    <Link href="/profile" className="text-white">Profil</Link>
                    <Link href="/logout" className="text-white">Logout</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
