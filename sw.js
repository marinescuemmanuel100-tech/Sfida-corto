const C = "sfida-202611102309";
const F = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png"];
self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(C).then(c => c.addAll(F)));
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(k => Promise.all(k.filter(n => n !== C).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request).then(r => {
      const copia = r.clone();
      caches.open(C).then(c => c.put(e.request, copia));
      return r;
    }).catch(() => caches.match(e.request))
  );
});
