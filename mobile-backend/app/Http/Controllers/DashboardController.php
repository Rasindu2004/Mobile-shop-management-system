<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf; 

class DashboardController extends Controller
{
   public function index()
{
    // customer cannot access the dashboard
    if (auth()->user()->role === 'customer') {
        return redirect()->route('checkout');
    }

    return Inertia::render('Dashboard', [
        'users'    => \App\Models\User::select('id', 'name', 'email', 'role', 'created_at')->latest()->get(),
        'products' => \App\Models\Product::latest()->get(),
        'orders'   => \App\Models\Order::latest()->get(), 
        'contacts' => \App\Models\Contact::latest()->get(),
        'contacts' => \App\Models\Contact::latest()->get(),
    ]);
}


public function downloadUsersPdf()
{
    $users = \App\Models\User::select('id', 'name', 'email', 'role', 'created_at')->get();
    
  
    $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.users_report', compact('users'));
    
    return $pdf->download('users-report.pdf');
}
}