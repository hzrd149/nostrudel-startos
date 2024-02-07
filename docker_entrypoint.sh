#!/bin/sh
set -e

cat /root/start9/config.yaml

CACHE_RELAY_ENABLED=$(yq '.enable-cache-relay' /root/start9/config.yaml)
#CACHE_RELAY=$(yq '.cache-relay' /root/start9/config.yaml)
CACHE_RELAY=nostr.embassy:8080

PROXY_PASS_BLOCK=""
if [ -n "$CACHE_RELAY" ] && [ "$CACHE_RELAY_ENABLED" = "true" ]; then
  echo "Cache relay set to $CACHE_RELAY"
  sed -i 's/CACHE_RELAY_ENABLED = false/CACHE_RELAY_ENABLED = true/g' /usr/share/nginx/html/index.html
  PROXY_PASS_BLOCK="$PROXY_PASS_BLOCK
    location /local-relay {
      proxy_pass http://$CACHE_RELAY/;
      proxy_http_version 1.1;
      proxy_set_header Upgrade \$http_upgrade;
      proxy_set_header Connection "upgrade";
    }
  "
else
  echo "No cache relay set"
fi

echo "Starting noStrudel ..."

CONF_FILE="/etc/nginx/conf.d/default.conf"
NGINX_CONF="server {
    listen 80;
    return 301 https://\$host\$request_uri;
}

server {
    listen 8080;
    listen 3443 ssl;
    ssl_certificate /mnt/cert/main.cert.pem;
    ssl_certificate_key /mnt/cert/main.key.pem;

    server_name localhost;
    merge_slashes off;

    $PROXY_PASS_BLOCK

    root /usr/share/nginx/html;
    index index.html index.htm;

    # Gzip settings
    gzip on;
    gzip_disable "msie6";
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_buffers 16 8k;
    gzip_http_version 1.1;
    gzip_min_length 256;
    gzip_types
        application/atom+xml
        application/geo+json
        application/javascript
        application/x-javascript
        application/json
        application/ld+json
        application/manifest+json
        application/rdf+xml
        application/rss+xml
        application/xhtml+xml
        application/xml
        font/eot
        font/otf
        font/ttf
        image/svg+xml
        text/css
        text/javascript
        text/plain
        text/xml;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}"
echo "$NGINX_CONF" > $CONF_FILE

_term() {
  echo "Caught SIGTERM signal!"
  kill -SIGTERM "$nostrudel_process" 2>/dev/null
}

nginx -g 'daemon off;' &
nostrudel_process=$!

trap _term SIGTERM

wait $nostrudel_process
