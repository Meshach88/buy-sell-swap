<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['city_id', 'name', 'areas', 'fee_kobo', 'eta_label', 'is_active'])]
class DeliveryZone extends Model
{
    protected function casts(): array
    {
        return ['areas' => 'array', 'is_active' => 'boolean'];
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }
}
