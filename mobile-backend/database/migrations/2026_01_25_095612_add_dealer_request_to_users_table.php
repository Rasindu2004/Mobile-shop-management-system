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
    Schema::table('users', function (Blueprint $table) {
        
        $table->boolean('is_dealer_requested')->default(false)->after('role'); 
    });
}

public function down(): void
{
    Schema::table('users', function (Blueprint $table) {
        // Remove the 'is_dealer_requested' column if we roll back this migration
        $table->dropColumn('is_dealer_requested');
    });
}
};
