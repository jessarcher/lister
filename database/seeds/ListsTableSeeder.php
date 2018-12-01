<?php

use App\ItemList;
use Illuminate\Database\Seeder;

class ListsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(ItemList::class, 10)->create();
    }
}
