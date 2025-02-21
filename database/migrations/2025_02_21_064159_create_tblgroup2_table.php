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
        Schema::create('tblgroup2', function (Blueprint $table) {
            $table->id('group2id'); // Primary Key
            $table->string('group1Code'); // Foreign key reference (not enforced yet)
            $table->string('group2Code')->unique();
            $table->string('group2Name');
            $table->string('empNumber')->nullable();
            $table->timestamps(); // Adds created_at & updated_at

            // If group1Code references tblgroup1, you can uncomment this line
            // $table->foreign('group1Code')->references('group1Code')->on('tblgroup1')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tblgroup2');
    }
};
