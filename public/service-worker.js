const cacheName = 'lister-cache';
const isExcluded = f => /hot-update|sockjs/.test(f);

const filesToCache = [
    //...serviceWorkerOption.assets.filter(file => !isExcluded(file)),
    '/',
    '/home',
    '/home#/',
    '/manifest.json',
    '/js/manifest.js',
    '/js/vendor.js',
    '/js/app.js',
    '/css/app.css',
]

// Store a response inside the cache
const updateCache = (request, response) =>
  caches.open(cacheName).then(cache => cache.put(request, response));

const fetchFromNetwork = request =>
    new Promise((resolve, reject) => {
        fetch(request).then(response => {
            if (!isExcluded(request.url) && response) {
                updateCache(request, response.clone()).then(() => resolve(response));
            } else {
                resolve(response);
            }
        }, reject);
    });

// Try to fetch existing responses from the cache
const fetchFromCache = request =>
  caches.match(request).then(response => response || Promise.reject('failed'));

// Cache known assets up-front
const preCache = () =>
    caches.open(cacheName).then(cache => {
        cache.addAll(filesToCache);
    });

// Handle the 'install' event
self.addEventListener('install', event => {
    event.waitUntil(preCache());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        fetchFromNetwork(event.request).catch(() => fetchFromCache(event.request))
    );
});
