<?php

use Faker\Generator as Faker;

$factory->define(App\ItemList::class, function (Faker $faker) {
    return [
        'name' => $faker->sentence,
        'order' => $faker->numberBetween(1, 100),
        'created_at' => $faker->datetime,
        'created_by' => function () {
            return factory(App\User::class)->create()->id;
        },
        'updated_at' => $faker->datetime,
        'updated_by' => function () {
            return factory(App\User::class)->create()->id;
        },
    ];
});
