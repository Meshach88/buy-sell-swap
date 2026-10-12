<?php

namespace App\Http\Resources;

use App\Models\SellerOrder;
use App\Support\Money;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin SellerOrder */
class SellerOrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'order_id' => $this->order_id,
            'status' => $this->status->value,
            'status_label' => $this->status->label(),
            'next_status' => $this->status->next()?->value,
            'escrow_status' => $this->escrow_status->value,
            'escrow_status_label' => $this->escrow_status->label(),
            'subtotal_kobo' => $this->subtotal_kobo,
            'subtotal_label' => Money::format($this->subtotal_kobo),
            'handover_code' => $this->handover_code,
            'accepted_at' => $this->accepted_at?->toIso8601String(),
            'packed_at' => $this->packed_at?->toIso8601String(),
            'handed_over_at' => $this->handed_over_at?->toIso8601String(),
            'delivered_at' => $this->delivered_at?->toIso8601String(),
            'buyer_confirmed_at' => $this->buyer_confirmed_at?->toIso8601String(),
            'released_at' => $this->released_at?->toIso8601String(),
            'seller' => $this->whenLoaded('seller', fn () => new SellerSummaryResource($this->seller)),
            'items' => $this->whenLoaded('items', fn () => OrderItemResource::collection($this->items)),
            'order_number' => $this->whenLoaded('order', fn () => $this->order->number),
        ];
    }
}
