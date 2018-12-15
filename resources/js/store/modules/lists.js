export default {
    namespaced: true,

    state: {
        all: [],
        loading: false,
        syncing: false,
    },

    getters: {
        byUuid: (state) => (uuid) => {
            const list = state.all.find(list => list.uuid === uuid)

            if (list) {
                return list
            }

            return {}
        },
    },

    mutations: {
        setLoading(state, loading) {
            state.loading = loading;
        },

        setSyncing(state, syncing) {
            state.syncing = syncing;
        },

        populate(state, lists) {
            state.all = lists;
        },

        add(state, list) {
            state.all.push(list)
        },

        update(state, { list, name = list.name, uuid = list.uuid }) {
            list.name = name
            Vue.set(list, 'uuid', uuid)
        },

        remove(state, list) {
            state.all.splice(state.all.indexOf(list), 1)
        },

        updateAll(state, lists) {
            state.all = lists;
        },
    },

    actions: {
        fetch({ commit }) {
            commit('setLoading', true);

            axios
                .get('/api/lists')
                .then(response => commit('populate', response.data.data))
                .catch(errors => console.error(errors))
                .then(() => commit('setLoading', false));
        },

        add({ commit, state }, list) {
            list.order = state.all.length + 1;

            commit('add', list);

            commit('setSyncing', true)

            axios
                .post('/api/lists', {
                    name: list.name,
                    order: list.order
                })
                .then(response => commit('update', {
                    list,
                    uuid: response.data.data.uuid,
                }))
                .catch(errors => {
                    console.error(errors)
                    alert('Couldn\'t save list')
                    commit('remove', list)
                })
                .then(() => commit('setSyncing', false))
        },

        update({ commit }, { list, name = list.name}) {
            commit('update', { list, name})

            commit('setSyncing', true)

            axios
                .put('/api/lists/' + list.uuid, {
                    name,
                })
                .catch(errors => console.error(errors))
                .then(() => commit('setSyncing', false));
        },

        updateAll({ state, commit, dispatch }, lists) {
            const listsWithUpdatedOrder = lists.map((list, index) => ({
                ...list,
                order: index + 1,
            }));

            const previousLists = _.keyBy(state.all, 'uuid');

            const changedLists = listsWithUpdatedOrder
                .filter(list => {
                    return previousLists[list.uuid].order !== list.order;
                })
                .map(list => ({
                    uuid: list.uuid,
                    order: list.order,
                }));

            dispatch('updateOrders', changedLists);

            commit('updateAll', listsWithUpdatedOrder);
        },

        updateOrders({ commit }, newListOrders) {
            commit('setSyncing', true);

            axios
                .patch('/api/lists/', newListOrders)
                .catch(errors => console.error(errors))
                .then(() => commit('setSyncing', false));
        },

        remove({ commit }, list) {
            commit('remove', list);

            commit('setSyncing', true);

            axios
                .delete('/api/lists/' + list.uuid)
                .catch(errors => {
                    console.error(errors)
                    alert('Couldn\'t delete list')
                    // Add the list back
                    commit('add', list)
                })
                .then(() => commit('setSyncing', false));
        }
    },
}
