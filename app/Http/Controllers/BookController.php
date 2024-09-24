<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::all();
        return inertia('Books/Index', ['books' => $books]);
    }

    public function create()
    {
        return inertia('Books/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'category' => 'required',
            'stock' => 'required|integer|min:1',
            'price' => 'required|integer',
        ]);

        Book::create($request->all());

        return redirect()->route('books.index')->with('success', 'Buku berhasil ditambahkan');
    }

    public function edit(Book $book)
    {
        return inertia('Books/Edit', ['book' => $book]);
    }

    public function update(Request $request, Book $book)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'category' => 'required',
            'stock' => 'required|integer|min:0',
            'price' => 'required|integer',
        ]);

        $book->update($request->all());

        return redirect()->route('books.index');
    }
    
    public function show(Book $book)
    {
        return inertia('Books/Show', ['book' => $book]);
    }
    
    public function destroy(Book $book)
    {
        $book->delete();
        return redirect()->route('books.index');
    }
}
