<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            
            // Customer Details
            $table->string('name'); 
            $table->string('email');
            $table->string('phone');
            $table->text('address');
            
            // Order Details
            $table->json('items'); 
            $table->decimal('total_amount', 15, 2); 
            
            // Payment Info
            $table->string('payment_method')->default('cash'); // 'cash' or 'card'
            $table->string('payment_status')->default('unpaid'); // unpaid, paid
            $table->string('card_last4')->nullable(); 
            
            // Order Status
            // pending, processing, shipped, delivered, cancelled
            $table->string('status')->default('pending'); 
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};