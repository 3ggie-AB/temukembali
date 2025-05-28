<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('komentar_hilang', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_hilang');
            $table->unsignedBigInteger('user_whatsapp');
            $table->text('komentar');
            $table->timestamps();

            $table->foreign('id_hilang')->references('id')->on('lapor_hilang')->onDelete('cascade');
            $table->foreign('user_whatsapp')->references('whatsapp')->on('users')->onDelete('cascade');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('komentar_hilang');
    }
};
