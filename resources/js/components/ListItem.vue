<template>
    <div class="py-1 flex items-center" :class="{ 'opacity-50': item.complete }" dusk="item">
        <i class="fas fa-grip-vertical text-grey-dark drag-handle px-4 py-2"></i>

        <input
            type="checkbox"
            :checked="item.complete"
            @change="toggle"
            class="mr-3">

        <input
            type="text"
            :value="item.name"
            @blur="update"
            class="flex-grow mr-3 min-w-0 text-grey-darkest bg-transparent text-lg"
            :class="{ 'line-through': item.complete }"
            dusk="item-input"
            >

        <button @click="remove" class="px-4 py-2">
            <i class="fas fa-times"></i>
        </button>
    </div>
</template>

<style>
.sortable-chosen {
    @apply bg-blue-lightest;
}
</style>

<script>
    export default {
        props: ['item'],

        methods: {
            update(e) {
                const { item } = this

                this.$store.dispatch('items/update', { item, name: e.target.value })
            },

            remove() {
                this.$store.dispatch('items/delete', this.item);
            },

            toggle() {
                this.$store.dispatch('items/toggle', this.item);
            },
        }
    }
</script>
