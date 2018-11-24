<template>
    <div class="py-3 flex items-center">
        <i class="fas fa-grip-vertical text-grey-dark drag-handle mr-3"></i>

        <input
            type="checkbox"
            v-model="complete"
            @change="update"
            class="mr-3"
        >

        <input
            type="text"
            v-model="name"
            @blur="update"
            :class="'flex-grow mr-3 min-w-0 text-grey-darkest' + (complete ? ' line-through' : '')"
        >

        <button @click="remove">
            <i class="fas fa-times"></i>
        </button>
    </div>
</template>

<script>
    export default {
        props: ['item'],

        data() {
            return {
                id: this.item.id,
                name: this.item.name,
                order: this.item.order,
                complete: this.item.complete,
            }
        },

        methods: {
            update() {
                this.$store.dispatch('updateItem', {
                    id: this.id,
                    name: this.name,
                    complete: this.complete,
                });
            },

            remove() {
                this.$store.dispatch('deleteItem', this.id);
            }
        }
    }
</script>
