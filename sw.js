/* ================================
   FamPay Service Worker (Clean)
   GitHub Pages Compatible
================================ */

const CACHE_NAME = "fampay-v40";

/* Files safe to precache */
const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

/* ================================
   INSTALL
================================ */
self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});


/* ================================
   ACTIVATE
   - Delete old caches
   - Take control immediately
================================ */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );

  return self.clients.claim();
});


/* ================================
   FETCH
   - Cache first strategy
   - Network fallback
   - Do NOT cache manifest
================================ */
self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Never cache manifest or service worker itself
  if (
    request.url.includes("manifest.json") ||
    request.url.includes("sw.js")
  ) {
    event.respondWith(fetch(request));
    return;
  }

  event.respondWith(
    caches.match(request).then((response) => {
      return (
        response ||
        fetch(request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        })
      );
    })
  );
});
