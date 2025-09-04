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
        Schema::create('facilities', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->text('features')->nullable()->comment('JSON string of features like AC, projector, etc.');
            $table->integer('capacity');
            $table->decimal('morning_price', 10, 2)->default(0);
            $table->decimal('evening_price', 10, 2)->default(0);
            $table->json('images')->nullable()->comment('Array of image paths');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->index('is_active');
            $table->index('name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('facilities');
    }
};