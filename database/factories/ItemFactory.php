<?php

use Faker\Generator as Faker;

$factory->define(App\Item::class, function (Faker $faker) {
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
        'completed_at' => null,
        'completed_by' => null,
    ];
});

$factory->state(App\Item::class, 'complete', function ($faker) {
    return [
        'completed_at' => $faker->datetime,
        'completed_by' => function () {
            return factory(App\User::class)->create()->id;
        },
    ];
});
