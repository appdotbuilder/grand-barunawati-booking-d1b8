import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Facility {
    id: number;
    name: string;
}

interface Booking {
    id: number;
    user: User;
    facility: Facility;
    booking_date: string;
    time_slot: string;
    event_name: string;
    expected_guests: number;
    total_amount: number;
    status: string;
    payment_status: string;
    created_at: string;
}

interface Props {
    bookings: {
        data: Booking[];
        [key: string]: unknown;
    };
    [key: string]: unknown;
}

interface SharedData {
    auth: {
        user: {
            role: string;
        } | null;
    };
    [key: string]: unknown;
}

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
};

const paymentStatusColors = {
    pending: 'bg-orange-100 text-orange-800',
    paid: 'bg-green-100 text-green-800',
    refunded: 'bg-gray-100 text-gray-800'
};

const timeSlotEmojis = {
    morning: '🌅',
    evening: '🌆'
};

export default function BookingsIndex({ bookings }: Props) {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth.user?.role === 'admin';

    return (
        <AppShell>
            <Head title="Bookings - The Grand Barunawati" />
            
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            📋 {isAdmin ? 'All Bookings' : 'My Bookings'}
                        </h1>
                        <p className="text-gray-600 mt-2">
                            {isAdmin 
                                ? 'Manage all customer bookings and payments'
                                : 'Track your event bookings and payment status'
                            }
                        </p>
                    </div>
                    {!isAdmin && (
                        <Link href="/bookings/create">
                            <Button className="bg-amber-600 hover:bg-amber-700">
                                📝 New Booking
                            </Button>
                        </Link>
                    )}
                </div>

                {bookings.data.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📅</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {isAdmin ? 'No Bookings Yet' : 'No Bookings Found'}
                        </h3>
                        <p className="text-gray-500 mb-4">
                            {isAdmin 
                                ? 'Customer bookings will appear here when they make reservations.'
                                : 'You haven\'t made any bookings yet. Start planning your event!'
                            }
                        </p>
                        {!isAdmin && (
                            <Link href="/bookings/create">
                                <Button className="bg-amber-600 hover:bg-amber-700">
                                    Create Your First Booking
                                </Button>
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookings.data.map((booking) => (
                            <div key={booking.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-900">
                                                    {booking.event_name}
                                                </h3>
                                                <p className="text-gray-600">📍 {booking.facility.name}</p>
                                                {isAdmin && booking.user && (
                                                    <p className="text-sm text-gray-500">
                                                        👤 Customer: {booking.user.name} ({booking.user.email})
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex flex-col items-end space-y-2">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[booking.status as keyof typeof statusColors]}`}>
                                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                </span>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${paymentStatusColors[booking.payment_status as keyof typeof paymentStatusColors]}`}>
                                                    Payment: {booking.payment_status.charAt(0).toUpperCase() + booking.payment_status.slice(1)}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm">
                                            <div>
                                                <span className="text-gray-500">📅 Date:</span>
                                                <div className="font-medium">
                                                    {new Date(booking.booking_date).toLocaleDateString('id-ID', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">🕐 Time Slot:</span>
                                                <div className="font-medium">
                                                    {timeSlotEmojis[booking.time_slot as keyof typeof timeSlotEmojis]} {booking.time_slot.charAt(0).toUpperCase() + booking.time_slot.slice(1)}
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">👥 Guests:</span>
                                                <div className="font-medium">{booking.expected_guests} people</div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm text-gray-500">
                                                Booking ID: #{booking.id} • Created: {new Date(booking.created_at).toLocaleDateString('id-ID')}
                                            </div>
                                            <div className="text-lg font-bold text-amber-600">
                                                Rp {booking.total_amount.toLocaleString('id-ID')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
                                    <Link href={`/bookings/${booking.id}`}>
                                        <Button variant="outline" size="sm">
                                            View Details
                                        </Button>
                                    </Link>
                                    
                                    {((isAdmin) || (!isAdmin && booking.status === 'pending')) && (
                                        <Link href={`/bookings/${booking.id}/edit`}>
                                            <Button variant="outline" size="sm">
                                                {isAdmin ? 'Manage' : 'Edit'}
                                            </Button>
                                        </Link>
                                    )}
                                    
                                    {booking.status === 'pending' && booking.payment_status === 'pending' && (
                                        <Button 
                                            size="sm" 
                                            className="bg-green-600 hover:bg-green-700"
                                        >
                                            💰 Pay Now
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}