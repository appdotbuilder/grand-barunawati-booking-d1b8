<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFacilityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()?->isAdmin() ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'features' => 'nullable|array',
            'capacity' => 'required|integer|min:1',
            'morning_price' => 'required|numeric|min:0',
            'evening_price' => 'required|numeric|min:0',
            'images' => 'nullable|array',
            'is_active' => 'boolean',
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
            'name.required' => 'Facility name is required.',
            'description.required' => 'Facility description is required.',
            'capacity.required' => 'Facility capacity is required.',
            'capacity.min' => 'Capacity must be at least 1 person.',
            'morning_price.required' => 'Morning price is required.',
            'evening_price.required' => 'Evening price is required.',
        ];
    }
}