<?php

namespace App\Enums;

enum SellerOrderStatus: string
{
    case New = 'new';
    case Accepted = 'accepted';
    case Packed = 'packed';
    case WithRider = 'with_rider';
    case Delivered = 'delivered';
    case Cancelled = 'cancelled';
}
