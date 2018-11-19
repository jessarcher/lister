<?php

use Faker\Generator as Faker;

$factory->define(App\Item::class, function (Faker $faker) {
    return [
        'name' => $faker->sentence,
        'created_at' => $faker->datetime,
        'created_by' => function () {
            return factory(App\User::class)->create()->id;
        },
        'updated_at' => $faker->datetime,
        'updated_by' => function () {
            return factory(App\User::class)->create()->id;
        },
        'completed_at' => $faker->datetime,
        'completed_by' => function () {
            return factory(App\User::class)->create()->id;
        },
    ];
});
