import { handleAxiosGetError, handleAxiosPostError } from '../../helpers.js'
import uuid from 'uuid/v4'

export default {
    namespaced: true,

    state: {
        all: [],
        loading: false,
        syncing: false,
        failed: false,
    },

    mutations: {
        setLoading(state, loading) {
            state.loading = loading;
        },

        setSyncing(state, syncing) {
            state.syncing = syncing;
        },

        setFailed(state, failed) {
            state.failed = failed;
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

        remove(state, item) {
            state.all.splice(state.all.indexOf(item), 1)
        },

        updateAll(state, items) {
            state.all = items;
        },
    },

    actions: {
        fetch({ commit }, listId) {
            commit('setLoading', true);
            commit('setFailed', false);

            commit('populate', []);

            axios
                .get('/api/lists/' + listId + '/items')
                .then(response => commit('populate', response.data.data))
                .catch(error => {
                    handleAxiosGetError(error)

                    commit('setFailed', true);
                })
                .then(() => commit('setLoading', false));
        },

        add({ commit, state }, item) {
            item.uuid = uuid();
            item.order = state.all.length + 1;

            commit('add', item);

            commit('setSyncing', true)

            axios
                .post('/api/lists/' + item.list_id + '/items', {
                    uuid: item.uuid,
                    name: item.name,
                    order: item.order
                })
                // .then(response => commit('update', {
                //     item,
                //     uuid: response.data.data.uuid,
                // }))
                .catch(error => {
                    handleAxiosPostError(error);

                    // If the sever responded with an error or not request was made, background-sync won't add it later
                    if (error.response || ! error.request) {
                        commit('remove', item)
                    }
                })
                .then(() => commit('setSyncing', false))
        },

        update({ commit }, { item, name = item.name, complete = item.complete }) {
            let original = {
                name: item.name,
                complete: item.complete,
            };

            commit('update', { item, name, complete})

            commit('setSyncing', true)

            axios
                .put('/api/items/' + item.uuid, {
                    name,
                    complete,
                })
                .catch(error => {
                    handleAxiosPostError(error)

                    // If the sever responded with an error or not request was made, background-sync won't update it later
                    if (error.response || ! error.request) {
                        commit('update', { item, ...original })
                    }
                })
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
                .catch(error => handleAxiosPostError(error))
                .then(() => commit('setSyncing', false));
        },

        remove({ commit }, item) {
            commit('remove', item);

            commit('setSyncing', true);

            axios
                .delete('/api/items/' + item.uuid)
                .catch(error => {
                    handleAxiosPostError(error);

                    // If the sever responded with an error or not request was
                    // made, background-sync won't remove it later so we need to
                    // add it back
                    if (error.response || ! error.request) {
                        commit('add', item)
                    }
                })
                .then(() => commit('setSyncing', false));
        }
    },
}
