<template>
    <div dusk="list">
        <div class="py-1 flex items-center">
            <i class="fas fa-grip-vertical text-grey-dark drag-handle px-4 py-2"></i>

            <router-link :to="'/lists/' + list.uuid" class="flex-grow py-2 no-underline text-grey text-lg truncate">
                {{ list.name }}
            </router-link>

            <button @click="remove(list)" class="px-4 py-2">
                <i class="fas fa-times text-grey-dark"></i>
            </button>
        </div>

        <hr class="m-0">
    </div>
</template>

<style scoped>
hr {
    border-top: 1px solid config('colors.black');
    border-bottom: 1px solid config('colors.grey-darker');
}
.sortable-chosen hr {
    @apply hidden;
}
.sortable-ghost {
    @apply opacity-25;
    @apply border;
    @apply border-dashed;
    @apply border-black;
}
.sortable-drag {
    @apply bg-white;
    @apply shadow-md;
    @apply rounded;
}
</style>

<script>
import { mapActions } from 'vuex'

export default {
    props: ['list'],

    methods: {
        ...mapActions('lists', [
            'remove',
        ]),

        update(e) {
            const { list } = this

            this.$store.dispatch('lists/update', { list, name: e.target.value })
        },
    }
}
</script>
