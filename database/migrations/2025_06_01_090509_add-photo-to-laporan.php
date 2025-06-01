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
        Schema::table('lapor_temuan', function (Blueprint $table) {
            $table->string('photo')->nullable();
        });
        Schema::table('lapor_hilang', function (Blueprint $table) {
            $table->string('photo')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lapor_temuan', function (Blueprint $table) {
            $table->dropColumn('photo');
        });
        Schema::table('lapor_hilang', function (Blueprint $table) {
            $table->dropColumn('photo');
        });
    }
};
