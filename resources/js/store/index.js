import Vue from 'vue'
import Vuex from 'vuex'
import lists from './modules/lists'
import items from './modules/items'

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',

    modules: {
        lists,
        items,
    },
});
