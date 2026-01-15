#!/bin/sh
set -e

chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

mkdir -p /var/www/html/storage/framework/cache \
  /var/www/html/storage/framework/sessions \
  /var/www/html/storage/framework/views

if [ ! -d /var/www/html/storage/app/public ]; then
  mkdir -p /var/www/html/storage/app/public
fi

if [ ! -e /var/www/html/public/storage ]; then
  php artisan storage:link
fi

exec "$@"
