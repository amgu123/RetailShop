<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/','Admin\UserController@Showuser');
Route::get('myvehical/{id}','Admin\UserController@Showvehical');
Route::get('editvehical/{id}','Admin\UserController@Showeditvehical');
Route::post('myupdatevehical','Admin\UserController@updatevehical');


