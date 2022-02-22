<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


/**
 * Products
 */

Route::get('/products', [ProductController::class, 'index'])
    ->middleware('auth:sanctum')
    ->name('products.index');

Route::post('/products', [ProductController::class, 'store'])
    ->middleware('auth:sanctum')
    ->name('products.store');

Route::get('/products/{id}', [ProductController::class, 'show'])
    ->middleware('auth:sanctum')
    ->name('products.show');

Route::put('/products/{id}', [ProductController::class, 'update'])
    ->middleware('auth:sanctum')
    ->name('products.update');

Route::delete('/products/{id}', [ProductController::class, 'destroy'])
    ->middleware('auth:sanctum')
    ->name('products.destroy');
