<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::patch('lists/{itemList}/items', 'ListItemController@updateMany');
Route::resource('lists/{itemList}/items', 'ListItemController');

Route::patch('lists', 'ListController@updateMany');
Route::resource('lists', 'ListController');

Route::patch('items', 'ItemController@updateMany');
Route::resource('items', 'ItemController');
