import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration'
import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { NavigationRoute, registerRoute, Route } from 'workbox-routing'
import { StaleWhileRevalidate, CacheFirst, } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

declare let self: ServiceWorkerGlobalScope

// Client claim
clientsClaim();

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING')
    self.skipWaiting()
})


// to allow work offline
registerRoute(new NavigationRoute(
  createHandlerBoundToURL('index.html'),
  { denylist: [/^\/backoffice/] },
))

// Handle images:
const imageRoute = new Route(({ request }) => {
  return request.destination === 'image'
}, new StaleWhileRevalidate({
  cacheName: 'images',
  plugins: [
    new ExpirationPlugin({
      maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
      maxEntries: 60,
    }),
    new CacheableResponsePlugin({
      statuses: [0, 200]
    })
  ]
}));

// Handle videos
const videoRoute = new Route(({ request }) => {
  return request.destination === 'video'
}, new StaleWhileRevalidate({
  cacheName: 'videos',
  plugins: [
    new ExpirationPlugin({
      maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
      maxEntries: 60,
    }),
    new CacheableResponsePlugin({
      statuses: [0, 200]
    })
  ]
}));

// Handle scripts:
const scriptsRoute = new Route(({ request }) => {
  return request.destination === 'script';
}, new CacheFirst({
  cacheName: 'scripts',
  plugins: [
    new ExpirationPlugin({
      maxEntries: 60,
    }),
    new CacheableResponsePlugin({
      statuses: [0, 200]
    })
  ]
}));

// Handle styles:
const stylesRoute = new Route(({ request }) => {
  return request.destination === 'style';
}, new CacheFirst({
  cacheName: 'styles',
  plugins: [
    new ExpirationPlugin({
      maxEntries: 60
    }),
    new CacheableResponsePlugin({
      statuses: [0, 200]
    })
  ]
}));

// Handle fonts:
const fontsRoute = new Route(({ request }) => {
  return request.destination === 'font';
}, new CacheFirst({
  cacheName: 'fonts',
  plugins: [
    new ExpirationPlugin({
      maxEntries: 60
    }),
    new CacheableResponsePlugin({
      statuses: [0, 200]
    })
  ]
}));



// Register routes
registerRoute(imageRoute);
registerRoute(videoRoute);
registerRoute(scriptsRoute);
registerRoute(stylesRoute);
registerRoute(fontsRoute);