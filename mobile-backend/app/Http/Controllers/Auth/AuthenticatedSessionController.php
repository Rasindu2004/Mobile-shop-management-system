<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
{
    $request->authenticate();
    $request->session()->regenerate();

    $user = auth()->user();

    // 1. Admin direct to admin dashboard
    if ($user->role === 'admin') {
        return redirect()->route('dashboard'); 
    }

    // 2. Dealer deirect to dealer dashboard
    if ($user->role === 'dealer') {
        return redirect()->route('dashboard');
    }

    // 3. Customer direct to checkout page
    if ($user->role === 'customer') {
    return redirect()->route('checkout');
    }

    // user role can't be determined, redirect to a default page
    return redirect()->intended(route('welcome'));
}

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
