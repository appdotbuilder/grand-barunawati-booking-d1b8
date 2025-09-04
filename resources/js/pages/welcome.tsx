import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface SharedData {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        } | null;
    };
    [key: string]: unknown;
}

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    return (
        <>
            <Head title="Welcome to The Grand Barunawati" />
            <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
                {/* Navigation */}
                <nav className="px-6 py-4">
                    <div className="flex justify-between items-center max-w-7xl mx-auto">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">GB</span>
                            </div>
                            <span className="font-bold text-gray-900">The Grand Barunawati</span>
                        </div>
                        <div className="flex space-x-4">
                            {user ? (
                                <>
                                    <Link href="/dashboard">
                                        <Button variant="outline">Dashboard</Button>
                                    </Link>
                                    <Link href="/facilities">
                                        <Button>Browse Facilities</Button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button variant="outline">Login</Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button>Register</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            🏛️ The Grand Barunawati
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Your premier multipurpose venue for unforgettable events. From elegant weddings 
                            to corporate conferences, we provide exceptional facilities and trusted vendor partnerships.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Link href="/facilities">
                                <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                                    🏢 Browse Facilities
                                </Button>
                            </Link>
                            <Link href="/vendors">
                                <Button size="lg" variant="outline">
                                    🤝 View Vendors
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                            <div className="text-3xl mb-4">🏢</div>
                            <h3 className="text-lg font-semibold mb-2">Premium Facilities</h3>
                            <p className="text-gray-600 text-sm">
                                Multiple venues with various capacities, all equipped with modern amenities 
                                and elegant interiors.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                            <div className="text-3xl mb-4">📅</div>
                            <h3 className="text-lg font-semibold mb-2">Easy Booking</h3>
                            <p className="text-gray-600 text-sm">
                                Select your date, choose morning or evening slots, and book instantly 
                                with our user-friendly system.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                            <div className="text-3xl mb-4">🤝</div>
                            <h3 className="text-lg font-semibold mb-2">Trusted Vendors</h3>
                            <p className="text-gray-600 text-sm">
                                Access our network of pre-screened vendors for catering, decoration, 
                                photography, and more.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                            <div className="text-3xl mb-4">💰</div>
                            <h3 className="text-lg font-semibold mb-2">Transparent Pricing</h3>
                            <p className="text-gray-600 text-sm">
                                No hidden fees. View all costs upfront including facility and vendor 
                                pricing before you book.
                            </p>
                        </div>
                    </div>

                    {/* Services Section */}
                    <div className="bg-white rounded-xl p-8 shadow-lg mb-16">
                        <h2 className="text-3xl font-bold text-center mb-8">🎉 Perfect for Every Event</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">💒</span>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Weddings</h3>
                                <p className="text-gray-600 text-sm">
                                    Create your dream wedding with our elegant ballrooms and comprehensive vendor services.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🏢</span>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Corporate Events</h3>
                                <p className="text-gray-600 text-sm">
                                    Professional meeting rooms and conference halls with modern AV equipment.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🎂</span>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Celebrations</h3>
                                <p className="text-gray-600 text-sm">
                                    Birthday parties, graduations, and family gatherings in beautiful settings.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl p-8 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Event? 🎊</h2>
                        <p className="text-lg mb-6 opacity-90">
                            Join hundreds of satisfied customers who trust The Grand Barunawati for their special occasions.
                        </p>
                        <div className="flex justify-center space-x-4">
                            {user ? (
                                <Link href="/bookings/create">
                                    <Button size="lg" variant="secondary">
                                        📝 Start Booking Now
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/register">
                                        <Button size="lg" variant="secondary">
                                            🚀 Get Started
                                        </Button>
                                    </Link>
                                    <Link href="/login">
                                        <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-amber-600">
                                            Sign In
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-8 mt-16">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">GB</span>
                            </div>
                            <span className="font-bold">The Grand Barunawati</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            © 2024 The Grand Barunawati. Your premier venue for exceptional events.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}