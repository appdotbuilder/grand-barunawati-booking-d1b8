<?php

namespace Database\Factories;

use App\Models\Facility;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TimeSlot>
 */
class TimeSlotFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'facility_id' => Facility::factory(),
            'date' => fake()->dateTimeBetween('now', '+6 months'),
            'morning_available' => fake()->boolean(80),
            'evening_available' => fake()->boolean(80),
            'notes' => fake()->optional()->sentence(),
        ];
    }

    /**
     * Indicate that both slots are unavailable.
     */
    public function unavailable(): static
    {
        return $this->state(fn (array $attributes) => [
            'morning_available' => false,
            'evening_available' => false,
            'notes' => 'Facility maintenance scheduled',
        ]);
    }

    /**
     * Indicate that only morning slot is available.
     */
    public function morningOnly(): static
    {
        return $this->state(fn (array $attributes) => [
            'morning_available' => true,
            'evening_available' => false,
            'notes' => 'Evening slot booked',
        ]);
    }

    /**
     * Indicate that only evening slot is available.
     */
    public function eveningOnly(): static
    {
        return $this->state(fn (array $attributes) => [
            'morning_available' => false,
            'evening_available' => true,
            'notes' => 'Morning slot booked',
        ]);
    }
}