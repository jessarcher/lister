import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        items: [],
    },

    mutations: {
        populateItems(state, items) {
            state.items = items;
        },

        addItem(state, newItem) {
            state.items.unshift(newItem);
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
        }
    },

    actions: {
        fetchItems(context) {
            axios
                .get('/api/items')
                .then(response => context.commit('populateItems', response.data.data))
                .catch(errors => console.error(errors));
        },

        addItem(context, item) {
            axios
                .post('/api/items', {
                    name: item.name,
                })
                .then(response => context.commit('addItem', response.data.data))
                .catch(errors => console.error(errors));
        },

        updateItem(context, item) {
            axios
                .put('/api/items/' + item.id, {
                    name: item.name,
                })
                .then(response => context.commit('updateItem', response.data.data))
                .catch(errors => console.error(errors));
        },

        updateItems(context, items) {
            // TODO: This needs to update the back-end, ideally without sending
            // absolutely everything.
            context.commit('updateItems', items);
        },

        deleteItem(context, id) {
            axios
                .delete('/api/items/' + id)
                .then(response => context.commit('deleteItem', id))
                .catch(errors => console.error(errors));
        }
    },
});
