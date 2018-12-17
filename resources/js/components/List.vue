<template>
    <div class="py-1 flex items-center" dusk="list">
        <i class="fas fa-grip-vertical text-grey-dark drag-handle px-4 py-2"></i>

        <router-link :to="'/lists/' + list.uuid" class="flex-grow py-2 no-underline text-purple text-lg">
            {{ list.name }}
        </router-link>

        <button @click="remove(list)" class="px-4 py-2">
            <i class="fas fa-times"></i>
        </button>
    </div>
</template>

<style>
.sortable-chosen {
    @apply bg-purple-lightest;
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
