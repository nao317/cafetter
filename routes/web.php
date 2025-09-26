<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/auth', function () {
    return Inertia::render('auth/index');
})->name('auth');

Route::get('/dashboard', function () {
    return Inertia::render('dashboard');
})->name('dashboard');

Route::get('/test', function () {
    return Inertia::render('test');
})->name('test');

Route::get('/simple', function () {
    return 'Hello World - Simple Laravel Route';
});

Route::get('/supabase-test', function () {
    return Inertia::render('supabase-test');
})->name('supabase-test');
