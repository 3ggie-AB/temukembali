<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->createMany([
            ['name' => 'Abi Syibaihai',
            'email' => 'ahmadsyibaihi@gmail.com',
            'password' => bcrypt('123123123'),],
            ['name' => 'Egi Ahmad Baihaqi',
            'email' => '3ggie.ab@gmail.com',
            'password' => bcrypt('123123123'),],
        ]);
    }
}
