module.exports = {
    cacheId: 'lister',
    importWorkboxFrom: 'local',
    globDirectory: 'public/',
    globPatterns: [
        '**/*.{css,ico,eot,svg,ttf,woff,woff2,png,php,js,json,html,txt}',
        'images/**/*.{png,jpg,jpeg,gif,bmp,svg}',
    ],
    // swSrc: 'src-sw.js',
    swDest: 'public/sw.js',
    maximumFileSizeToCacheInBytes: 5000000,
    runtimeCaching: [
        {
            urlPattern: '/app',
            handler: 'cacheFirst',
            options: {
                cacheableResponse: {
                    statuses: [0, 200],
                },
            },
        },
        {
            urlPattern: /\/api\/.*/,
            method: 'GET',
            handler: 'networkFirst',
            options: {
                networkTimeoutSeconds: 10,
                cacheName: 'lister-api-cache',
                expiration: {
                    maxEntries: 10,
                    maxAgeSeconds: 60 * 60 * 24,
                },
                backgroundSync: {
                    name: 'lister-queue',
                    options: {
                        maxRetentionTime: 60 * 60 * 24,
                    },
                },
                cacheableResponse: {
                    statuses: [0, 200],
                },
                broadcastUpdate: {
                    channelName: 'lister-update-channel',
                },
            },
        },
        {
            urlPattern: /\/api\/.*/,
            method: 'POST',
            handler: 'networkOnly',
            options: {
                backgroundSync: {
                    name: 'lister-queue-post',
                    options: {
                        maxRetentionTime: 60 * 60 * 24,
                    },
                },
            },
        },
        {
            urlPattern: /\/api\/.*/,
            method: 'PUT',
            handler: 'networkOnly',
            options: {
                backgroundSync: {
                    name: 'lister-queue-put',
                    options: {
                        maxRetentionTime: 60 * 60 * 24,
                    },
                },
            },
        },
        {
            urlPattern: /\/api\/.*/,
            method: 'PATCH',
            handler: 'networkOnly',
            options: {
                backgroundSync: {
                    name: 'lister-queue-patch',
                    options: {
                        maxRetentionTime: 60 * 60 * 24,
                    },
                },
            },
        },
        {
            urlPattern: /\/api\/.*/,
            method: 'DELETE',
            handler: 'networkOnly',
            options: {
                backgroundSync: {
                    name: 'lister-queue-delete',
                    options: {
                        maxRetentionTime: 60 * 60 * 24,
                    },
                },
            },
        },
    ],
};
