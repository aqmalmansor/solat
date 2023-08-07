/* eslint-disable no-undef */
workbox.core.setCacheNameDetails({ prefix: "my-pwa-project" });

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Cache the assets
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

// Use a network-first strategy for other routes
workbox.routing.setDefaultHandler(new workbox.strategies.NetworkFirst());

// This is where the magic happens - handle offline requests with a custom response
workbox.routing.setCatchHandler(({ event }) => {
  switch (event.request.destination) {
    case "document":
      // For HTML requests, return the fallback page
      return caches.match(
        workbox.precaching.getCacheKeyForURL("/offline.html")
      );
    default:
      // For all other requests, return an empty response
      return Response.error();
  }
});
