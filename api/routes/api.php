<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\HealthController;
use App\Http\Controllers\Api\ListingController;
use App\Http\Controllers\Api\ProductModelController;
use App\Http\Controllers\Api\Seller\ListingController as SellerListingController;
use App\Http\Controllers\Api\SellerStorefrontController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/health', HealthController::class);

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('otp/verify', [AuthController::class, 'verifyOtp']);
    Route::post('otp/resend', [AuthController::class, 'resendOtp'])->middleware('throttle:5,1');
    Route::post('login', [AuthController::class, 'login'])->middleware('throttle:10,1');
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});

// Catalogue and listings: browsing is public, city/condition/price-filtered search included.
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/product-models', [ProductModelController::class, 'index']);
Route::get('/product-models/{productModel:slug}', [ProductModelController::class, 'show']);
Route::get('/listings', [ListingController::class, 'index']);
Route::get('/listings/{listing}', [ListingController::class, 'show']);
Route::get('/sellers/{sellerProfile:slug}', [SellerStorefrontController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', fn (Request $request) => new UserResource($request->user()->load('sellerProfile')));

    Route::middleware('role:seller')->prefix('seller')->group(function () {
        Route::get('/listings', [SellerListingController::class, 'index']);
        Route::post('/listings', [SellerListingController::class, 'store']);
        Route::patch('/listings/{listing}', [SellerListingController::class, 'update']);
        Route::post('/listings/{listing}/publish', [SellerListingController::class, 'publish']);
        Route::post('/listings/{listing}/images', [SellerListingController::class, 'storeImages']);
        Route::delete('/listings/{listing}', [SellerListingController::class, 'destroy']);
    });
});
