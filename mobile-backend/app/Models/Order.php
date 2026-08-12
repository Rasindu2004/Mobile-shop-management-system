<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    /**
     * Database columns that can be mass assigned.
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'items',
        'total_amount',
        'payment_method',
        'payment_status',
        'card_last4',
        'status',
    ];

    /**
     * Data Casting 
     */
    protected $casts = [
        'items' => 'array',
        'total_amount' => 'decimal:2',
    ];

    /**
     * Default Attributes .
     */
    protected $attributes = [
        'status' => 'pending',
        'payment_status' => 'unpaid',
        'payment_method' => 'cash',
    ];

    
    public function getTotalItemsAttribute()
    {
        return is_array($this->items) ? count($this->items) : 0;
    }
    public function items()
    {

        return $this->hasMany(OrderItem::class); 
    }
    public function user() {
    return $this->belongsTo(User::class);
}
}