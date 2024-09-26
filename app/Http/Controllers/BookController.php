<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $books = Book::when($search, function ($query, $search) {
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('category', 'like', "%{$search}%");
        })
        ->orderBy('created_at', 'desc')
        ->paginate(6)
        ->withQueryString();

        return inertia('Books/Index', [
            'books' => $books,
            'search' => $search,
        ]);
    }

    public function create()
    {
        return inertia('Books/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:255',
            'stock' => 'required|integer|min:1',
            'price' => 'required|integer|min:1',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', 
        ]);

        if ($request->hasFile('cover_image')) {
            $validatedData['cover_image'] = $request->file('cover_image')->store('cover_images', 'public');
        }

        Book::create($validatedData);

        return redirect()->route('books.index')->with('message', 'Buku berhasil ditambahkan!');
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

        return redirect()->route('books.index')->with('message', 'Buku Dengan Judul: '. $book->title .' Berhasil Diupdate...');
    }
    
    public function show(Book $book)
    {
        return inertia('Books/Show', ['book' => $book]);
    }
    
    public function destroy(string $id)
    {
        $books = Book::findOrFail($id);
        $title = $books->title;
        $books->delete();

        return redirect()->route('books.index')
        ->with('message', 'Buku Dengan Judul: ' . $title . ' Berhasil Dihapus');
    }
}   
