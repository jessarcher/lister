<template>
    <div>
        <nav class="bg-purple shadow text-white flex justify-between px-4 py-2">
            <router-link to="/" class="text-purple-lightest no-underline">Home</router-link>
        </nav>

        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
export default {
    created() {
        this.$store.dispatch('lists/fetch');
    },
}
</script>
