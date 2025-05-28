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
        Schema::create('lapor_hilang', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_whatsapp');
            $table->text('deskripsi');
            $table->string('provinsi_hilang');
            $table->string('kota_hilang');
            $table->dateTime('tanggal_hilang');
            $table->string('barang_kategori')->nullable();
            $table->string('barang_warna')->nullable();
            $table->string('barang_merk')->nullable();
            $table->text('barang_cirikhusus')->nullable();
            $table->string('status')->default('hilang');
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
        Schema::dropIfExists('lapor_hilang');
    }
};
