import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        { path: '/', component: require('./components/Lists') },
        { path: '/lists/:id', component: require('./components/List') },
    ],
});
