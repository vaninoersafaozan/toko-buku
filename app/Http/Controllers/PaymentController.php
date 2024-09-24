<?php

namespace App\Http\Controllers;

use Midtrans\Snap;
use Midtrans\Config;
use App\Models\Book;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function checkout(Request $request)
    {
        $selectedBooks = Book::whereIn('id', $request->book_ids)->get();

        $totalAmount = $selectedBooks->sum(function ($book) {
            return $book->price;
        });

        Config::$serverKey = config('services.midtrans.serverKey');
        Config::$isProduction = config('services.midtrans.isProduction');
        Config::$isSanitized = true;
        Config::$is3ds = true;

        $params = [
            'transaction_details' => [
                'order_id' => uniqid(),
                'gross_amount' => $totalAmount,
            ],
            'customer_details' => [
                'first_name' => $request->user()->name,
                'email' => $request->user()->email,
            ],
        ];

        $snapToken = Snap::getSnapToken($params);
        return response()->json(['token' => $snapToken]);
    }

    public function handlePayment(Request $request)
    {
        // Validasi dan update stock setelah pembayaran sukses
        $selectedBooks = Book::whereIn('id', $request->book_ids)->get();
        foreach ($selectedBooks as $book) {
            if ($book->stock < 1) {
                return response()->json(['error' => 'Stok buku tidak cukup!'], 400);
            }
            $book->decrement('stock');
        }
        return response()->json(['message' => 'Pembayaran berhasil']);
    }
}
