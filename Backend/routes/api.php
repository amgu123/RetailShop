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
Route::get('dashboard', 'Shops\ShopController@dashboard');
Route::post('insertShop', 'Shops\ShopController@insertShop');
Route::get('searchShop', 'Shops\ShopController@searchShop');

Route::get('/cache', function() {
    Artisan::call('cache:clear');
    return "Cache is cleared";
});

