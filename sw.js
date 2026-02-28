// A functional service worker is required for Brave to allow PWA installation
const CACHE_NAME = 'fampay-v2';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Pass-through fetch handler satisfying Brave's PWA requirements
    event.respondWith(fetch(event.request));
});
