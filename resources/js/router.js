import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/Home';
import ListItems from './components/ListItems';

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        { path: '/', component: Home },
        { path: '/lists/:list_id', component: ListItems },
    ],
});
