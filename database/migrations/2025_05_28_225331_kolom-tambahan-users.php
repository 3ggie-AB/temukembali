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
            $table->string('email')->nullable()->change();
            $table->unsignedBigInteger('whatsapp')->nullable()->unique()->after('email');
            $table->text('alamat')->nullable()->after('whatsapp');
            $table->string('photo')->nullable()->after('alamat');
            $table->string('provinsi')->nullable()->after('photo');
            $table->string('kota')->nullable()->after('provinsi');
            $table->string('is_verified')->nullable()->after('kota');
            $table->enum('role', ['admin', 'user'])->default('user')->after('is_verified');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
