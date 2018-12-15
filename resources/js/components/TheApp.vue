<template>
    <div>
        <nav class="bg-purple shadow text-white flex justify-between px-4 py-2">
            <router-link to="/" class="text-purple-lightest no-underline">Home</router-link>

            <a
                href="/logout"
                onclick="event.preventDefault(); document.getElementById('logout-form').submit();"
                class="text-purple-lightest no-underline"
            >
                Logout
            </a>
            <form id="logout-form" action="/logout" method="POST" style="display: none;">
                <input type="hidden" name="_token" :value="csrf">
            </form>
        </nav>

        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
export default {
    computed: {
        csrf() {
            const token = document.head.querySelector('meta[name="csrf-token"]');
            return token.content;
        }
    },

    created() {
        this.$store.dispatch('lists/fetch');
    },
}
</script>
