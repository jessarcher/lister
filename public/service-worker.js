const cacheName = 'lister-cache';

const filesToCache = [
    './',
    './home',
    './manifest.json',
    './js/manifest.js',
    './js/vendor.js',
    './js/app.js',
    './css/app.css',
];

self.addEventListener('install', (event) => {
    console.log('The service worker is being installed.');

    event.waitUntil(precache());
});

self.addEventListener('fetch', (event) => {
    console.log('The service worker is serving the asset.');

    event.respondWith(fromNetwork(event.request, 400).catch(() => fromCache(event.request)));
});

const precache = () => caches.open(cacheName).then((cache) => cache.addAll(filesToCache));

const fromNetwork = (request, timeout) => new Promise((fulfill, reject) => {
    var timeoutId = setTimeout(reject, timeout);

    fetch(request).then((response) => {
        clearTimeout(timeoutId);
        fulfill(response);
    }, reject);
});

const fromCache = (request) =>
    caches.open(cacheName)
        .then((cache) => cache.match(request)
            .then((matching) => matching || Promise.reject('no-match')));
