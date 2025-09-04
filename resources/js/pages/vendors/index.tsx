import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Service {
    name: string;
    price: number;
    description: string;
}

interface Vendor {
    id: number;
    name: string;
    description: string;
    service_type: string;
    portfolio: string[];
    contact_person: string;
    phone: string;
    email?: string;
    address?: string;
    services: Service[];
}

interface Props {
    vendors: {
        data: Vendor[];
        [key: string]: unknown;
    };
    [key: string]: unknown;
}

const serviceTypeEmojis: { [key: string]: string } = {
    catering: '🍽️',
    decoration: '🎨',
    photography: '📸',
    entertainment: '🎵',
    florist: '🌸',
    transportation: '🚗'
};

const serviceTypeLabels: { [key: string]: string } = {
    catering: 'Catering',
    decoration: 'Decoration',
    photography: 'Photography',
    entertainment: 'Entertainment',
    florist: 'Florist',
    transportation: 'Transportation'
};

export default function VendorsIndex({ vendors }: Props) {
    const [selectedServiceType, setSelectedServiceType] = useState<string>('all');
    
    const serviceTypes = ['all', ...Array.from(new Set(vendors.data.map(v => v.service_type)))];
    
    const filteredVendors = selectedServiceType === 'all' 
        ? vendors.data 
        : vendors.data.filter(vendor => vendor.service_type === selectedServiceType);

    return (
        <AppShell>
            <Head title="Vendors - The Grand Barunawati" />
            
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🤝 Our Trusted Vendors</h1>
                        <p className="text-gray-600 mt-2">
                            Pre-screened vendors to make your event perfect
                        </p>
                    </div>
                </div>

                {/* Service Type Filter */}
                <div className="flex flex-wrap gap-2">
                    {serviceTypes.map(type => (
                        <Button
                            key={type}
                            variant={selectedServiceType === type ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedServiceType(type)}
                            className={selectedServiceType === type ? "bg-amber-600 hover:bg-amber-700" : ""}
                        >
                            {type === 'all' ? '🏷️ All' : `${serviceTypeEmojis[type]} ${serviceTypeLabels[type]}`}
                        </Button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVendors.map((vendor) => (
                        <div key={vendor.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-4xl mb-2">
                                        {serviceTypeEmojis[vendor.service_type] || '🏢'}
                                    </div>
                                    <p className="text-sm text-gray-600">Vendor Portfolio</p>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-xl font-semibold">{vendor.name}</h3>
                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                        {serviceTypeLabels[vendor.service_type]}
                                    </span>
                                </div>
                                
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {vendor.description}
                                </p>
                                
                                <div className="space-y-2 mb-4 text-sm">
                                    <div className="flex items-center">
                                        <span className="text-gray-500">👤 Contact:</span>
                                        <span className="ml-2">{vendor.contact_person}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-gray-500">📞 Phone:</span>
                                        <span className="ml-2">{vendor.phone}</span>
                                    </div>
                                    {vendor.email && (
                                        <div className="flex items-center">
                                            <span className="text-gray-500">✉️ Email:</span>
                                            <span className="ml-2 text-blue-600">{vendor.email}</span>
                                        </div>
                                    )}
                                </div>
                                
                                {vendor.services && vendor.services.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Services Starting From:</h4>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <div className="text-sm">
                                                <div className="font-semibold text-green-600">
                                                    Rp {Math.min(...vendor.services.map(s => s.price)).toLocaleString('id-ID')}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {vendor.services.length} service{vendor.services.length > 1 ? 's' : ''} available
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                <Link href={`/vendors/${vendor.id}`}>
                                    <Button className="w-full bg-amber-600 hover:bg-amber-700">
                                        View Details & Services
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredVendors.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🤝</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {selectedServiceType === 'all' ? 'No Vendors Available' : `No ${serviceTypeLabels[selectedServiceType]} Vendors`}
                        </h3>
                        <p className="text-gray-500">
                            {selectedServiceType === 'all' 
                                ? 'Our vendor network is currently being updated. Please check back soon!'
                                : 'Try selecting a different service type or check back later.'
                            }
                        </p>
                        {selectedServiceType !== 'all' && (
                            <Button 
                                variant="outline" 
                                className="mt-4"
                                onClick={() => setSelectedServiceType('all')}
                            >
                                View All Vendors
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </AppShell>
    );
}