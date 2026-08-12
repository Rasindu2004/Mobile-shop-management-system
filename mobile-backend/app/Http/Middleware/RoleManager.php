<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleManager
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        // 1. check if user is logged in
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        // 2. user role check & redirection
        if ($request->user()->role !== $role) {
            return redirect()->route('dashboard'); 
        }

        return $next($request);
    }
}