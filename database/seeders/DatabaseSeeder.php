<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\Facility;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@grandbarunawati.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Create regular users
        $users = User::factory(10)->create();

        // Create facilities
        $facilities = [
            [
                'name' => 'Grand Ballroom',
                'description' => 'Our flagship venue featuring a spacious ballroom with crystal chandeliers, marble floors, and elegant décor. Perfect for weddings, galas, and large corporate events.',
                'features' => ['Air Conditioning', 'Sound System', 'Stage', 'Dance Floor', 'Kitchen Access', 'Parking', 'WiFi', 'LED Lighting'],
                'capacity' => 500,
                'morning_price' => 2500000,
                'evening_price' => 3500000,
                'images' => [],
                'is_active' => true,
            ],
            [
                'name' => 'Crystal Hall',
                'description' => 'An intimate venue with modern amenities and floor-to-ceiling windows offering garden views. Ideal for medium-sized celebrations and corporate meetings.',
                'features' => ['Air Conditioning', 'Projector', 'Sound System', 'Garden View', 'Parking', 'WiFi', 'Microphones'],
                'capacity' => 200,
                'morning_price' => 1500000,
                'evening_price' => 2200000,
                'images' => [],
                'is_active' => true,
            ],
            [
                'name' => 'Garden Pavilion',
                'description' => 'A beautiful outdoor venue surrounded by lush gardens, perfect for garden parties, outdoor weddings, and casual events.',
                'features' => ['Garden Setting', 'Gazebo', 'Outdoor Seating', 'Sound System', 'String Lights', 'Parking'],
                'capacity' => 150,
                'morning_price' => 1200000,
                'evening_price' => 1800000,
                'images' => [],
                'is_active' => true,
            ],
            [
                'name' => 'Barunawati Conference Room',
                'description' => 'A professional meeting space equipped with the latest technology for presentations, conferences, and corporate training sessions.',
                'features' => ['Air Conditioning', 'Projector', 'Whiteboard', 'WiFi', 'Conference Table', 'Microphones'],
                'capacity' => 50,
                'morning_price' => 800000,
                'evening_price' => 1000000,
                'images' => [],
                'is_active' => true,
            ],
            [
                'name' => 'Sky Lounge',
                'description' => 'An elegant rooftop venue with panoramic city views, perfect for cocktail parties, product launches, and VIP events.',
                'features' => ['City View', 'Bar Setup', 'Lounge Seating', 'Sound System', 'WiFi', 'VIP Access'],
                'capacity' => 80,
                'morning_price' => 1800000,
                'evening_price' => 2500000,
                'images' => [],
                'is_active' => true,
            ],
        ];

        foreach ($facilities as $facilityData) {
            Facility::create($facilityData);
        }

        // Create vendors
        $vendors = [
            [
                'name' => 'Royal Catering Services',
                'description' => 'Premium catering service specializing in Indonesian and international cuisine for all types of events.',
                'service_type' => 'catering',
                'portfolio' => [],
                'contact_person' => 'Chef Ahmad Rizki',
                'phone' => '+62 21 5555 0001',
                'email' => 'info@royalcatering.com',
                'address' => 'Jl. Sudirman No. 123, Jakarta',
                'services' => [
                    ['name' => 'Indonesian Buffet Package', 'price' => 85000, 'description' => 'Traditional Indonesian dishes buffet per person'],
                    ['name' => 'International Buffet Package', 'price' => 125000, 'description' => 'Western and Asian fusion buffet per person'],
                    ['name' => 'Premium Wedding Package', 'price' => 185000, 'description' => 'Complete wedding banquet per person'],
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Elegant Decorations',
                'description' => 'Professional event decoration service creating beautiful and memorable event atmospheres.',
                'service_type' => 'decoration',
                'portfolio' => [],
                'contact_person' => 'Sari Wijaya',
                'phone' => '+62 21 5555 0002',
                'email' => 'contact@elegantdeco.com',
                'address' => 'Jl. Kemang Raya No. 45, Jakarta',
                'services' => [
                    ['name' => 'Basic Event Decoration', 'price' => 2500000, 'description' => 'Simple and elegant decoration package'],
                    ['name' => 'Premium Wedding Decoration', 'price' => 6500000, 'description' => 'Complete wedding decoration with flowers and draping'],
                    ['name' => 'Corporate Event Decoration', 'price' => 3500000, 'description' => 'Professional corporate event styling'],
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Capture Moments Photography',
                'description' => 'Professional photography and videography services specializing in wedding and corporate events.',
                'service_type' => 'photography',
                'portfolio' => [],
                'contact_person' => 'Budi Santoso',
                'phone' => '+62 21 5555 0003',
                'email' => 'hello@capturemoments.com',
                'address' => 'Jl. Senayan No. 78, Jakarta',
                'services' => [
                    ['name' => 'Event Photography', 'price' => 2000000, 'description' => '6-hour event coverage with edited photos'],
                    ['name' => 'Wedding Photo & Video', 'price' => 4500000, 'description' => 'Complete wedding documentation package'],
                    ['name' => 'Corporate Event Documentation', 'price' => 1800000, 'description' => 'Professional corporate event coverage'],
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Harmony Entertainment',
                'description' => 'Professional entertainment services including acoustic performances, DJ services, and live bands.',
                'service_type' => 'entertainment',
                'portfolio' => [],
                'contact_person' => 'Maya Indira',
                'phone' => '+62 21 5555 0004',
                'email' => 'bookings@harmonyent.com',
                'address' => 'Jl. Melawai No. 12, Jakarta',
                'services' => [
                    ['name' => 'Acoustic Duo Performance', 'price' => 2200000, 'description' => '3-hour acoustic music performance'],
                    ['name' => 'Professional DJ Service', 'price' => 3000000, 'description' => 'Full event DJ service with sound system'],
                    ['name' => 'Live Band Performance', 'price' => 4500000, 'description' => '5-piece band for 4-hour performance'],
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Bloom Florist',
                'description' => 'Expert floral arrangements and decorations using fresh flowers for all special occasions.',
                'service_type' => 'florist',
                'portfolio' => [],
                'contact_person' => 'Rina Flowers',
                'phone' => '+62 21 5555 0005',
                'email' => 'orders@bloomflorist.com',
                'address' => 'Jl. Pondok Indah No. 56, Jakarta',
                'services' => [
                    ['name' => 'Bridal Bouquet & Boutonniere', 'price' => 750000, 'description' => 'Custom bridal flowers package'],
                    ['name' => 'Table Centerpieces (10 tables)', 'price' => 2000000, 'description' => 'Fresh flower centerpieces for 10 tables'],
                    ['name' => 'Ceremony Arch Decoration', 'price' => 3500000, 'description' => 'Beautiful floral arch for ceremony'],
                ],
                'is_active' => true,
            ],
            [
                'name' => 'VIP Transportation',
                'description' => 'Luxury transportation services for weddings and special events with professional drivers.',
                'service_type' => 'transportation',
                'portfolio' => [],
                'contact_person' => 'Dedi Transport',
                'phone' => '+62 21 5555 0006',
                'email' => 'reservations@viptrans.com',
                'address' => 'Jl. Gatot Subroto No. 89, Jakarta',
                'services' => [
                    ['name' => 'Luxury Wedding Car', 'price' => 1500000, 'description' => 'Decorated luxury car for bride and groom'],
                    ['name' => 'Guest Shuttle Service', 'price' => 3500000, 'description' => 'Bus transportation for 40 guests'],
                    ['name' => 'Executive Car Service', 'price' => 800000, 'description' => 'VIP transportation for special guests'],
                ],
                'is_active' => true,
            ],
        ];

        foreach ($vendors as $vendorData) {
            Vendor::create($vendorData);
        }

        // Create some sample bookings
        $facilities = Facility::all();
        $allUsers = $users->merge(collect([$admin]));
        
        foreach ($allUsers->random(5) as $user) {
            Booking::factory()->create([
                'user_id' => $user->id,
                'facility_id' => $facilities->random()->id,
            ]);
        }
    }
}