<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    // 1. Admin Dashboard data showing
    public function index()
    {
        return Inertia::render('Dashboard', [
            'orders'   => Order::latest()->get(),
            'products' => Product::latest()->get(),
            'contacts' => Contact::latest()->get(),
        ]);
    }

    // 2. new Order creation
    public function store(Request $request)
    {
        // Validation 
        $validated = $request->validate([
            'name' => 'required|string',
            'phone' => 'required|string',
            'address' => 'required|string',
            'total_amount' => 'required|numeric',
            'items' => 'required|array',
        ]);

        // Database saving
        $order = Order::create([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'address' => $validated['address'],
            'total_amount' => $validated['total_amount'],
            'items' => $validated['items'],
            'email' => $request->email ?? 'customer@royalmobiles.com',
            'status' => 'pending',
            'payment_status' => 'unpaid',
            'payment_method' => 'Cash on Delivery', 
        ]);

        // RM-00001 format order id generation
        $formattedOrderId = 'RM' . str_pad($order->id, 5, '0', STR_PAD_LEFT);

        return Inertia::render('ThankYou', [
            'order' => [
                'order_id'       => $formattedOrderId,
                'customer'       => $order->name,
                'phone'          => $order->phone,
                'address'        => $order->address,
                'total'          => number_format($order->total_amount, 2),
                'payment_method' => $order->payment_method,
                'items'          => $order->items
            ]
        ]);
    }

    // 3. Order Status updating
    public function updateStatus(Request $request, $id)
    {
        $request->validate(['status' => 'required|string']);
        $order = Order::findOrFail($id);
        $order->update(['status' => $request->status]);
        
        return redirect()->back()->with('success', 'Order status updated!');
    }

    // 4. Order deleteing
    public function destroy($id)
    {
        Order::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Order deleted!');
    }
}