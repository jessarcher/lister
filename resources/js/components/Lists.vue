<template>
    <div class="bg-white shadow rounded py-4 mb-4">
        <h1 class="text-uppercase text-base text-grey-darker pb-2 px-4">
            My Lists
            <i v-if="syncing" class="fas fa-sync-alt fa-spin text-grey-darker text-base"></i>
        </h1>

        <draggable v-model="lists" :options="{handle: '.drag-handle', animation: 150}" :no-transition-on-drag="true" @start="drag=true" @end="drag=false">
            <transition-group :name="!drag? 'list' : null">
                <list v-for="(list, index) in lists" :key="index" :list="list"></list>
            </transition-group>
        </draggable>

        <div class="flex pt-2 px-4">
            <input
                type="text"
                v-model="newListName"
                placeholder="Add a new list..."
                @keyup.enter="addList"
                class="flex-grow min-w-0"
                dusk="add-new-list-input"
            >

            <button @click="addList" class="border rounded border-grey py-1 px-3 text-sm" dusk="add-new-list-button">
                Add
            </button>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'

import List from './List';

export default {
    components: {
        draggable,
        List,
    },

    data() {
        return {
            drag: false,
            newListName: '',
        }
    },

    computed: {
        lists: {
            get() {
                return this.$store.state.lists.all;
            },

            set(lists) {
                this.$store.dispatch('lists/updateAll', lists)
            }
        },

        syncing() {
            return this.$store.state.lists.syncing;
        },
    },

    methods: {
        addList() {
            if (this.newListName.trim().length == 0) {
                return;
            }

            this.$store.dispatch('lists/add', {
                name: this.newListName,
            })

            this.newListName = '';
        },
    },

    created() {
        this.$store.dispatch('lists/fetch');
    },
}
</script>
