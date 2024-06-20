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
            CREATE TABLE `config` (
                `id` SMALLINT UNSIGNED NOT NULL,
                `theme` ENUM('day_light', 'night', 'void') NOT NULL DEFAULT 'void',
                `language` ENUM('en_us', 'es_es', 'pt_br') NOT NULL DEFAULT 'en_us',
                `currency` ENUM('USD', 'EUR', 'BRL') NOT NULL DEFAULT 'USD',
                INDEX `fk_config_user1_idx` (`id` ASC) VISIBLE,
                CONSTRAINT `fk_config_user1`
                    FOREIGN KEY (`id`)
                    REFERENCES `user` (`id`)
                    ON DELETE NO ACTION
                    ON UPDATE NO ACTION
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
            DROP TABLE IF EXISTS `config`;
            SQL,
        );
    }
};
