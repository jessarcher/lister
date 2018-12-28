<template>
    <transition name="fade-and-slide">
        <aside v-if="show" class="bg-light-muted fixed pin-y pin-x z-10">
            <div class="bg-grey-darkest text-grey w-5/6 max-w-xs absolute pin-y pin-l overflow-y-auto shadow-md shadow-lg z-20">
                <lists></lists>
            </div>
        </aside>
    </transition>
</template>

<style scoped>
.bg-light-muted {
    background: rgba(255, 255, 255, 0.8);
}

.fade-and-slide-enter-active,
.fade-and-slide-leave-active,
.fade-and-slide-enter-active .bg-grey-darkest,
.fade-and-slide-leave-active .bg-grey-darkest {
    transition: all .2s ease;
}

.fade-and-slide-enter,
.fade-and-slide-leave-to {
    background: rgba(255, 255, 255, 0);
}

.fade-and-slide-enter .bg-grey-darkest,
.fade-and-slide-leave-to .bg-grey-darkest {
  transform: translateX(-100%);
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
