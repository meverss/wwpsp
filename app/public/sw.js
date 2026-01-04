const CACHE_NAME = 'wwpsp-app'
const urlsToCache = [
  '/',
  '/App.js',
  '/App.css',
  '/index.js',
  '/index.css'
]

// Instalación
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  )
})

// Cache website: Network First
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  )
})