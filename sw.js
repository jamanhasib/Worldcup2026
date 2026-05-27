const CACHE_NAME = 'wc2026-v1';
const ASSETS = [
  './worldcup2026.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Tiro+Bangla:ital@0;1&family=Bebas+Neue&family=Oswald:wght@300;400;600;700&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS).catch(()=>{}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('./worldcup2026.html')))
  );
});
