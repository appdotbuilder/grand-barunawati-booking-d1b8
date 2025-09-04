<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\TimeSlot
 *
 * @property int $id
 * @property int $facility_id
 * @property \Illuminate\Support\Carbon $date
 * @property bool $morning_available
 * @property bool $evening_available
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Facility $facility
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|TimeSlot newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TimeSlot newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TimeSlot query()
 * @method static \Illuminate\Database\Eloquent\Builder|TimeSlot whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TimeSlot whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TimeSlot whereEveningAvailable($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TimeSlot whereFacilityId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TimeSlot whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TimeSlot whereMorningAvailable($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TimeSlot whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TimeSlot whereUpdatedAt($value)
 * @method static \Database\Factories\TimeSlotFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class TimeSlot extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'facility_id',
        'date',
        'morning_available',
        'evening_available',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date' => 'date',
        'morning_available' => 'boolean',
        'evening_available' => 'boolean',
    ];

    /**
     * Get the facility for the time slot.
     */
    public function facility(): BelongsTo
    {
        return $this->belongsTo(Facility::class);
    }
}