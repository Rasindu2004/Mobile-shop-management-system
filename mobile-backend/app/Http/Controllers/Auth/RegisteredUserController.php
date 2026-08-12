<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Registration form showing
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * new user registration handling
     */
    public function store(Request $request): RedirectResponse
    {
        // 1. Validation - data validating
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|string|in:customer,dealer,admin', 
        ]);

        // 2. Database - new user creation
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        // 3. Register Event 
        event(new Registered($user));

        // 4. User login
        Auth::login($user);

        // 5. Role based Redirection
        
        // --- ADMIN ---
        if ($user->role === 'admin') {
            return redirect()->route('dashboard'); 
        }

        // --- DEALER ---
        if ($user->role === 'dealer') {
            return redirect()->route('dashboard');
        }

        // --- CUSTOMER ---
        if ($user->role === 'customer') {
    return redirect()->route('checkout');
        }

        // Default Redirect 
        return redirect()->intended(route('welcome', absolute: false));
    }
}