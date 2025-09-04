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
        Schema::create('vendors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->string('service_type'); // catering, decoration, photography, etc.
            $table->json('portfolio')->nullable()->comment('Array of portfolio image paths');
            $table->string('contact_person');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->text('address')->nullable();
            $table->json('services')->nullable()->comment('Array of services with pricing');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->index('service_type');
            $table->index('is_active');
            $table->index('name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vendors');
    }
};