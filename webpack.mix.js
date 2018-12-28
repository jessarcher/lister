const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');
const { GenerateSW } = require('workbox-webpack-plugin')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    plugins: [
        new GenerateSW(require('./workbox-config.js'))
    ],
    output: {
        publicPath: '', // Prevent GenerateSW from prefixing the path with an extra slash
    }
})

if (mix.inProduction()) {
    mix.disableNotifications();
}

mix.js('resources/js/app.js', 'public/js')
    .sourceMaps()
    .extract()
    .sass('resources/sass/app.scss', 'public/css')
    .sourceMaps()
    .options({
        processCssUrls: false,
        postCss: [ tailwindcss('./tailwind.js') ],
    })
    .copy('./node_modules/@fortawesome/fontawesome-free/webfonts/', 'public/fonts/vendor/fontawesome/')
    .copy('resources/manifest.json', 'public/manifest.json')
    .version();
