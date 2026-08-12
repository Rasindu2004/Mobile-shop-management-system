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
        Schema::table('products', function (Blueprint $table) {
            if (!Schema::hasColumn('products', 'storage_prices')) {
                $table->json('storage_prices')->nullable()->after('price');
            }
            if (!Schema::hasColumn('products', 'stock')) {
                $table->integer('stock')->default(0)->after('storage_prices');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // Drop the columns if they exist
            $table->dropColumn(['storage_prices', 'stock']);
        });
    }
};