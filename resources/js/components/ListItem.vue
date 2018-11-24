<template>
    <div class="py-2">
        <span class="drag-handle">
            <i class="fas fa-grip-vertical text-grey-dark"></i>
        </span>
        <input type="checkbox" v-model="complete" @change="update">
        <input type="text" v-model="name" @blur="update">
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
