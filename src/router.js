
import Vue from 'vue'
import Router from 'vue-router'

import Index from './views/Index.vue'
import Menu from './views/Menu.vue'
import Task1 from './views/Task1.vue'
import Task2 from './views/Task2.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            components: { default: Index, menu: Menu },
            props: {}
        },
        {
            path: '/task1',
            name: 'task1',
            components: { default: Task1, menu: Menu },
            props: {}
        },
        {
            path: '/task2',
            name: 'task2',
            components: { default: Task2, menu: Menu },
            props: {}
        }
    ]
})
