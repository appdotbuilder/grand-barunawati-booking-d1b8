<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Booking
 *
 * @property int $id
 * @property int $user_id
 * @property int $facility_id
 * @property \Illuminate\Support\Carbon $booking_date
 * @property string $time_slot
 * @property string $event_name
 * @property string|null $event_description
 * @property int $expected_guests
 * @property float $facility_price
 * @property float $vendor_total
 * @property float $total_amount
 * @property array|null $selected_vendors
 * @property string $status
 * @property string $payment_status
 * @property string|null $payment_instructions
 * @property string|null $admin_notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \App\Models\Facility $facility
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Booking newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Booking newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Booking query()
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereAdminNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereBookingDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereEventDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereEventName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereExpectedGuests($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereFacilityId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereFacilityPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking wherePaymentInstructions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking wherePaymentStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereSelectedVendors($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereTimeSlot($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereTotalAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereVendorTotal($value)
 * @method static \Database\Factories\BookingFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Booking extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'facility_id',
        'booking_date',
        'time_slot',
        'event_name',
        'event_description',
        'expected_guests',
        'facility_price',
        'vendor_total',
        'total_amount',
        'selected_vendors',
        'status',
        'payment_status',
        'payment_instructions',
        'admin_notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'booking_date' => 'date',
        'facility_price' => 'decimal:2',
        'vendor_total' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'selected_vendors' => 'array',
        'expected_guests' => 'integer',
    ];

    /**
     * Get the user that made the booking.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the facility for the booking.
     */
    public function facility(): BelongsTo
    {
        return $this->belongsTo(Facility::class);
    }
}