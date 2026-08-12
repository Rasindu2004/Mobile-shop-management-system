<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    // Dashboard Product data showing
    public function index()
    {
        return Inertia::render('Dashboard', [
            'products' => Product::latest()->get()
        ]);
    }

    // Edit Product form showing
    public function edit($id)
    {
        $product = Product::findOrFail($id);
        return Inertia::render('Edit', [
            'product' => $product
        ]);
    }

    // new Product creation
    public function store(Request $request)
    {
        $request->validate([
            'name'           => 'required|string|max:255',
            'brand'          => 'required|string',
            'description'    => 'nullable|string',
            'price'          => 'required|numeric',
            'category'       => 'required|string',
            'image'          => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'stock'          => 'nullable|integer',
            'storage_prices' => 'required', 
        ]);

        $imagePath = $request->file('image')->store('products', 'public');

        // Formatting storage prices
        $storagePrices = is_string($request->storage_prices) 
            ? json_decode($request->storage_prices, true) 
            : $request->storage_prices;

        Product::create([
            'name'           => $request->name,
            'brand'          => $request->brand,
            'description'    => $request->description,
            'price'          => $request->price,
            'category'       => $request->category,
            'image'          => $imagePath,
            'stock'          => $request->stock ?? 0,
            'storage_prices' => $storagePrices, 
        ]);

        return redirect()->route('dashboard')->with('success', 'Product added successfully!');
    }

    // Product update 
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        // Validation
        $request->validate([
            'name'           => 'required|string|max:255',
            'brand'          => 'required|string',
            'price'          => 'required|numeric',
            'category'       => 'required|string',
            'image'          => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'storage_prices' => 'required',
        ]);

        // 1. Image handling
        $imagePath = $product->image; // default to existing image
        if ($request->hasFile('image')) {
                       if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $imagePath = $request->file('image')->store('products', 'public');
        }

        // 2. Storage prices array handling
        $storagePrices = is_string($request->storage_prices) 
            ? json_decode($request->storage_prices, true) 
            : $request->storage_prices;

        // 3. Database update
        $product->update([
            'name'           => $request->name,
            'brand'          => $request->brand,
            'price'          => $request->price,
            'category'       => $request->category,
            'image'          => $imagePath,
            'storage_prices' => $storagePrices,
            'stock'          => $request->stock ?? $product->stock,
        ]);

        // success after going back to dashboard
        return redirect()->route('dashboard')->with('success', 'Product updated successfully!');
    }

    // Product delete
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }
        $product->delete();
        return redirect()->back()->with('success', 'Product deleted!');
    }
}