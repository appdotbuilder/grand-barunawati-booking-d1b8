import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface SharedData {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
    };
    [key: string]: unknown;
}

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;
    const isAdmin = user.role === 'admin';

    return (
        <AppShell>
            <Head title="Dashboard - The Grand Barunawati" />
            
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {isAdmin ? '👨‍💼 Admin Dashboard' : '🏠 Welcome Back'}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Hello {user.name}! {isAdmin 
                            ? 'Manage facilities, vendors, and bookings.'
                            : 'Plan your next event at The Grand Barunawati.'
                        }
                    </p>
                </div>

                {isAdmin ? (
                    // Admin Dashboard
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Manage Bookings */}
                        <Link href="/admin/bookings" className="group">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 hover:shadow-lg transition-all group-hover:from-blue-100 group-hover:to-blue-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-3xl">📋</div>
                                    <div className="text-sm text-blue-600 font-medium">Manage</div>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Bookings</h3>
                                <p className="text-gray-600 text-sm">
                                    View and manage all customer bookings, update payment status, and handle confirmations.
                                </p>
                            </div>
                        </Link>

                        {/* Manage Facilities */}
                        <Link href="/admin/facilities" className="group">
                            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-6 hover:shadow-lg transition-all group-hover:from-amber-100 group-hover:to-amber-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-3xl">🏢</div>
                                    <div className="text-sm text-amber-600 font-medium">Manage</div>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Facilities</h3>
                                <p className="text-gray-600 text-sm">
                                    Add, edit, and manage venue facilities, pricing, and availability.
                                </p>
                            </div>
                        </Link>

                        {/* Manage Vendors */}
                        <Link href="/admin/vendors" className="group">
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 hover:shadow-lg transition-all group-hover:from-green-100 group-hover:to-green-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-3xl">🤝</div>
                                    <div className="text-sm text-green-600 font-medium">Manage</div>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Vendors</h3>
                                <p className="text-gray-600 text-sm">
                                    Manage vendor partnerships, services, and pricing information.
                                </p>
                            </div>
                        </Link>

                        {/* Add New Facility */}
                        <Link href="/admin/facilities/create" className="group">
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 hover:shadow-lg transition-all group-hover:from-purple-100 group-hover:to-purple-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-3xl">➕</div>
                                    <div className="text-sm text-purple-600 font-medium">Create</div>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Add Facility</h3>
                                <p className="text-gray-600 text-sm">
                                    Create new venue facilities with detailed information and pricing.
                                </p>
                            </div>
                        </Link>

                        {/* Add New Vendor */}
                        <Link href="/admin/vendors/create" className="group">
                            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-6 hover:shadow-lg transition-all group-hover:from-pink-100 group-hover:to-pink-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-3xl">🆕</div>
                                    <div className="text-sm text-pink-600 font-medium">Create</div>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Add Vendor</h3>
                                <p className="text-gray-600 text-sm">
                                    Register new vendor partners and their service offerings.
                                </p>
                            </div>
                        </Link>

                        {/* Quick Stats */}
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-3xl">📊</div>
                                <div className="text-sm text-gray-600 font-medium">Overview</div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Stats</h3>
                            <p className="text-gray-600 text-sm">
                                View platform statistics and performance metrics.
                            </p>
                        </div>
                    </div>
                ) : (
                    // User Dashboard
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Browse Facilities */}
                        <Link href="/facilities" className="group">
                            <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-lg p-6 hover:shadow-lg transition-all group-hover:from-amber-100 group-hover:to-orange-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-3xl">🏢</div>
                                    <div className="text-sm text-amber-600 font-medium">Browse</div>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Facilities</h3>
                                <p className="text-gray-600 text-sm">
                                    Explore our premium venues perfect for your special events.
                                </p>
                            </div>
                        </Link>

                        {/* Browse Vendors */}
                        <Link href="/vendors" className="group">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 hover:shadow-lg transition-all group-hover:from-blue-100 group-hover:to-blue-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-3xl">🤝</div>
                                    <div className="text-sm text-blue-600 font-medium">Discover</div>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Trusted Vendors</h3>
                                <p className="text-gray-600 text-sm">
                                    Browse our network of professional vendors for your event needs.
                                </p>
                            </div>
                        </Link>

                        {/* Create Booking */}
                        <Link href="/bookings/create" className="group">
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 hover:shadow-lg transition-all group-hover:from-green-100 group-hover:to-green-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-3xl">📝</div>
                                    <div className="text-sm text-green-600 font-medium">Book Now</div>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">New Booking</h3>
                                <p className="text-gray-600 text-sm">
                                    Start planning your event with a new facility booking.
                                </p>
                            </div>
                        </Link>

                        {/* My Bookings */}
                        <Link href="/bookings" className="group">
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 hover:shadow-lg transition-all group-hover:from-purple-100 group-hover:to-purple-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-3xl">📋</div>
                                    <div className="text-sm text-purple-600 font-medium">View</div>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">My Bookings</h3>
                                <p className="text-gray-600 text-sm">
                                    Track your current and past event bookings.
                                </p>
                            </div>
                        </Link>

                        {/* Help & Support */}
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-3xl">❓</div>
                                <div className="text-sm text-gray-600 font-medium">Support</div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
                            <p className="text-gray-600 text-sm mb-3">
                                Get assistance with bookings or venue information.
                            </p>
                            <Button variant="outline" size="sm">
                                Contact Us
                            </Button>
                        </div>

                        {/* Quick Tips */}
                        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-3xl">💡</div>
                                <div className="text-sm text-yellow-600 font-medium">Tips</div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Planning Tips</h3>
                            <ul className="text-gray-600 text-sm space-y-1">
                                <li>• Book early for popular dates</li>
                                <li>• Compare vendor packages</li>
                                <li>• Consider guest capacity</li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Recent Activity or Welcome Message */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        {isAdmin ? '📈 Recent Activity' : '🎉 Ready to Plan Your Next Event?'}
                    </h2>
                    
                    {isAdmin ? (
                        <div className="text-gray-600">
                            <p className="mb-4">Monitor recent platform activity and bookings.</p>
                            <div className="flex space-x-4">
                                <Button variant="outline" size="sm">View All Bookings</Button>
                                <Button variant="outline" size="sm">Generate Reports</Button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-600">
                            <p className="mb-4">
                                The Grand Barunawati offers premium facilities and trusted vendor partnerships 
                                to make your special events unforgettable. Start by browsing our available venues 
                                and create your perfect event package.
                            </p>
                            <div className="flex space-x-4">
                                <Link href="/facilities">
                                    <Button className="bg-amber-600 hover:bg-amber-700">
                                        Browse Facilities
                                    </Button>
                                </Link>
                                <Link href="/bookings/create">
                                    <Button variant="outline">
                                        Start Booking
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}