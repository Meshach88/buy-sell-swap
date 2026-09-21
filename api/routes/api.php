<?php

use App\Http\Controllers\Api\HealthController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/health', HealthController::class);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', fn (Request $request) => new UserResource($request->user()->load('sellerProfile')));
});
