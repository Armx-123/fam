self.addEventListener('install', (e) => {
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    // This allows the app to be installable by satisfying the 'offline-ready' check
    event.respondWith(fetch(event.request));
});
