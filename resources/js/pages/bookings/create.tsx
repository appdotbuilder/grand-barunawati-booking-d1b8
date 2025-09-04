import React, { useState, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
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
    service_type: string;
    services: Service[];
}

interface Facility {
    id: number;
    name: string;
    description: string;
    capacity: number;
    morning_price: number;
    evening_price: number;
    features: string[];
}

interface Props {
    facilities: Facility[];
    vendors: Vendor[];
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

export default function CreateBooking({ facilities, vendors }: Props) {
    const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
    const [selectedVendors, setSelectedVendors] = useState<{ [key: number]: { services: Service[], total: number } }>({});
    const [calculatedTotal, setCalculatedTotal] = useState<number>(0);

    const { data, setData, processing, errors } = useForm({
        facility_id: 0,
        booking_date: '',
        time_slot: 'morning',
        event_name: '',
        event_description: '',
        expected_guests: 50
    });

    useEffect(() => {
        if (data.facility_id) {
            const facility = facilities.find(f => f.id === data.facility_id);
            setSelectedFacility(facility || null);
        }
    }, [data.facility_id, facilities]);

    useEffect(() => {
        let facilityPrice = 0;
        if (selectedFacility) {
            facilityPrice = data.time_slot === 'morning' 
                ? selectedFacility.morning_price 
                : selectedFacility.evening_price;
        }

        const vendorTotal = Object.values(selectedVendors).reduce((sum, vendor) => sum + vendor.total, 0);
        setCalculatedTotal(facilityPrice + vendorTotal);
    }, [selectedFacility, data.time_slot, selectedVendors]);

    const handleVendorSelection = (vendor: Vendor, service: Service, selected: boolean) => {
        setSelectedVendors(prev => {
            const current = prev[vendor.id] || { services: [], total: 0 };
            
            if (selected) {
                const newServices = [...current.services, service];
                const newTotal = newServices.reduce((sum, s) => sum + s.price, 0);
                return {
                    ...prev,
                    [vendor.id]: { services: newServices, total: newTotal }
                };
            } else {
                const newServices = current.services.filter(s => s.name !== service.name);
                const newTotal = newServices.reduce((sum, s) => sum + s.price, 0);
                
                if (newServices.length === 0) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { [vendor.id]: _, ...rest } = prev;
                    return rest;
                }
                
                return {
                    ...prev,
                    [vendor.id]: { services: newServices, total: newTotal }
                };
            }
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const vendorSelections = Object.entries(selectedVendors).map(([vendorId, selection]) => ({
            vendor_id: parseInt(vendorId),
            selected_services: selection.services,
            total_price: selection.total
        }));

        // Submit using router.post with simplified vendor data
        router.post(route('bookings.store'), {
            ...data,
            selected_vendors: vendorSelections.map(v => ({
                vendor_id: v.vendor_id,
                selected_services: v.selected_services.map(s => ({
                    name: s.name,
                    price: s.price,
                    description: s.description
                })),
                total_price: v.total_price
            }))
        });
    };

    const minDate = new Date().toISOString().split('T')[0];

    return (
        <AppShell>
            <Head title="Create Booking - The Grand Barunawati" />
            
            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">📝 Create New Booking</h1>
                    <p className="text-gray-600 mt-2">
                        Book your event at The Grand Barunawati
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Event Details */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">🎉 Event Details</h2>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Event Name *
                                </label>
                                <input
                                    type="text"
                                    value={data.event_name}
                                    onChange={(e) => setData('event_name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    placeholder="e.g., Wedding Reception, Birthday Party"
                                    required
                                />
                                {errors.event_name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.event_name}</p>
                                )}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Expected Guests *
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={data.expected_guests}
                                    onChange={(e) => setData('expected_guests', parseInt(e.target.value) || 0)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    required
                                />
                                {errors.expected_guests && (
                                    <p className="text-red-500 text-sm mt-1">{errors.expected_guests}</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Event Description
                            </label>
                            <textarea
                                rows={3}
                                value={data.event_description}
                                onChange={(e) => setData('event_description', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                                placeholder="Tell us more about your event..."
                            />
                            {errors.event_description && (
                                <p className="text-red-500 text-sm mt-1">{errors.event_description}</p>
                            )}
                        </div>
                    </div>

                    {/* Facility Selection */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">🏢 Select Facility</h2>
                        
                        <div className="grid gap-4 mb-4">
                            {facilities.map((facility) => (
                                <div
                                    key={facility.id}
                                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                        data.facility_id === facility.id
                                            ? 'border-amber-500 bg-amber-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                    onClick={() => setData('facility_id', facility.id)}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-lg">{facility.name}</h3>
                                            <p className="text-gray-600 text-sm mb-2">{facility.description}</p>
                                            <p className="text-sm text-gray-500">👥 Capacity: {facility.capacity} guests</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm">
                                                <div className="text-gray-600">🌅 Morning: <span className="font-semibold text-amber-600">Rp {facility.morning_price.toLocaleString('id-ID')}</span></div>
                                                <div className="text-gray-600">🌆 Evening: <span className="font-semibold text-amber-600">Rp {facility.evening_price.toLocaleString('id-ID')}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {errors.facility_id && (
                            <p className="text-red-500 text-sm">{errors.facility_id}</p>
                        )}
                    </div>

                    {/* Date and Time Selection */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">📅 Date & Time</h2>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Booking Date *
                                </label>
                                <input
                                    type="date"
                                    min={minDate}
                                    value={data.booking_date}
                                    onChange={(e) => setData('booking_date', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    required
                                />
                                {errors.booking_date && (
                                    <p className="text-red-500 text-sm mt-1">{errors.booking_date}</p>
                                )}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Time Slot *
                                </label>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="time_slot"
                                            value="morning"
                                            checked={data.time_slot === 'morning'}
                                            onChange={(e) => setData('time_slot', e.target.value)}
                                            className="mr-2"
                                        />
                                        🌅 Morning (8:00 - 16:00)
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="time_slot"
                                            value="evening"
                                            checked={data.time_slot === 'evening'}
                                            onChange={(e) => setData('time_slot', e.target.value)}
                                            className="mr-2"
                                        />
                                        🌆 Evening (17:00 - 23:00)
                                    </label>
                                </div>
                                {errors.time_slot && (
                                    <p className="text-red-500 text-sm mt-1">{errors.time_slot}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Vendor Selection */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">🤝 Add Vendors (Optional)</h2>
                        
                        <div className="space-y-6">
                            {vendors.map((vendor) => (
                                <div key={vendor.id} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="font-semibold text-lg flex items-center">
                                                {serviceTypeEmojis[vendor.service_type]} {vendor.name}
                                            </h3>
                                            <span className="text-sm text-gray-500 capitalize">{vendor.service_type}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        {vendor.services.map((service) => (
                                            <label key={service.name} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedVendors[vendor.id]?.services.some(s => s.name === service.name) || false}
                                                        onChange={(e) => handleVendorSelection(vendor, service, e.target.checked)}
                                                        className="mr-3"
                                                    />
                                                    <div>
                                                        <div className="font-medium">{service.name}</div>
                                                        <div className="text-sm text-gray-500">{service.description}</div>
                                                    </div>
                                                </div>
                                                <div className="font-semibold text-green-600">
                                                    Rp {service.price.toLocaleString('id-ID')}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                    
                                    {selectedVendors[vendor.id] && (
                                        <div className="mt-3 p-2 bg-amber-50 rounded border">
                                            <div className="font-semibold text-amber-800">
                                                Selected Total: Rp {selectedVendors[vendor.id].total.toLocaleString('id-ID')}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Total Summary */}
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">💰 Booking Summary</h2>
                        
                        <div className="space-y-2">
                            {selectedFacility && (
                                <>
                                    <div className="flex justify-between">
                                        <span>🏢 Facility ({selectedFacility.name} - {data.time_slot})</span>
                                        <span className="font-semibold">
                                            Rp {(data.time_slot === 'morning' 
                                                ? selectedFacility.morning_price 
                                                : selectedFacility.evening_price
                                            ).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </>
                            )}
                            
                            {Object.entries(selectedVendors).map(([vendorId, selection]) => {
                                const vendor = vendors.find(v => v.id === parseInt(vendorId));
                                return vendor && (
                                    <div key={vendorId} className="flex justify-between">
                                        <span>🤝 {vendor.name}</span>
                                        <span className="font-semibold">Rp {selection.total.toLocaleString('id-ID')}</span>
                                    </div>
                                );
                            })}
                            
                            <div className="border-t pt-2 flex justify-between text-lg font-bold text-amber-800">
                                <span>Total Amount</span>
                                <span>Rp {calculatedTotal.toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.get(route('facilities.index'))}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={processing || !data.facility_id}
                            className="bg-amber-600 hover:bg-amber-700"
                        >
                            {processing ? 'Creating Booking...' : 'Create Booking'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppShell>
    );
}