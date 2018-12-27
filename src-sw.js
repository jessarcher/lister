importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

// Background Sync for POST/PUT/PATCH/DELETE to API

const bgSyncPlugin = new workbox.backgroundSync.Plugin('myQueueName', {
    maxRetentionTime: 24 * 60 // Retry for max of 24 Hours
});

['POST', 'PUT', 'PATCH', 'DELETE'].forEach(httpMethod => {
    workbox.routing.registerRoute(
        new RegExp('/api/.*'),
        workbox.strategies.networkOnly({
            plugins: [bgSyncPlugin]
        }),
        httpMethod
    )
})

// Network first for GET to API

workbox.routing.registerRoute(
    new RegExp('/api/.*'),
    workbox.strategies.networkFirst(),
    'GET'
);

// Cache first everything else (js, css, fonts, images)

workbox.precaching.precacheAndRoute([]);
