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
        Schema::create('tblgroup1', function (Blueprint $table) {
            $table->id('group1id'); // Primary Key
            $table->string('group1Code')->unique();
            $table->string('group1Name');
            $table->string('empNumber')->nullable();
            $table->timestamps(); // Adds created_at & updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tblgroup1');
    }
};

