const CACHE_NAME = "return-living-rosary-v2";
const APP_SHELL = ["/", "/index.html", "/manifest.webmanifest", "/icons/return-192.svg", "/icons/return-512.svg"];
self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);
    // Cache the hashed Vite JavaScript/CSS files too, so a first successful
    // online visit can be reopened offline after the worker activates.
    try {
      const response = await fetch("/index.html");
      const html = await response.text();
      const assets = [...html.matchAll(/(?:src|href)="([^"]+\.(?:js|css)(?:\?[^"]*)?)"/g)]
        .map((match) => new URL(match[1], self.location.origin).href)
        .filter((asset) => new URL(asset).origin === self.location.origin);
      await Promise.all(assets.map(async (asset) => {
        try { const assetResponse = await fetch(asset); if (assetResponse.ok) await cache.put(asset, assetResponse); } catch { /* best effort */ }
      }));
    } catch { /* the app shell is still cached if available */ }
    await self.skipWaiting();
  })());
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith("return-living-rosary-") && key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then((cached) => {
    if (cached) return cached;
    return fetch(event.request).then((response) => {
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => {
      if (event.request.mode === "navigate") return caches.match("/index.html");
      return new Response("You are offline. Reopen RETURN while connected once to cache this resource.", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });
    });
  }));
});
