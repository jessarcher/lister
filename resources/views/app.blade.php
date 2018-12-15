<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#317EFB">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Lister') }}</title>

    <script src="{{ mix('js/manifest.js') }}" defer></script>
    <script src="{{ mix('js/vendor.js') }}" defer></script>
    <script src="{{ mix('js/app.js') }}" defer></script>

    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <link rel="manifest" href="{{ mix('manifest.json') }}">
</head>
<body class="bg-grey-lightest text-grey-dark">
    <div id="app">
        <the-app></the-app>
    </div>
</body>
</html>
