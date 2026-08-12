<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CustomerMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // logged in user role check 
        if (Auth::check() && (Auth::user()->role === 'customer' || Auth::user()->role === 'dealer')) {
            return $next($request);
        }

        // set flash message and redirect to home
        return redirect('/')->with('error', 'Access Denied. you are not authorized to access this page.');
    }
}