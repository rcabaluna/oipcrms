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
        Schema::create('tblgroup3', function (Blueprint $table) {
            $table->id('group3id'); // Primary Key
            $table->string('group1Code'); // Foreign key reference (optional)
            $table->string('group2Code'); // Foreign key reference (optional)
            $table->string('group3Code')->unique();
            $table->string('group3Name');
            $table->string('empNumber')->nullable();
            $table->timestamps(); // Adds created_at & updated_at

            // If group1Code and group2Code reference tblgroup1 & tblgroup2, you can uncomment these lines:
            // $table->foreign('group1Code')->references('group1Code')->on('tblgroup1')->onDelete('cascade');
            // $table->foreign('group2Code')->references('group2Code')->on('tblgroup2')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tblgroup3');
    }
};
