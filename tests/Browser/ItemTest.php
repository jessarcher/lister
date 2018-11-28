<?php

namespace Tests\Browser;

use App\User;
use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class ItemTest extends DuskTestCase
{
    use DatabaseMigrations;

    public function testItAddsAnItem()
    {
        $user = factory(User::class)->create([
            'email' => 'jess@jessarcher.com',
        ]);

        $this->browse(function (Browser $browser) use ($user) {
            $browser->loginAs($user)
                    ->visit('/home')
                    ->waitForText('My List')
                    ->type('@add-new-item-input', 'My first item')
                    ->keys('@add-new-item-input', ['{enter}'])
                    ->waitFor('@item')
                    ->assertInputValue('@add-new-item-input', '')
                    ->assertInputValue('@item-input', 'My first item');
        });
    }
}
