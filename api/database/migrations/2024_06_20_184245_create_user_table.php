<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared(
            <<<SQL
            CREATE TABLE `user` (
                `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
                `name` VARCHAR(45) NOT NULL,
                `user_name` VARCHAR(45) NOT NULL,
                `email` VARCHAR(90) NOT NULL,
                `password` VARCHAR(297) NOT NULL,
                `profile_picture_hash` VARCHAR(32) NULL,
                PRIMARY KEY (`id`)
            );
            SQL,
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared(
            <<<SQL
            DROP TABLE IF EXISTS `user`;
            SQL,
        );
    }
};
