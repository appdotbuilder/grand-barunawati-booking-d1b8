<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookingRequest;
use App\Http\Requests\UpdateBookingRequest;
use App\Models\Booking;
use App\Models\Facility;
use App\Models\Vendor;
use Inertia\Inertia;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        
        if ($user->isAdmin()) {
            $bookings = Booking::with(['user', 'facility'])
                ->latest()
                ->paginate(15);
        } else {
            $bookings = $user->bookings()
                ->with('facility')
                ->latest()
                ->paginate(15);
        }
        
        return Inertia::render('bookings/index', [
            'bookings' => $bookings
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $facilities = Facility::active()->get();
        $vendors = Vendor::active()->get();
        
        return Inertia::render('bookings/create', [
            'facilities' => $facilities,
            'vendors' => $vendors
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookingRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();
        
        // Calculate pricing
        $facility = Facility::findOrFail($data['facility_id']);
        $facilityPrice = $data['time_slot'] === 'morning' 
            ? $facility->morning_price 
            : $facility->evening_price;
        
        $vendorTotal = 0;
        if (!empty($data['selected_vendors'])) {
            foreach ($data['selected_vendors'] as $vendorSelection) {
                $vendorTotal += $vendorSelection['total_price'] ?? 0;
            }
        }
        
        $data['facility_price'] = $facilityPrice;
        $data['vendor_total'] = $vendorTotal;
        $data['total_amount'] = $facilityPrice + $vendorTotal;
        $data['payment_instructions'] = 'Please transfer the total amount to Bank BCA Account: 1234567890, Account Name: Grand Barunawati. Please include your booking ID in the transfer description.';

        $booking = Booking::create($data);

        return redirect()->route('bookings.show', $booking)
            ->with('success', 'Booking created successfully. Please proceed with payment.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        $booking->load(['user', 'facility']);
        
        // Check authorization
        if (!auth()->user()->isAdmin() && $booking->user_id !== auth()->id()) {
            abort(403);
        }
        
        return Inertia::render('bookings/show', [
            'booking' => $booking
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Booking $booking)
    {
        // Only allow editing for admins or booking owner if status is pending
        if (!auth()->user()->isAdmin() && ($booking->user_id !== auth()->id() || $booking->status !== 'pending')) {
            abort(403);
        }
        
        $facilities = Facility::active()->get();
        $vendors = Vendor::active()->get();
        
        return Inertia::render('bookings/edit', [
            'booking' => $booking,
            'facilities' => $facilities,
            'vendors' => $vendors
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookingRequest $request, Booking $booking)
    {
        // Check authorization
        if (!auth()->user()->isAdmin() && ($booking->user_id !== auth()->id() || $booking->status !== 'pending')) {
            abort(403);
        }
        
        $booking->update($request->validated());

        return redirect()->route('bookings.show', $booking)
            ->with('success', 'Booking updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        // Check authorization
        if (!auth()->user()->isAdmin() && ($booking->user_id !== auth()->id() || $booking->status !== 'pending')) {
            abort(403);
        }
        
        $booking->delete();

        return redirect()->route('bookings.index')
            ->with('success', 'Booking cancelled successfully.');
    }
}