<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $booking = $this->route('booking');
        $user = auth()->user();
        
        return $user?->isAdmin() || 
               ($booking && $booking->user_id === $user?->id && $booking->status === 'pending');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'event_name' => 'required|string|max:255',
            'event_description' => 'nullable|string',
            'expected_guests' => 'required|integer|min:1',
        ];
        
        // Admin can update status and payment status
        if (auth()->user()?->isAdmin()) {
            $rules['status'] = 'required|in:pending,confirmed,cancelled';
            $rules['payment_status'] = 'required|in:pending,paid,refunded';
            $rules['admin_notes'] = 'nullable|string';
        }
        
        return $rules;
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'event_name.required' => 'Event name is required.',
            'expected_guests.required' => 'Expected number of guests is required.',
            'expected_guests.min' => 'Expected guests must be at least 1.',
            'status.in' => 'Please select a valid status.',
            'payment_status.in' => 'Please select a valid payment status.',
        ];
    }
}