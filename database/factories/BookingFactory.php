<?php

namespace Database\Factories;

use App\Models\Facility;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $facilityPrice = fake()->randomFloat(2, 500000, 2000000);
        $vendorTotal = fake()->randomFloat(2, 0, 5000000);
        $totalAmount = $facilityPrice + $vendorTotal;

        return [
            'user_id' => User::factory(),
            'facility_id' => Facility::factory(),
            'booking_date' => fake()->dateTimeBetween('now', '+3 months'),
            'time_slot' => fake()->randomElement(['morning', 'evening']),
            'event_name' => fake()->randomElement([
                'Wedding Reception',
                'Birthday Party',
                'Corporate Meeting',
                'Conference',
                'Family Gathering',
                'Graduation Party'
            ]),
            'event_description' => fake()->optional()->paragraph(),
            'expected_guests' => fake()->numberBetween(50, 300),
            'facility_price' => $facilityPrice,
            'vendor_total' => $vendorTotal,
            'total_amount' => $totalAmount,
            'selected_vendors' => [],
            'status' => fake()->randomElement(['pending', 'confirmed', 'cancelled']),
            'payment_status' => fake()->randomElement(['pending', 'paid', 'refunded']),
            'payment_instructions' => 'Please transfer to Bank BCA Account: 1234567890, Account Name: Grand Barunawati',
            'admin_notes' => fake()->optional()->sentence(),
        ];
    }

    /**
     * Indicate that the booking is confirmed.
     */
    public function confirmed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'confirmed',
            'payment_status' => 'paid',
        ]);
    }

    /**
     * Indicate that the booking is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'payment_status' => 'pending',
        ]);
    }

    /**
     * Indicate that the booking is cancelled.
     */
    public function cancelled(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'cancelled',
            'payment_status' => 'refunded',
        ]);
    }
}