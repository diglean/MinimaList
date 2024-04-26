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
        DB::unprepared(
            <<<SQL
            INSERT INTO `category` (`nome`, `active`) VALUES
            ('Not Defined', 'yes'),
            ('Cleaning', 'yes'),
            ('Groceries', 'yes'),
            ('Household', 'yes'),
            ('Personal Care', 'yes'),
            ('Beverages', 'yes'),
            ('Canned Goods', 'yes'),
            ('Frozen', 'yes'),
            ('Pantry', 'yes'),
            ('Vegetables', 'yes'),
            ('Fruits', 'yes'),
            ('Meat', 'yes'),
            ('Dairy', 'yes'),
            ('Drinks', 'yes'),
            ('Snacks', 'yes'),
            ('Cereals', 'yes'),
            ('Other', 'yes');
            SQL,
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
