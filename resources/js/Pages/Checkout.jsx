import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

const Checkout = ({ snapToken }) => {
    const { post } = useForm();

    useEffect(() => {
        window.snap.pay(snapToken, {
            onSuccess: function (result) {
                alert('Pembayaran berhasil');
                post('/payment/callback', result);
            },
            onError: function (result) {
                alert('Pembayaran gagal');
            }
        });
    }, [snapToken]);

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-bold">Sedang memproses pembayaran...</h1>
        </div>
    );
};

export default Checkout;
