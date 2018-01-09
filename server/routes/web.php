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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/prueba', function () {
    return 'Esto viene desde laravel via GET';
});

Route::post('/usuario', 'UsersController@login');
Route::get('/getCategorias', 'CatalogosController@categoriasArticulos');
Route::post('/articulo', 'CatalogosController@guardaArticulo');
