const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

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

mix.sass('resources/sass/app.scss', 'public/css')
    .options({
        processCssUrls: false,
        postCss: [ tailwindcss('./tailwind.js') ],
    });

mix.js('resources/js/app.js', 'public/js')
    .extract([
        'axios',
        'lodash',
        'popper.js',
        'vue',
        'vuedraggable',
        'vuex',
    ]);

mix.copy('./node_modules/@fortawesome/fontawesome-free/webfonts/', 'public/fonts/vendor/fontawesome/')

if (mix.inProduction()) {
    mix.version()
    mix.disableNotifications();
} else {
    mix.sourceMaps();
}
