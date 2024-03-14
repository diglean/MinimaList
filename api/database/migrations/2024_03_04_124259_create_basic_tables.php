<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared(
            <<<SQL
            CREATE TABLE `list_items` (
                `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
                `list_id` SMALLINT UNSIGNED NOT NULL, 
                `items` JSON NOT NULL,
                `comment` VARCHAR(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                `created_at` DATETIME NOT NULL,
                `updated_at` DATETIME NOT NULL,
                PRIMARY KEY (`id`));
            SQL,
        );

        DB::unprepared(
            <<<SQL
            CREATE TABLE `list` (
                `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
                `name` VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                `items_id` SMALLINT UNSIGNED NULL,
                `items_qty` SMALLINT NULL DEFAULT 0,
                `customer_id` SMALLINT UNSIGNED NOT NULL DEFAULT 1,
                `created_at` DATETIME NOT NULL,
                `updated_at` DATETIME NOT NULL,
                PRIMARY KEY (`id`),
                INDEX `items_id_idx` (`items_id` ASC),
                CONSTRAINT `fk_item_list1`
                    FOREIGN KEY (`items_id`)
                    REFERENCES `list_items` (`id`)
                    ON DELETE NO ACTION
                    ON UPDATE NO ACTION
            );
            SQL,
        );

        // DB::unprepared(
        //     <<<SQL
        //     ALTER TABLE `list_item`
        //     CREATE INDEX `list_id_idx` (`list_id` ASC),
        //     CONSTRAINT `fk_list1`
        //     FOREIGN KEY (`list`)
        //     REFERENCES `list` (`id`)
        //     ON DELETE NO ACTION
        //     ON UPDATE NO ACTION
        //     SQL,
        // );

        // TODO - CRIAR INDEX E FK
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared(
            <<<SQL
            DROP TABLE IF EXISTS `list`;
            SQL,
        );

        DB::unprepared(
            <<<SQL
            DROP TABLE IF EXISTS `list_items`;
            SQL,
        );
    }
};
