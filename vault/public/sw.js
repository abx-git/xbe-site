/**
 * Cache-First Service Worker mit synthetischen Isolations-Headern.
 * GitHub Pages erlaubt keine benutzerdefinierten HTTP-Header – der SW setzt sie nachträglich.
 */
const CACHE_NAME = 'encrypted-vault-v2';

const PERMISSIONS_POLICY =
  'camera=(), microphone=(), geolocation=(), payment=(), usb=(), screen-wake-lock=()';

function isHtmlRequest(request, url) {
  return (
    request.mode === 'navigate'
    || request.destination === 'document'
    || url.pathname.endsWith('.html')
    || url.pathname.endsWith('/')
  );
}

function withSecurityHeaders(response, isHtml) {
  const headers = new Headers(response.headers);
  headers.set('Cross-Origin-Resource-Policy', 'same-origin');
  if (isHtml) {
    headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    // credentialless: Isolation ohne require-corp, das PDF-/Blob-Embeds in Chrome blockiert
    headers.set('Cross-Origin-Embedder-Policy', 'credentialless');
    headers.set('Permissions-Policy', PERMISSIONS_POLICY);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(['./', './index.html'])),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))),
    ),
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const html = isHtmlRequest(request, url);

  event.respondWith(
    caches.match(request).then((cached) => {
      const serve = (response) => {
        if (!response || !response.ok || response.type === 'opaque') {
          return response ? withSecurityHeaders(response, html) : response;
        }
        return withSecurityHeaders(response, html);
      };

      if (cached) return serve(cached);

      return fetch(request).then((response) => {
        if (!response.ok || response.type === 'opaque') return serve(response);
        const wrapped = withSecurityHeaders(response, html);
        const clone = wrapped.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return wrapped;
      });
    }),
  );
});
