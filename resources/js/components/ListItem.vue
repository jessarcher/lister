<template>
    <div class="list-item">
        <input type="checkbox" :checked="complete" @input="update">
        <input type="text" v-model="name" @blur="update">
        <button @click="remove">
            Delete
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
                    name: this.name
                });
            },

            remove() {
                this.$store.dispatch('deleteItem', this.id);
            }
        }
    }
</script>
