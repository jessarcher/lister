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

        addItem(state, item) {
            state.items.push(item)
        },

        updateItem(state, { item, name = item.name, complete = item.complete, uuid = item.uuid }) {
            item.name = name
            item.complete = complete
            Vue.set(item, 'uuid', uuid)
        },

        deleteItem(state, item) {
            state.items.splice(state.items.indexOf(item), 1)
        },

        updateItems(state, updatedItems) {
            state.items = updatedItems;
        },

        setSyncing(state, syncing) {
            state.syncing = syncing;
        },
    },

    actions: {
        fetchItems({ commit }) {
            commit('setSyncing', true);

            axios
                .get('/api/items')
                .then(response => commit('populateItems', response.data.data))
                .catch(errors => console.error(errors))
                .then(() => commit('setSyncing', false));
        },

        addItem({ commit, state }, item) {
            item.order = state.items.length + 1;

            commit('addItem', item);

            commit('setSyncing', true)

            axios
                .post('/api/items', {
                    name: item.name,
                    order: item.order
                })
                .then(response => commit('updateItem', {
                    item,
                    uuid: response.data.data.uuid,
                }))
                .catch(errors => {
                    console.error(errors)
                    alert('Couldn\'t save item')
                    commit('deleteItem', item)
                })
                .then(() => commit('setSyncing', false))
        },

        updateItem({ commit }, { item, name = item.name, complete = item.complete }) {
            commit('updateItem', { item, name, complete})

            commit('setSyncing', true)

            axios
                .put('/api/items/' + item.uuid, {
                    name,
                    complete,
                })
                .catch(errors => console.error(errors))
                .then(() => commit('setSyncing', false));
        },

        toggleItem({ dispatch }, item) {
            dispatch('updateItem', { item, complete: !item.complete })
        },

        updateItems(context, items) {
            console.log('updateItems');
            const itemsWithUpdatedOrder = items.map((item, index) => ({
                ...item,
                order: index + 1,
            }));

            const previousItems = _.keyBy(context.state.items, 'uuid');

            const changedItems = itemsWithUpdatedOrder
                .filter(item => {
                    return previousItems[item.uuid].order !== item.order;
                })
                .map(item => ({
                    uuid: item.uuid,
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

        deleteItem({ commit }, item) {
            commit('deleteItem', item);

            commit('setSyncing', true);

            axios
                .delete('/api/items/' + item.uuid)
                .catch(errors => {
                    console.error(errors)
                    alert('Couldn\'t delete item')
                    // Add the item back
                    commit('addItem', item)
                })
                .then(() => commit('setSyncing', false));
        }
    },
});
