<template>
    <div class="py-3 flex items-center" :class="{ 'opacity-50': item.complete }" dusk="item">
        <i class="fas fa-grip-vertical text-grey-dark drag-handle mx-4"></i>

        <input
            type="checkbox"
            :checked="item.complete"
            @change="toggle"
            class="mr-3">

        <input
            type="text"
            :value="item.name"
            @blur="update"
            class="flex-grow mr-3 min-w-0 text-grey-darkest bg-transparent"
            :class="{ 'line-through': item.complete }"
            dusk="item-input"
            >

        <button @click="remove" class="mr-4">
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

                this.$store.dispatch('updateItem', { item, name: e.target.value })
            },

            remove() {
                this.$store.dispatch('deleteItem', this.item);
            },

            toggle() {
                this.$store.dispatch('toggleItem', this.item);
            },
        }
    }
</script>
