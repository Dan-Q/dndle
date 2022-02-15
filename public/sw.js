var cacheName = 'v1'; 
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

self.addEventListener('fetch', event=>{
  event.respondWith( caches.match(event.request).then((response) => response || fetch(event.request)) );
});
