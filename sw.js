const CACHE_NAME = 'fampay-v1';

self.addEventListener('install', (e) => {
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Brave requires this fetch listener to be active for PWA status
    event.respondWith(fetch(event.request));
});
