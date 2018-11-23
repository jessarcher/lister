<template>
    <div>
        <h1>
            My List
            <span v-if="syncing">[Syncing]</span>
        </h1>

        <draggable v-model="items" :options="{handle:'.drag-handle'}" :no-transition-on-drag="true" @start="drag=true" @end="drag=false">
            <transition-group :name="!drag? 'list' : null">
                <list-item v-for="item in items" :key="item.id" :item="item"></list-item>
            </transition-group>
        </draggable>

        <input type="text" v-model="newItemName" placeholder="Add a new item..." @keyup.enter="addItem">

        <button @click="addItem">
            Add
        </button>

        <pre>{{ items }}</pre>
    </div>
</template>

<style>
.list-move {
    transition: transform 0.3s;
}
.list-enter-active, .list-leave-active {
    transition: all 0.3s;
}
.list-enter {
    opacity: 0;
    transform: translateY(30px);
}
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
.list-leave-active {
    position: absolute;
}
</style>

<script>
import draggable from 'vuedraggable'

import ListItem from './ListItem';

export default {
    components: {
        draggable,
        ListItem,
    },

    data() {
        return {
            drag: false,
            newItemName: '',
        }
    },

    computed: {
        items: {
            get() {
                return this.$store.state.items;
            },

            set(items) {
                this.$store.dispatch('updateItems', items)
            }
        },

        syncing() {
            return this.$store.state.syncing;
        },
    },

    methods: {
        addItem() {
            if (this.newItemName.trim().length == 0) {
                return;
            }

            this.$store.dispatch('addItem', {
                name: this.newItemName,
            })

            this.newItemName = '';
        },
    },

    created() {
        this.$store.dispatch('fetchItems');
    },
}
</script>
