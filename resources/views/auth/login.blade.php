@extends('layouts.main')

@section('content')
<div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-sm">
        <div class="bg-white shadow rounded m-4 border-t-4 border-purple">
            <form method="POST" action="{{ route('login') }}">
                @csrf

                <div class="px-8 pb-4 pt-8">
                    <label for="email" class="block text-grey-darker text-sm font-bold mb-2">
                        {{ __('E-Mail Address') }}
                    </label>

                    <input
                        id="email"
                        type="email"
                        name="email"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline{{ $errors->has('email') ? ' border-red' : '' }}"
                        placeholder="{{ __('E-Mail Address') }}"
                        value="{{ old('email') }}"
                        required
                        autofocus>

                    @if ($errors->has('email'))
                        <p class="text-red text-xs italic">{{ $errors->first('email') }}</p>
                    @endif
                </div>

                <div class="px-8 pb-4">
                    <label for="password" class="block text-grey-darker text-sm font-bold mb-2">
                        {{ __('Password') }}
                    </label>

                    <input
                        id="password"
                        type="password"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline{{ $errors->has('password') ? ' is-invalid' : '' }}"
                        name="password"
                        placeholder="{{ __('Password') }}"
                        required>

                    @if ($errors->has('password'))
                        <p class="text-red text-xs italic">{{ $errors->first('password') }}</p>
                    @endif
                </div>

                <div class="px-8 pb-4">
                    <input
                        type="checkbox"
                        name="remember"
                        id="remember"
                        {{ old('remember') ? 'checked' : '' }}>

                    <label
                        for="remember">
                        {{ __('Remember Me') }}
                    </label>
                </div>

                <div class="px-8 pb-8 flex items-center justify-between">
                    <button
                        type="submit"
                        class="
                            bg-purple
                            hover:bg-purple-dark
                            text-white
                            font-bold
                            py-2
                            px-4
                            rounded
                            focus:outline-none
                            focus:shadow-outline">
                        {{ __('Login') }}
                    </button>

                    <a
                        class="inline-block align-baseline font-bold text-sm text-purple hover:text-purple-darker"
                        href="{{ route('password.request') }}">
                        {{ __('Forgot Your Password?') }}
                    </a>
                </div>
            </form>
        </div>
    </div>
</div>

@endsection
