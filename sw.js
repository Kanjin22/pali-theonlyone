const CACHE_VERSION = 'pali-theonlyone-pwa-v2';
const APP_SHELL_CACHE = `app-shell-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;
const DATA_CACHE = `data-${CACHE_VERSION}`;

const APP_SHELL_URLS = [
  './',
  'index.html',
  'pages/reader.html',
  'pages/presentation.html',
  'pages/dictionary.html',
  'pages/flashcards.html',
  'manifest.webmanifest',
  'icons/pwa.svg',
  'icons/pwa-maskable.svg'
];

function isSameOrigin(url) {
  return url.origin === self.location.origin;
}

function isDataRequest(pathname) {
  return pathname.includes('/data/');
}

function isFontRequest(pathname) {
  return pathname.includes('/fonts/');
}

function isJsOrCss(pathname) {
  return (
    pathname.endsWith('.js') ||
    pathname.endsWith('.css') ||
    pathname.includes('/js/')
  );
}

async function cachePutIfOk(cacheName, request, response) {
  if (!response || response.status !== 200) return;
  if (response.type !== 'basic') return;
  const cache = await caches.open(cacheName);
  await cache.put(request, response);
}

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  await cachePutIfOk(cacheName, request, response.clone());
  return response;
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request)
    .then(async (response) => {
      await cachePutIfOk(cacheName, request, response.clone());
      return response;
    })
    .catch(() => null);
  return cached || (await fetchPromise) || new Response('', { status: 504 });
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(APP_SHELL_CACHE)
      .then((cache) => {
        // Add URLs individually to handle failures gracefully
        return Promise.all(
          APP_SHELL_URLS.map((url) =>
            cache
              .add(url)
              .catch((err) => {
                console.warn(`Failed to cache ${url}:`, err);
              })
          )
        );
      })
      .then(() => self.skipWaiting())
      .catch((err) => console.error('Install event failed:', err))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => !k.includes(CACHE_VERSION))
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (!isSameOrigin(url)) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request);
          await cachePutIfOk(RUNTIME_CACHE, request, response.clone());
          return response;
        } catch {
          const cachedPage =
            (await caches.match(url.pathname)) ||
            (await caches.match('index.html')) ||
            (await caches.match('./'));
          return cachedPage || new Response('offline', { status: 503 });
        }
      })()
    );
    return;
  }

  const pathname = url.pathname;

  if (isFontRequest(pathname)) {
    event.respondWith(cacheFirst(request, RUNTIME_CACHE));
    return;
  }

  if (isDataRequest(pathname)) {
    event.respondWith(staleWhileRevalidate(request, DATA_CACHE));
    return;
  }

  if (isJsOrCss(pathname) || pathname.endsWith('.html')) {
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
    return;
  }
});

