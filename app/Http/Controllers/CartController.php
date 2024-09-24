<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function add(Book $book)
    {
        // Pastikan ada stok sebelum menambahkannya ke keranjang
        if ($book->stock < 1) {
            return redirect()->back()->with('error', 'Stok buku tidak cukup.');
        }

        // Kurangi stok buku
        $book->decrement('stock');

        // Tambah buku ke keranjang
        $cart = Cart::firstOrNew([
            'user_id' => auth()->id(),
            'book_id' => $book->id,
        ]);

        $cart->quantity++;
        $cart->save();

        return redirect()->route('cart.index')->with('success', 'Buku berhasil ditambahkan ke keranjang.');
    }

    public function index()
    {
        $cartItems = Cart::where('user_id', auth()->id())->with('book')->get();
        return inertia('Cart/Index', [
            'cartItems' => $cartItems,
        ]);
    }

    public function remove(Cart $cart)
    {
        // Jika buku dihapus dari keranjang, kembalikan stoknya
        $book = $cart->book;
        $book->increment('stock', $cart->quantity);

        $cart->delete();
        return redirect()->route('cart.index')->with('success', 'Buku berhasil dihapus dari keranjang.');
    }
}
