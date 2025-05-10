import { sdk } from './sdk'
import { T } from '@start9labs/start-sdk'
import { uiPort } from './utils'
import { writeFile } from 'fs/promises'

export const main = sdk.setupMain(async ({ effects, started }) => {
  /**
   * ======================== Setup (optional) ========================
   *
   * In this section, we fetch any resources or run any desired preliminary commands.
   */
  console.info('Starting noStrudel!')

  const nostrudelSub = await sdk.SubContainer.of(
    effects,
    { imageId: 'nostrudel' },
    sdk.Mounts.of().mountVolume({
      volumeId: 'main',
      subpath: null,
      mountpoint: '/data',
      readonly: false,
    }),
    'nostrudel-sub',
  )

  await writeFile(
    nostrudelSub.rootfs + '/etc/nginx/conf.d/default.conf',
    `
    server {
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
    }
  `,
  )

  /**
   * ======================== Additional Health Checks (optional) ========================
   *
   * In this section, we define *additional* health checks beyond those included with each daemon (below).
   */
  const healthReceipts: T.HealthCheck[] = []

  /**
   * ======================== Daemons ========================
   *
   * In this section, we create one or more daemons that define the service runtime.
   *
   * Each daemon defines its own health check, which can optionally be exposed to the user.
   */
  return sdk.Daemons.of(effects, started, healthReceipts).addDaemon('primary', {
    subcontainer: nostrudelSub,
    command: ['nginx', '-g', 'daemon off;'],
    ready: {
      display: 'Web Interface',
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, uiPort, {
          successMessage: 'The web interface is ready',
          errorMessage: 'The web interface is not ready',
        }),
    },
    requires: [],
  })
})
