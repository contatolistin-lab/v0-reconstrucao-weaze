const CACHE_NAME = 'weaze-v1'

const STATIC_ASSETS = ['/', '/manifest.json']

const SUPABASE_PATHS = ['/rest/', '/auth/']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Don't intercept non-GET requests (fixes DELETE posts in PWA)
  if (request.method !== 'GET') {
    return
  }

  // Don't intercept Supabase API calls
  if (
    SUPABASE_PATHS.some((path) => url.pathname.includes(path)) ||
    url.hostname.includes('supabase')
  ) {
    return
  }

  // Network-first for navigation
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const cloned = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, cloned))
          return response
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/offline')))
    )
    return
  }

  // Cache-first for static assets
  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request)
        .then((response) => {
          if (response.ok) {
            const cloned = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, cloned))
          }
          return response
        })
        .catch(() => cached)

      return cached || fetchPromise
    })
  )
})

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting()
  }
})
