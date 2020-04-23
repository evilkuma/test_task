
import Vue from 'vue'
import router from './router'

import * as ElResize from 'vue-element-resize-event'

Vue.use(ElResize)

import App from './App.vue'

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
