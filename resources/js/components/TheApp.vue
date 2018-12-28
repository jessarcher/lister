<template>
    <div>
        <the-header></the-header>
        <div class="h-10"></div>

        <the-sidebar></the-sidebar>

        <main>
            <router-view></router-view>
        </main>
    </div>
</template>


<script>
import TheHeader from './TheHeader'
import TheSidebar from './TheSidebar'

export default {
    components: {
        TheHeader,
        TheSidebar,
    },

    created() {
        this.$store.dispatch('lists/fetch');
    },
}
</script>
