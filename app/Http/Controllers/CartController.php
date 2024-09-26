<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Cart;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
    public function index()
    {
        $cartItems = Cart::where('user_id', auth()->id())
            ->with('book')
            ->orderBy('created_at', 'desc')
            ->get();
        return inertia('Cart/Index', [
            'cartItems' => $cartItems,
        ]);
    }

    public function add(Book $book)
    {
        if ($book->stock < 1) {
            return redirect()->back()->with('error', 'Stok buku tidak cukup.');
        }

        $book->decrement('stock');

        $cart = Cart::firstOrNew([
            'user_id' => auth()->id(),
            'book_id' => $book->id,
        ]);

        $cart->quantity++;
        $cart->save();

        return redirect()->route('cart.index')->with('message', 'Buku Dengan Judul: '. $book->title .' berhasil ditambahkan ke keranjang.');
    }

    public function remove(Cart $cart)
    {
        $book = $cart->book;

        if ($book) {
            $book->increment('stock', $cart->quantity);
        } else {
            Log::warning('Buku tidak ditemukan saat mencoba menghapus dari keranjang', ['cart_id' => $cart->id]);
        }
        
        $cart->delete();

        return redirect()->route('cart.index')->with('message', 'Buku Dengan Judul: '. $book->title .' Berhasil Dihapus Dari Keranjang Dan Stok Buku Berhasil Dikembalikan.');
    }
}
