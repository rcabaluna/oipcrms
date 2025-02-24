<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('tblusers', function (Blueprint $table) {
            $table->id('userid');
            $table->string('lastname', 100);
            $table->string('firstname', 100);
            $table->string('middlename', 100)->nullable();
            $table->string('extension', 10)->nullable();
            $table->string('group1code', 50);
            $table->string('group2code', 50);
            $table->string('group3code', 50);
            $table->string('position', 100);
            $table->tinyInteger('is_active')->default(1);
            $table->tinyInteger('is_head')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tblusers');
    }
};
