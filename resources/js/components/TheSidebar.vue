<template>
    <aside v-if="show" class="bg-light-muted fixed pin-y pin-x z-10">
        <div class="bg-grey-darkest text-grey w-5/6 max-w-xs absolute pin-y pin-l overflow-y-auto shadow-md shadow-lg">
            <lists></lists>
        </div>
    </aside>
</template>

<style scoped>
.bg-light-muted {
    background: rgba(255, 255, 255, 0.8);
}
</style>

<script>
import Lists from './Lists'
import { mapState } from 'vuex'

export default {
    components: {
        Lists,
    },

    watch: {
        '$route'() {
            this.$store.commit('hideSidebar')
        },
    },

    computed: {
        ...mapState({
            show: 'showSidebar'
        }),
    }
}
</script>
