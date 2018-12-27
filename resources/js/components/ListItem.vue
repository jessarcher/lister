<template>
    <div :class="{ 'opacity-50': item.complete }" dusk="item">
        <div class="py-1 flex items-center">
            <i class="fas fa-grip-vertical text-grey drag-handle px-4 py-2"></i>

            <input
                type="checkbox"
                :checked="item.complete"
                @change="toggle(item)"
                class="mr-3">

            <autosize-textarea
                @blur="update"
                class="flex-grow mr-3 min-w-0 text-grey-darkest bg-transparent text-lg py-1"
                :class="{ 'line-through': item.complete }"
                dusk="item-input"
                >{{ item.name }}</autosize-textarea>

            <button @click="remove(item)" class="px-4 py-2">
                <i class="fas fa-times text-grey-dark"></i>
            </button>
        </div>

        <hr class="m-0">
    </div>
</template>

<style scoped>
hr {
    border-top: 1px solid config('colors.white');
    border-bottom: 1px solid config('colors.grey-light');
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
    @apply text-grey-dark;
    @apply shadow-md;
    @apply rounded;
}
</style>

<script>
import { mapActions } from 'vuex'
import AutosizeTextarea from './AutosizeTextarea'

export default {
    components: {
        AutosizeTextarea,
    },

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
