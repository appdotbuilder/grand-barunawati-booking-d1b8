<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Facility>
 */
class FacilityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement([
                'Grand Ballroom',
                'Crystal Hall',
                'Garden Pavilion',
                'Barunawati Conference Room',
                'Sky Lounge',
                'Emerald Meeting Room'
            ]),
            'description' => fake()->paragraph(3),
            'features' => fake()->randomElements([
                'Air Conditioning',
                'Projector',
                'Sound System',
                'Stage',
                'Dance Floor',
                'Kitchen Access',
                'Parking',
                'Garden View',
                'WiFi',
                'Microphones'
            ], fake()->numberBetween(3, 6)),
            'capacity' => fake()->numberBetween(50, 500),
            'morning_price' => fake()->randomFloat(2, 500000, 2000000),
            'evening_price' => fake()->randomFloat(2, 750000, 3000000),
            'images' => [],
            'is_active' => fake()->boolean(90),
        ];
    }

    /**
     * Indicate that the facility is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }

    /**
     * Indicate that the facility is premium.
     */
    public function premium(): static
    {
        return $this->state(fn (array $attributes) => [
            'capacity' => fake()->numberBetween(300, 500),
            'morning_price' => fake()->randomFloat(2, 1500000, 3000000),
            'evening_price' => fake()->randomFloat(2, 2000000, 4000000),
            'features' => [
                'Air Conditioning',
                'Projector',
                'Sound System',
                'Stage',
                'Dance Floor',
                'Kitchen Access',
                'Parking',
                'Garden View',
                'WiFi',
                'Microphones',
                'LED Lighting',
                'VIP Room'
            ],
        ]);
    }
}