<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create an Admin User
        User::create([
            'name' => 'Rasindu',
            'email' => 'rasinduperera25@gmail.com',
            'password' => Hash::make('RV118821'), // Secure password hashing
        ]);

    }
}