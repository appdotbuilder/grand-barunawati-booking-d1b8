import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Facility {
    id: number;
    name: string;
    description: string;
    features: string[];
    capacity: number;
    morning_price: number;
    evening_price: number;
    images: string[];
}

interface Props {
    facilities: {
        data: Facility[];
        [key: string]: unknown;
    };
    [key: string]: unknown;
}

export default function FacilitiesIndex({ facilities }: Props) {
    return (
        <AppShell>
            <Head title="Facilities - The Grand Barunawati" />
            
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🏢 Our Facilities</h1>
                        <p className="text-gray-600 mt-2">
                            Discover our premium venues perfect for your special events
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {facilities.data.map((facility) => (
                        <div key={facility.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-4xl mb-2">🏛️</div>
                                    <p className="text-sm text-gray-600">Facility Image</p>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{facility.name}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {facility.description}
                                </p>
                                
                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center text-sm">
                                        <span className="text-gray-500">👥 Capacity:</span>
                                        <span className="ml-2 font-medium">{facility.capacity} guests</span>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-500">🌅 Morning:</span>
                                            <div className="font-semibold text-amber-600">
                                                Rp {facility.morning_price.toLocaleString('id-ID')}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">🌆 Evening:</span>
                                            <div className="font-semibold text-amber-600">
                                                Rp {facility.evening_price.toLocaleString('id-ID')}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {facility.features && facility.features.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {facility.features.slice(0, 3).map((feature, index) => (
                                                <span 
                                                    key={index}
                                                    className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                            {facility.features.length > 3 && (
                                                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                                                    +{facility.features.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex space-x-2">
                                    <Link href={`/facilities/${facility.id}`} className="flex-1">
                                        <Button variant="outline" size="sm" className="w-full">
                                            View Details
                                        </Button>
                                    </Link>
                                    <Link href={`/bookings/create?facility=${facility.id}`} className="flex-1">
                                        <Button size="sm" className="w-full bg-amber-600 hover:bg-amber-700">
                                            Book Now
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {facilities.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🏢</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Facilities Available</h3>
                        <p className="text-gray-500">
                            Our facilities are currently being updated. Please check back soon!
                        </p>
                    </div>
                )}
            </div>
        </AppShell>
    );
}