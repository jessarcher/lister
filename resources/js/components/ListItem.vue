<template>
    <div class="py-1 flex items-center" :class="{ 'opacity-50': item.complete }" dusk="item">
        <i class="fas fa-grip-vertical text-grey-dark drag-handle px-4 py-2"></i>

        <input
            type="checkbox"
            :checked="item.complete"
            @change="toggle(item)"
            class="mr-3">

        <input
            type="text"
            :value="item.name"
            @blur="update"
            class="flex-grow mr-3 min-w-0 text-grey-darkest bg-transparent text-lg py-1"
            :class="{ 'line-through': item.complete }"
            dusk="item-input"
            >

        <button @click="remove(item)" class="px-4 py-2">
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
    props: ['item'],

    methods: {
        ...mapActions('items', [
            'remove',
            'toggle',
        ]),

        update(e) {
            const { item } = this

            this.$store.dispatch('items/update', { item, name: e.target.value })
        },
    }
}
</script>
