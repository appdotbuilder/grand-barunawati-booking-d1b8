<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vendor>
 */
class VendorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $serviceType = fake()->randomElement([
            'catering',
            'decoration',
            'photography',
            'entertainment',
            'florist',
            'transportation'
        ]);

        return [
            'name' => fake()->company(),
            'description' => fake()->paragraph(2),
            'service_type' => $serviceType,
            'portfolio' => [],
            'contact_person' => fake()->name(),
            'phone' => fake()->phoneNumber(),
            'email' => fake()->companyEmail(),
            'address' => fake()->address(),
            'services' => $this->generateServices($serviceType),
            'is_active' => fake()->boolean(85),
        ];
    }

    /**
     * Generate services based on service type.
     *
     * @param string $serviceType
     * @return array
     */
    protected function generateServices(string $serviceType): array
    {
        switch ($serviceType) {
            case 'catering':
                return [
                    ['name' => 'Buffet Package A', 'price' => fake()->randomFloat(2, 50000, 150000), 'description' => 'Basic buffet for 50 people'],
                    ['name' => 'Buffet Package B', 'price' => fake()->randomFloat(2, 100000, 200000), 'description' => 'Premium buffet for 50 people'],
                    ['name' => 'Snack Box', 'price' => fake()->randomFloat(2, 25000, 50000), 'description' => 'Per person snack box'],
                ];
            case 'decoration':
                return [
                    ['name' => 'Basic Decoration', 'price' => fake()->randomFloat(2, 1000000, 3000000), 'description' => 'Simple stage and table decoration'],
                    ['name' => 'Premium Decoration', 'price' => fake()->randomFloat(2, 3000000, 6000000), 'description' => 'Full venue decoration with flowers'],
                    ['name' => 'Wedding Package', 'price' => fake()->randomFloat(2, 5000000, 10000000), 'description' => 'Complete wedding decoration'],
                ];
            case 'photography':
                return [
                    ['name' => 'Event Photography', 'price' => fake()->randomFloat(2, 1000000, 2500000), 'description' => '4 hour event coverage'],
                    ['name' => 'Photo + Video Package', 'price' => fake()->randomFloat(2, 2500000, 5000000), 'description' => 'Complete documentation package'],
                ];
            case 'entertainment':
                return [
                    ['name' => 'Acoustic Performance', 'price' => fake()->randomFloat(2, 1500000, 3000000), 'description' => '2 hour acoustic music performance'],
                    ['name' => 'DJ Service', 'price' => fake()->randomFloat(2, 2000000, 4000000), 'description' => 'DJ for entire event duration'],
                ];
            case 'florist':
                return [
                    ['name' => 'Table Centerpieces', 'price' => fake()->randomFloat(2, 150000, 300000), 'description' => 'Fresh flowers for 10 tables'],
                    ['name' => 'Bridal Bouquet', 'price' => fake()->randomFloat(2, 500000, 1000000), 'description' => 'Custom bridal bouquet'],
                ];
            case 'transportation':
                return [
                    ['name' => 'Wedding Car', 'price' => fake()->randomFloat(2, 1000000, 2000000), 'description' => 'Decorated car for bride and groom'],
                    ['name' => 'Guest Shuttle', 'price' => fake()->randomFloat(2, 2000000, 4000000), 'description' => 'Bus service for guests'],
                ];
            default:
                return [];
        }
    }

    /**
     * Indicate that the vendor is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }

    /**
     * Indicate that the vendor provides catering services.
     */
    public function catering(): static
    {
        return $this->state(fn (array $attributes) => [
            'service_type' => 'catering',
            'services' => $this->generateServices('catering'),
        ]);
    }

    /**
     * Indicate that the vendor provides decoration services.
     */
    public function decoration(): static
    {
        return $this->state(fn (array $attributes) => [
            'service_type' => 'decoration',
            'services' => $this->generateServices('decoration'),
        ]);
    }
}