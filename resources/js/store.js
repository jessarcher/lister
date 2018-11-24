import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',

    state: {
        items: [],
        syncing: false,
    },

    mutations: {
        populateItems(state, items) {
            state.items = items;
        },

        addItem(state, newItem) {
            state.items.push(newItem);
        },

        updateItem(state, updatedItem) {
            const index = state.items.findIndex(existingItem => existingItem.id === updatedItem.id);

            state.items.splice(index, 1, updatedItem);
        },

        updateItems(state, updatedItems) {
            state.items = updatedItems;
        },

        deleteItem(state, id) {
            const index = state.items.findIndex(item => item.id === id);

            state.items.splice(index, 1)
        },

        setSyncing(state, syncing) {
            state.syncing = syncing;
        },
    },

    actions: {
        fetchItems(context) {
            context.commit('setSyncing', true);

            axios
                .get('/api/items')
                .then(response => context.commit('populateItems', response.data.data))
                .catch(errors => console.error(errors))
                .then(() => context.commit('setSyncing', false));
        },

        addItem(context, item) {
            context.commit('setSyncing', true);

            axios
                .post('/api/items', {
                    name: item.name,
                    order: context.state.items.length + 1,
                })
                .then(response => context.commit('addItem', response.data.data))
                .catch(errors => console.error(errors))
                .then(() => context.commit('setSyncing', false));
        },

        updateItem(context, item) {
            context.commit('setSyncing', true);

            axios
                .put('/api/items/' + item.id, {
                    name: item.name,
                    complete: item.complete,
                })
                .then(response => context.commit('updateItem', response.data.data))
                .catch(errors => console.error(errors))
                .then(() => context.commit('setSyncing', false));
        },

        updateItems(context, items) {
            const itemsWithUpdatedOrder = items.map((item, index) => ({
                ...item,
                order: index + 1,
            }));

            const previousItems = _.keyBy(context.state.items, 'id');

            const changedItems = itemsWithUpdatedOrder
                .filter(item => {
                    return previousItems[item.id].order !== item.order;
                })
                .map(item => ({
                    id: item.id,
                    order: item.order,
                }));

            context.dispatch('updateItemOrders', changedItems);

            context.commit('updateItems', itemsWithUpdatedOrder);
        },

        updateItemOrders(context, newItemOrders) {
            context.commit('setSyncing', true);

            axios
                .patch('/api/items/', newItemOrders)
                .catch(errors => console.error(errors))
                .then(() => context.commit('setSyncing', false));
        },

        deleteItem(context, id) {
            context.commit('setSyncing', true);

            axios
                .delete('/api/items/' + id)
                .then(response => context.commit('deleteItem', id))
                .catch(errors => console.error(errors))
                .then(() => context.commit('setSyncing', false));
        }
    },
});
