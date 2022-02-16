var cacheName = 'v2';

// precache everything that matters for DNDle
var cacheFiles = [
  '/',
  '/dndle.css',
  '/dndle.js',
  '/manifest.json',
  '/icon.png'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(cacheNames.map(function(thisCacheName) {
        if (thisCacheName !== cacheName) {
          return caches.delete(thisCacheName);
	}
      }));
    })
  );
});

// use stale-while-revalidate caching (serve from cache, check network for update in background)
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(cacheName).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        var fetchPromise = fetch(event.request).then(function (networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return response || fetchPromise;
      });
    }),
  );
});
