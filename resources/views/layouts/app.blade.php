<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="manifest" href="{{ url('manifest.json') }}">
    <meta name="theme-color" content="#317EFB">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Lister') }}</title>

    <!-- Scripts -->
    <script src="{{ mix('js/manifest.js') }}" defer></script>
    <script src="{{ mix('js/vendor.js') }}" defer></script>
    <script src="{{ mix('js/app.js') }}" defer></script>

    <!-- Styles -->
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>
<body class="bg-grey-lightest text-grey-dark">
    <div id="app">
        <nav>
            <ul class="list-reset flex pl-4 pt-4">
                <li class="pr-2">
                    <router-link to="/">Home</router-link>
                </li>
                <!-- Authentication Links -->
                @guest
                    <li class="pr-2">
                        <a href="{{ route('login') }}">{{ __('Login') }}</a>
                    </li>
                    <li class="pr-2">
                        @if (Route::has('register'))
                            <a href="{{ route('register') }}">{{ __('Register') }}</a>
                        @endif
                    </li>
                @else
                    <li class="pr-2">
                        <a href="#">
                            {{ Auth::user()->name }}
                        </a>
                    </li>
                    <li class="pr-2">
                        <a
                            href="{{ route('logout') }}"
                            onclick="event.preventDefault();
                            document.getElementById('logout-form').submit();"
                        >
                                {{ __('Logout') }}
                        </a>

                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            @csrf
                        </form>
                    </li>
                @endguest
            </ul>
        </nav>

        <main>
            @yield('content')
        </main>
    </div>
</body>
</html>
