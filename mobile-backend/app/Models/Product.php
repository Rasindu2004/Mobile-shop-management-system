<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * Database එකට එකවර ඇතුළත් කළ හැකි Column ලැයිස්තුව.
     */
    protected $fillable = [
        'name', 
        'brand', 
        'description', 
        'price', 
        'category', 
        'image', 
        'stock', 
        'storage_prices'
    ];

    /**
     * දත්ත වර්ගය ස්වයංක්‍රීයව වෙනස් කිරීම (Casting).
     * මෙහිදී storage_prices column එක Database එකේ JSON ලෙස තිබුණත්, 
     * PHP වලදී එය Array එකක් ලෙස වැඩ කිරීමට ඉඩ සලසයි.
     */
    protected $casts = [
        'storage_prices' => 'array',
        'price' => 'decimal:2',
        'stock' => 'integer',
    ];

    /**
     * Default අගයන් ලබා දීම.
     */
    protected $attributes = [
        'storage_prices' => '[]',
        'stock' => 0,
    ];

    
    public function getFormattedPriceAttribute()
    {
        return 'Rs. ' . number_format($this->price, 2);
    }
}