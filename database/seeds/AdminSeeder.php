<?php

use App\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (DB::table('users')->count() > 0) {
            return;
        }

        factory(User::class)->create([
            'name'     => 'Jess Archer',
            'email'    => 'jess@jessarcher.com',
            'is_admin' => true,
        ]);
    }
}
