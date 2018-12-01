<template>
    <div class="bg-white shadow rounded py-4">
        <h1 class="text-uppercase text-base text-grey-darker pb-2 px-4">
            My List
            <i v-if="syncing" class="fas fa-sync-alt fa-spin text-grey-darker text-base"></i>
        </h1>

        <draggable v-model="items" :options="{handle: '.drag-handle', animation: 150}" :no-transition-on-drag="true" @start="drag=true" @end="drag=false">
            <transition-group :name="!drag? 'list' : null">
                <list-item v-for="(item, index) in items" :key="index" :item="item"></list-item>
            </transition-group>
        </draggable>

        <div class="flex pt-2 px-4">
            <input
                type="text"
                v-model="newItemName"
                placeholder="Add a new item..."
                @keyup.enter="addItem"
                class="flex-grow min-w-0"
                dusk="add-new-item-input"
            >

            <button @click="addItem" class="border rounded border-grey py-1 px-3 text-sm" dusk="add-new-item-button">
                Add
            </button>
        </div>
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
                return this.$store.state.items.all;
            },

            set(items) {
                this.$store.dispatch('items/updateAll', items)
            }
        },

        syncing() {
            return this.$store.state.items.syncing;
        },
    },

    methods: {
        addItem() {
            if (this.newItemName.trim().length == 0) {
                return;
            }

            this.$store.dispatch('items/add', {
                name: this.newItemName,
                list_id: this.$route.params.list_id,
            })

            this.newItemName = '';
        },
    },

    created() {
        this.$store.dispatch('items/fetch', this.$route.params.list_id);
    },
}
</script>
