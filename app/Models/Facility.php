<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Facility
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string|null $features
 * @property int $capacity
 * @property float $morning_price
 * @property float $evening_price
 * @property array|null $images
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Booking> $bookings
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\TimeSlot> $timeSlots
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Facility newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Facility newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Facility query()
 * @method static \Illuminate\Database\Eloquent\Builder|Facility active()
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereCapacity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereEveningPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereFeatures($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereImages($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereMorningPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereUpdatedAt($value)
 * @method static \Database\Factories\FacilityFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Facility extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'features',
        'capacity',
        'morning_price',
        'evening_price',
        'images',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'images' => 'array',
        'features' => 'array',
        'morning_price' => 'decimal:2',
        'evening_price' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    /**
     * Get the bookings for the facility.
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Get the time slots for the facility.
     */
    public function timeSlots(): HasMany
    {
        return $this->hasMany(TimeSlot::class);
    }

    /**
     * Scope a query to only include active facilities.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}