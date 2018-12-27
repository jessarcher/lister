<template>
    <div>
        <button @click="toggleSidebar" class="px-4 py-3 w-4 align-center">
            <i class="fa fa-times text-white"></i>
        </button>

        <h2 class="uppercase text-xs mx-4 mt-2">
            Lists
            <i v-if="syncing" class="fas fa-sync-alt fa-spin text-grey-darker text-base"></i>
        </h2>

        <div v-if="loading" class="text-center p-5">
            <i class="fas fa-spinner fa-pulse text-5xl"></i>
        </div>

        <div v-else-if="true" class="text-center p-5">
            <i class="fa fa-7x fa-exclamation-triangle mb-4"></i>
            <p class="text-lg">There was an error</p>
        </div>

        <div v-else>
            <hr class="mb-0">

            <draggable v-if="lists.length" v-model="lists" :options="{handle: '.drag-handle', animation: 150}" :no-transition-on-drag="true" @start="drag=true" @end="drag=false">
                <transition-group :name="!drag? 'list' : null">
                    <list v-for="(list, index) in lists" :key="list.uuid" :list="list"></list>
                </transition-group>
            </draggable>

            <div v-else class="text-center">
                <nothing-to-display class="w-1/2 h-auto mb-2"></nothing-to-display>
            </div>

            <div class="flex pt-2 px-4 mb-4">
                <input
                    type="text"
                    v-model="newListName"
                    :placeholder="'Add ' + (lists.length ? 'another' : 'your first') + ' list...'"
                    @keyup.enter="addList"
                    class="flex-grow min-w-0 bg-transparent p-1 mr-2 truncate text-grey-light"
                    dusk="add-new-list-input"
                >

                <button @click="addList" class="border rounded border-grey-dark py-1 px-3 text-sm text-grey-light" dusk="add-new-list-button">
                    Add
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
hr {
    border-top: 1px solid config('colors.black');
    border-bottom: 1px solid config('colors.grey-darker');
}
</style>

<script>
import { mapState, mapMutations } from 'vuex'
import draggable from 'vuedraggable'
import List from './List';
import NothingToDisplay from './NothingToDisplay';

export default {
    components: {
        draggable,
        List,
        NothingToDisplay
    },

    data() {
        return {
            drag: false,
            newListName: '',
        }
    },

    computed: {
        ...mapState([
            'showSidebar',
        ]),

        ...mapState('lists', [
            'loading',
            'syncing',
            'failed',
        ]),

        lists: {
            get() {
                return this.$store.state.lists.all;
            },

            set(lists) {
                this.$store.dispatch('lists/updateAll', lists)
            }
        },
    },

    methods: {
        ...mapMutations([
            'toggleSidebar',
        ]),

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
        // this.$store.dispatch('lists/fetch');
    },
}
</script>
