<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'facility_id' => 'required|exists:facilities,id',
            'booking_date' => 'required|date|after_or_equal:today',
            'time_slot' => 'required|in:morning,evening',
            'event_name' => 'required|string|max:255',
            'event_description' => 'nullable|string',
            'expected_guests' => 'required|integer|min:1',
            'selected_vendors' => 'nullable|array',
            'selected_vendors.*.vendor_id' => 'required|exists:vendors,id',
            'selected_vendors.*.selected_services' => 'required|array',
            'selected_vendors.*.total_price' => 'required|numeric|min:0',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'facility_id.required' => 'Please select a facility.',
            'facility_id.exists' => 'Selected facility is not available.',
            'booking_date.required' => 'Booking date is required.',
            'booking_date.after_or_equal' => 'Booking date cannot be in the past.',
            'time_slot.required' => 'Please select a time slot.',
            'time_slot.in' => 'Please select either morning or evening slot.',
            'event_name.required' => 'Event name is required.',
            'expected_guests.required' => 'Expected number of guests is required.',
            'expected_guests.min' => 'Expected guests must be at least 1.',
        ];
    }
}