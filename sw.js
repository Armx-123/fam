self.addEventListener('install', (e) => {
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Brave requires a fetch handler to enable the "Install" option
    event.respondWith(fetch(event.request));
});
