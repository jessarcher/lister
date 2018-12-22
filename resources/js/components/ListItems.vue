<template>
    <div class="">
        <div class="flex px-4 items-center my-2">
            <input
                type="text"
                v-model="listName"
                class="text-xl font-bold flex-grow bg-transparent py-1 truncate"
            >
            <i v-if="syncing" class="fas fa-sync-alt fa-spin text-grey-darker text-xl ml-2"></i>
        </div>

        <div v-if="loading" class="text-center p-5">
            <i class="fas fa-spinner fa-pulse text-5xl"></i>
        </div>

        <div v-else>
            <draggable v-if="items.length" v-model="items" :options="{handle: '.drag-handle', animation: 150}" :no-transition-on-drag="true" @start="drag=true" @end="drag=false">
                <transition-group :name="!drag? 'list' : null">
                    <list-item v-for="(item, index) in items" :key="index" :item="item"></list-item>
                </transition-group>
            </draggable>

            <div v-else class="text-center">
                <nothing-to-display class="w-1/2 h-auto mb-2"></nothing-to-display>
            </div>

            <div class="flex pt-2 px-4 mb-4">
                <input
                    type="text"
                    v-model="newItemName"
                    :placeholder="'Add ' + (items.length ? 'another' : 'your first') + ' item...'"
                    @keyup.enter="addItem"
                    class="flex-grow min-w-0 bg-transparent p-1 mr-2 truncate"
                    dusk="add-new-item-input"
                >

                <button @click="addItem" class="border rounded border-grey py-1 px-3 text-sm" dusk="add-new-item-button">
                    Add
                </button>
            </div>
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
import { mapState } from 'vuex'
import draggable from 'vuedraggable'
import NothingToDisplay from './NothingToDisplay';
import ListItem from './ListItem';

export default {
    components: {
        draggable,
        ListItem,
        NothingToDisplay,
    },

    data() {
        return {
            drag: false,
            newItemName: '',
        }
    },

    computed: {
        ...mapState('items', [
            'loading',
            'syncing',
        ]),

        list() {
            return this.$store.getters['lists/byUuid'](this.$route.params.list_id)
        },

        listName: {
            get() {
                return this.list.name
            },

            set(name) {
                this.$store.dispatch('lists/update', { list: this.list, name: name })
            },
        },

        items: {
            get() {
                return this.$store.state.items.all;
            },

            set(items) {
                this.$store.dispatch('items/updateAll', items)
            }
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
