<template>
    <div>
        <h1>My List</h1>

        <input type="text" v-model="newItemName" placeholder="Add a new item..." @keyup.enter="addItem">

        <button @click="addItem">
            Add
        </button>

        <draggable v-model="items">
            <transition-group name="list">
                <list-item v-for="item in items"
                    :key="item.id"
                    v-bind.sync="item"
                    v-on:delete-item="deleteItem"
                ></list-item>
            </transition-group>
        </draggable>

        <pre>{{ items }}</pre>
    </div>
</template>

<style>
.list-item {
  transition: all 0.3s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
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
            items: [],
            createdItems: 0,
        }
    },

    computed: {
    },

    watch: {
        items() {
            this.items.forEach((item, index) => {
                item.order = index + 1;
            });
        },
    },

    methods: {
        addItem() {
            this.items.unshift({
                id: this.createdItems,
                name: this.newItemName,
                complete: false,
            });

            this.createdItems++;
            this.newItemName = '';
        },

        deleteItem(id) {
            this.items = this.items.filter(item => item.id !== id);
        },
    },

    created() {
        axios
            .get('/items')
            .then(response => this.items = response.data.data);
    },

    mounted() {
        console.log('Component mounted.')
    },
}
</script>
