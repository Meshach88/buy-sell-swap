<?php

return [
    'currency' => 'NGN',

    // Slug of the city the marketplace launches in.
    'default_city' => 'kaduna',

    'otp' => [
        'length' => 6,
        'ttl_minutes' => 10,
        'max_attempts' => 5,
    ],

    // Optional first admin created by `php artisan db:seed` (skipped when the phone is not set).
    'seed_admin' => [
        'name' => env('SEED_ADMIN_NAME', 'Admin'),
        'phone' => env('SEED_ADMIN_PHONE'),
        'password' => env('SEED_ADMIN_PASSWORD'),
    ],
];
