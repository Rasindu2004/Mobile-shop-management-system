<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\DealerRequestController;
use App\Http\Controllers\DashboardController; 
use App\Models\Product;
use App\Models\Order;
use App\Models\Contact;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'products' => Product::latest()->take(8)->get(),
    ]);
})->name('home');

Route::get('/shop', function () {
    return Inertia::render('Shop', [
        'products' => Product::all()
    ]);
})->name('shop');

Route::get('/about', fn() => Inertia::render('About'))->name('about');
Route::get('/blogs', fn() => Inertia::render('Blogs'))->name('blogs');
Route::get('/contact', fn() => Inertia::render('Contact'))->name('contact');
Route::get('/cart', fn() => Inertia::render('Cart'))->name('cart');
Route::get('/thank-you', fn() => Inertia::render('ThankYou', ['order' => session('order')]))->name('thank.you');

Route::get('/blog/{slug}', function ($slug) {
    return Inertia::render('Blog/Show', ['slug' => $slug]);
})->name('blog.show');

Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
Route::post('/checkout/store', [OrderController::class, 'store'])->name('checkout.store');

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {
    
    // --- Dashboard ---
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // --- Profile Management ---
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // --- Checkout & Special Requests ---
    Route::get('/checkout', function () {
        return Inertia::render('Checkout'); 
    })->name('checkout');

    Route::post('/request-dealer', [DealerRequestController::class, 'sendRequest'])->name('dealer.request');

    // --- Products Management ---
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::get('/products/{id}/edit', [ProductController::class, 'edit'])->name('products.edit'); 
    Route::match(['post', 'put'], '/products/{id}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{id}', [ProductController::class, 'destroy'])->name('products.destroy');

    // --- Orders & Contacts Admin ---
    Route::get('/admin/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::patch('/orders/{id}/status', [OrderController::class, 'updateStatus'])->name('orders.updateStatus');
    Route::delete('/orders/{id}', [OrderController::class, 'destroy'])->name('orders.destroy');
    
    Route::delete('/contact/{id}', [ContactController::class, 'destroy'])->name('contact.destroy');
}); 
Route::get('/admin/download-users-pdf', [DashboardController::class, 'downloadUsersPdf'])->name('users.pdf.download');

require __DIR__.'/auth.php';