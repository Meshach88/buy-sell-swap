# BuySellSwap

Gadget marketplace for Kaduna, Nigeria (a SMARTiFy company). Buyers pay through the platform and the money is held until delivery is confirmed.

| Folder | What |
| --- | --- |
| `api/` | Laravel 13 REST API (Sanctum tokens, spatie roles, MySQL) |
| `web/` | React + Vite mobile-first web app (JavaScript), built on the BuySellSwap design system |
| `design/` | Design canvas source (66 screens) |
| `deploy/` | Nginx, Supervisor and deploy script for the Namecheap VPS |

## Run it locally

Needs PHP 8.4, Composer, Node 24 and MySQL 8.

```sh
# API
cd api
composer install
cp .env.example .env && php artisan key:generate   # then set DB_PASSWORD in .env
mysql -uroot -p -e "CREATE DATABASE buysellswap CHARACTER SET utf8mb4; CREATE DATABASE buysellswap_test CHARACTER SET utf8mb4;"
php artisan migrate --seed
php artisan serve            # http://127.0.0.1:8000

# Web (second terminal)
cd web
npm install
npm run dev                  # http://127.0.0.1:5173, proxies /api to the API
```

Tests: `cd api && php artisan test` (uses the `buysellswap_test` database) and `cd web && npm test`.

## Conventions

- **Money is whole kobo** (₦1 = 100 kobo) in the database, API and UI. Format with `App\Support\Money` (API) or `formatNaira` (web).
- **Times are stored in UTC** and shown in Lagos time.
- **Fonts:** Sora has no ₦ glyph, so Lexend supplies it (see `web/src/styles/tokens/typography.css`).
- **Icons:** add any new Lucide icon to `web/src/components/ui/core/icons.js`.
- **Statuses** are PHP enums in `api/app/Enums`, stored as plain strings.
