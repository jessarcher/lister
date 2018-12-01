<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lists', function (Blueprint $table) {
            $table->increments('id');
            $table->uuid('uuid');

            $table->text('name');

            $table->integer('order')->default(0);

            $table->unsignedInteger('created_by');
            $table->timestamp('created_at')->useCurrent();

            $table->unsignedInteger('updated_by');
            $table->timestamp('updated_at')->useCurrent();

            $table->unique('uuid');

            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lists');
    }
}
