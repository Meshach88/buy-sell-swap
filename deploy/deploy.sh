#!/usr/bin/env bash
# Deploy on the VPS from /var/www/buysellswap. Run as the deploy user: ./deploy/deploy.sh
# One-time server setup (cron for the scheduler):  * * * * * cd /var/www/buysellswap/api && php artisan schedule:run >> /dev/null 2>&1
set -euo pipefail

cd "$(dirname "$0")/.."

git pull --ff-only

( cd api
  composer install --no-dev --optimize-autoloader --no-interaction
  php artisan migrate --force
  php artisan config:cache
  php artisan route:cache
  php artisan event:cache
  php artisan queue:restart )

( cd web
  npm ci
  npm run build )

echo "Deployed $(git rev-parse --short HEAD)"
