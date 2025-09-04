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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('facility_id')->constrained()->onDelete('cascade');
            $table->date('booking_date');
            $table->enum('time_slot', ['morning', 'evening']);
            $table->string('event_name');
            $table->text('event_description')->nullable();
            $table->integer('expected_guests');
            $table->decimal('facility_price', 10, 2);
            $table->decimal('vendor_total', 10, 2)->default(0);
            $table->decimal('total_amount', 10, 2);
            $table->json('selected_vendors')->nullable()->comment('Array of selected vendor IDs with services');
            $table->enum('status', ['pending', 'confirmed', 'cancelled'])->default('pending');
            $table->enum('payment_status', ['pending', 'paid', 'refunded'])->default('pending');
            $table->text('payment_instructions')->nullable();
            $table->text('admin_notes')->nullable();
            $table->timestamps();
            
            $table->index(['facility_id', 'booking_date', 'time_slot']);
            $table->index(['user_id', 'status']);
            $table->index('booking_date');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};