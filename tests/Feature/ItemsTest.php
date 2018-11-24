<?php

namespace Tests\Feature;

use App\Item;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ItemsTest extends TestCase
{
    use RefreshDatabase;

    public function setUp()
    {
        parent::setUp();

        $this->user = factory(User::class)->create();
    }

    /** @test */
    public function it_gets_items()
    {
        $item = factory(Item::class)->create([
            'name' => 'My Test Item'
        ]);

        $response = $this->json('GET', '/api/items');

        $response
            ->assertStatus(200)
            ->assertJsonFragment([
                'name' => 'My Test Item'
            ]);
    }

    /** @test */
    public function it_creates_an_item()
    {
        $response = $this
            ->actingAs($this->user)
            ->json(
                'POST',
                '/api/items',
                [
                    'name' => 'My Test Item',
                ]
            );

        $response
            ->assertStatus(201)
            ->assertJsonFragment([
                'name' => 'My Test Item'
            ]);
    }

    /** @test */
    public function it_updates_an_item()
    {
        $item = factory(Item::class)->create();

        $response = $this
            ->actingAs($this->user)
            ->json(
                'PUT',
                '/api/items/' . $item->uuid,
                [
                    'name' => 'My Updated Test Item'
                ]
            );

        $response
            ->assertStatus(200)
            ->assertJsonFragment([
                'name' => 'My Updated Test Item'
            ]);
    }
}
