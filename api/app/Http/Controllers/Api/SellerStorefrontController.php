<?php

namespace App\Http\Controllers\Api;

use App\Enums\ListingStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\ListingResource;
use App\Http\Resources\StorefrontResource;
use App\Models\SellerProfile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SellerStorefrontController extends Controller
{
    public function show(Request $request, SellerProfile $sellerProfile): JsonResponse
    {
        abort_if($sellerProfile->suspended_at !== null, 404);

        $listings = $sellerProfile->listings()
            ->with(['images', 'productModel'])
            ->where('status', ListingStatus::Live->value)
            ->where('quantity', '>', 0)
            ->latest('published_at')
            ->paginate(20)
            ->withQueryString();

        // Route through the resource collection's own response() so pagination's
        // data/links/meta shape survives being nested under "listings" here.
        return response()->json([
            'seller' => new StorefrontResource($sellerProfile),
            'listings' => ListingResource::collection($listings)->response($request)->getData(true),
        ]);
    }
}
