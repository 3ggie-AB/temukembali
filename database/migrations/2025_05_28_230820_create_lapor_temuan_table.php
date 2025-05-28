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
        Schema::create('lapor_temuan', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_whatsapp');
            $table->text('deskripsi');
            $table->string('provinsi_temuan');
            $table->string('kota_temuan');
            $table->dateTime('tanggal_temuan');
            $table->string('barang_1')->nullable();
            $table->string('barang_2')->nullable();
            $table->string('barang_3')->nullable();
            $table->integer('jumlah_dilihat')->default(0);
            $table->timestamps();

            $table->foreign('user_whatsapp')->references('whatsapp')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lapor_temuan');
    }
};
