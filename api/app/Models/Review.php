<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * A buyer's review of a completed order item. Read-only for now: there's no
 * flow yet that creates these (that needs a confirmed order, which is Phase 2),
 * so the `reviews` table is genuinely empty until then.
 */
#[Fillable(['order_item_id', 'buyer_id', 'seller_profile_id', 'listing_id', 'rating', 'tags', 'body', 'is_visible'])]
class Review extends Model
{
    protected function casts(): array
    {
        return ['tags' => 'array', 'is_visible' => 'boolean'];
    }

    public function buyer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function seller(): BelongsTo
    {
        return $this->belongsTo(SellerProfile::class, 'seller_profile_id');
    }

    public function listing(): BelongsTo
    {
        return $this->belongsTo(Listing::class);
    }

    /** "Hauwa B." — first name plus last initial, never the buyer's full name. */
    public function buyerDisplayName(): string
    {
        $parts = preg_split('/\s+/', trim($this->buyer->name));
        $first = array_shift($parts);
        $lastInitial = $parts ? mb_strtoupper(mb_substr(array_pop($parts), 0, 1)).'.' : '';

        return trim("{$first} {$lastInitial}");
    }
}
