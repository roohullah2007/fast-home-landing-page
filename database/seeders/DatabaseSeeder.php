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
        // Create admin user
        if (!User::where('email', 'admin@fasthomecashoffers.com')->exists()) {
            User::create([
                'name' => 'Admin',
                'email' => 'admin@fasthomecashoffers.com',
                'password' => bcrypt('@Password1'),
                'email_verified_at' => now(),
            ]);
        }

        $this->call([
            VacancySeeder::class,
            TeamMemberSeeder::class,
            TestimonialSeeder::class,
        ]);
    }
}
