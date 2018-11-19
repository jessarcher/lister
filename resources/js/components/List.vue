<template>
    <div>
        <h1>My List</h1>

        <input type="text" v-model="newItemName" placeholder="Add a new item..." @keyup.enter="addItem">
        <button @click="addItem">
            Add
        </button>

        <transition-group name="list">

        <h2 key="incomplete-heading">Incomplete</h2>
        <!-- <draggable key="incomplete-draggable" v-model="incompleteItems" :options="{}" @end="something"> -->
            <list-item v-for="item in incompleteItems"
                :key="item.id"
                v-bind.sync="item"
                v-on:delete-item="deleteItem"
                v-on:complete-item="completeItem"
                :complete="false"
            ></list-item>
        <!-- </draggable> -->

        <h2 key="complete-heading">Complete</h2>
        <list-item
            v-for="item in completeItems"
            :key="item.id"
            v-bind.sync="item"
            v-on:delete-item="deleteItem"
            v-on:complete-item="completeItem"
            :complete="true"
        ></list-item>

        </transition-group>

        <pre>{{ incompleteItems }}</pre>
        <pre>{{ completeItems }}</pre>
    </div>
</template>

<style>
.list-item, h2 {
    transition: all 0.5s;
}
.list-move {
    transition: transform 0.5s;
}
.list-leave-to {
    opacity: 0;
    transform: translateX(100px);
}
</style>

<script>
import draggable from 'vuedraggable'

export default {
    components: {
        draggable,
    },

    data() {
        return {
            newItemName: '',
            incompleteItems: [],
            completeItems: [],
        }
    },

    computed: {
    },

    methods: {
        addItem() {
            this.incompleteItems.unshift({
                name: this.newItemName,
                complete: false,
            });

            this.newItemName = '';
        },

        deleteItem(id) {
            console.log('delete item');
            this.items = this.items.filter(item => item.id !== id);
        },

        markComplete(id) {
        },

        markIncomplete(id) {
        },

        completeItem(id, isComplete) {
            if (isComplete) {
                const item = this.incompleteItems.find(item => item.id === id);
                this.completeItems.push(item);
                this.incompleteItems.splice(this.incompleteItems.indexOf(item), 1);
            } else {
                const item = this.completeItems.find(item => item.id === id);
                this.incompleteItems.push(item);
                this.completeItems.splice(this.completeItems.indexOf(item), 1);
            }
        },

        something(event) {
            console.log(event);
        },
    },

    created() {
        axios
            .get('/items')
            .then(response => this.incompleteItems = response.data);
    },

    mounted() {
        console.log('Component mounted.')
    },
}
</script>
