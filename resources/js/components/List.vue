<template>
    <div>
        <h1>My List</h1>

        <input type="text" v-model="newItemName" placeholder="Add a new item..." @keyup.enter="addItem">
        <button @click="addItem">
            Add
        </button>

        <h2>Incomplete</h2>
        <list-item
            v-for="item in incompleteItems"
            :key="item.id"
            v-bind.sync="item"
            v-on:delete-item="deleteItem"
        ></list-item>

        <h2>Complete</h2>
        <list-item
            v-for="item in completeItems"
            :key="item.id"
            v-bind.sync="item"
            v-on:delete-item="deleteItem"
        ></list-item>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newItemName: '',
            items: [
                {
                    id: 1,
                    name: "My item 1",
                    complete: false,
                },
                {
                    id: 2,
                    name: "My item 2",
                    complete: false,
                },
            ],
        }
    },

    computed: {
        incompleteItems() {
            return this.items.filter(item => ! item.complete);
        },

        completeItems() {
            return this.items.filter(item => item.complete);
        }
    },

    methods: {
        addItem() {
            this.items.unshift({
                name: this.newItemName,
                complete: false,
            });

            this.newItemName = '';
        },

        deleteItem(id) {
            console.log('delete item');
            this.items = this.items.filter(item => item.id !== id);
        },
    },

    mounted() {
        console.log('Component mounted.')
    },
}
</script>
