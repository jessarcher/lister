import Vue from 'vue'
import Vuex from 'vuex'
import items from './modules/items'

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',

    modules: {
        items,
    },
});
