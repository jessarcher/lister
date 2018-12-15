export default {
    namespaced: true,

    state: {
        all: [],
        loading: false,
        syncing: false,
    },

    mutations: {
        setLoading(state, loading) {
            state.loading = loading;
        },

        setSyncing(state, syncing) {
            state.syncing = syncing;
        },

        populate(state, items) {
            state.all = items;
        },

        add(state, item) {
            state.all.push(item)
        },

        update(state, { item, name = item.name, complete = item.complete, uuid = item.uuid }) {
            item.name = name
            item.complete = complete
            Vue.set(item, 'uuid', uuid)
        },

        delete(state, item) {
            state.all.splice(state.all.indexOf(item), 1)
        },

        updateAll(state, items) {
            state.all = items;
        },
    },

    actions: {
        fetch({ commit }, listId) {
            commit('setLoading', true);

            axios
                .get('/api/lists/' + listId + '/items')
                .then(response => commit('populate', response.data.data))
                .catch(errors => console.error(errors))
                .then(() => commit('setLoading', false));
        },

        add({ commit, state }, item) {
            item.order = state.all.length + 1;

            commit('add', item);

            commit('setSyncing', true)

            axios
                .post('/api/lists/' + item.list_id + '/items', {
                    name: item.name,
                    order: item.order
                })
                .then(response => commit('update', {
                    item,
                    uuid: response.data.data.uuid,
                }))
                .catch(errors => {
                    console.error(errors)
                    alert('Couldn\'t save item')
                    commit('delete', item)
                })
                .then(() => commit('setSyncing', false))
        },

        update({ commit }, { item, name = item.name, complete = item.complete }) {
            commit('update', { item, name, complete})

            commit('setSyncing', true)

            axios
                .put('/api/items/' + item.uuid, {
                    name,
                    complete,
                })
                .catch(errors => console.error(errors))
                .then(() => commit('setSyncing', false));
        },

        toggle({ dispatch }, item) {
            dispatch('update', { item, complete: !item.complete })
        },

        updateAll({ state, commit, dispatch }, items) {
            const itemsWithUpdatedOrder = items.map((item, index) => ({
                ...item,
                order: index + 1,
            }));

            const previousItems = _.keyBy(state.all, 'uuid');

            const changedItems = itemsWithUpdatedOrder
                .filter(item => {
                    return previousItems[item.uuid].order !== item.order;
                })
                .map(item => ({
                    uuid: item.uuid,
                    order: item.order,
                }));

            dispatch('updateOrders', changedItems);

            commit('updateAll', itemsWithUpdatedOrder);
        },

        updateOrders({ commit }, newOrders) {
            commit('setSyncing', true);

            axios
                .patch('/api/items/', newOrders)
                .catch(errors => console.error(errors))
                .then(() => commit('setSyncing', false));
        },

        delete({ commit }, item) {
            commit('delete', item);

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
}
