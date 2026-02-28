self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
    // A fetch listener is mandatory for browsers to enable the Install prompt
    e.respondWith(fetch(e.request));
});
