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
            ALTER TABLE `list_item`
            ADD CONSTRAINT `fk_category_id`
                FOREIGN KEY (`category_id`)
                REFERENCES `category` (`id`)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION
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
