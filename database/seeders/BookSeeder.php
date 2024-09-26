<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Book;
use Illuminate\Support\Facades\DB;

class BookSeeder extends Seeder
{
    public function run()
    {
        // Menghapus data di tabel books tanpa melanggar foreign key constraint
        DB::table('books')->delete(); // Alih-alih menggunakan truncate()

        // Menambahkan data dummy ke tabel books
        Book::factory()->count(100)->create();
    }
}
