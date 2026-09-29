<?php

namespace Tests\Feature\Catalog;

use App\Models\Category;
use App\Models\City;
use App\Models\Listing;
use App\Models\ProductModel;
use App\Models\SellerProfile;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ListingSearchTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(RoleSeeder::class); // Listing::factory() chains through a seller user
    }

    public function test_only_live_in_stock_listings_are_returned(): void
    {
        Listing::factory()->live()->create(['title' => 'Live phone', 'quantity' => 2]);
        Listing::factory()->create(['title' => 'Draft phone', 'status' => 'draft']);
        Listing::factory()->live()->create(['title' => 'Sold out phone', 'quantity' => 0]);

        $response = $this->getJson('/api/listings')->assertOk();

        $titles = collect($response->json('data'))->pluck('title');
        $this->assertContains('Live phone', $titles);
        $this->assertNotContains('Draft phone', $titles);
        $this->assertNotContains('Sold out phone', $titles);
    }

    public function test_search_matches_the_title(): void
    {
        Listing::factory()->live()->create(['title' => 'iPhone 12 128GB Graphite']);
        Listing::factory()->live()->create(['title' => 'Galaxy A14']);

        $response = $this->getJson('/api/listings?q=iPhone')->assertOk();

        $this->assertCount(1, $response->json('data'));
        $this->assertSame('iPhone 12 128GB Graphite', $response->json('data.0.title'));
    }

    public function test_filters_by_category_condition_and_price(): void
    {
        $phones = Category::factory()->create(['slug' => 'phones']);
        $laptops = Category::factory()->create(['slug' => 'laptops']);
        $phoneModel = ProductModel::factory()->create(['category_id' => $phones->id]);
        $laptopModel = ProductModel::factory()->create(['category_id' => $laptops->id]);

        Listing::factory()->live()->create([
            'product_model_id' => $phoneModel->id, 'condition' => 'brand_new', 'price_kobo' => 300_000_00,
        ]);
        Listing::factory()->live()->create([
            'product_model_id' => $laptopModel->id, 'condition' => 'ng_used', 'price_kobo' => 900_000_00,
        ]);

        $this->getJson("/api/listings?category_id={$phones->id}")->assertOk()->assertJsonCount(1, 'data');
        $this->getJson('/api/listings?condition=ng_used')->assertOk()->assertJsonCount(1, 'data');
        $this->getJson('/api/listings?min_price_kobo=50000000')->assertOk()->assertJsonCount(1, 'data');
    }

    public function test_verified_filter_only_returns_verified_sellers_listings(): void
    {
        $verifiedSeller = SellerProfile::factory()->verified()->create();
        Listing::factory()->live()->create(['seller_profile_id' => $verifiedSeller->id]);
        Listing::factory()->live()->create(); // unverified seller

        $this->getJson('/api/listings?verified=1')->assertOk()->assertJsonCount(1, 'data');
    }

    public function test_show_returns_404_for_a_non_live_listing(): void
    {
        $listing = Listing::factory()->create(['status' => 'draft']);

        $this->getJson("/api/listings/{$listing->id}")->assertNotFound();
    }

    public function test_show_returns_a_live_listing_with_seller_and_images(): void
    {
        $listing = Listing::factory()->live()->create();

        $this->getJson("/api/listings/{$listing->id}")
            ->assertOk()
            ->assertJsonPath('data.id', $listing->id)
            ->assertJsonStructure(['data' => ['seller', 'product_model', 'images', 'price_label']]);
    }

    public function test_storefront_filters_out_unrelated_sellers_listings(): void
    {
        $city = City::factory()->create();
        $listing = Listing::factory()->live()->create(['city_id' => $city->id]);
        Listing::factory()->live()->create(); // another seller

        $this->getJson("/api/sellers/{$listing->seller->slug}")
            ->assertOk()
            ->assertJsonCount(1, 'listings.data')
            ->assertJsonPath('seller.slug', $listing->seller->slug);
    }
}
