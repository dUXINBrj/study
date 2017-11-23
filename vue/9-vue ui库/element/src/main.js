import Vue from 'vue'
import App from './App.vue'
import vueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.css'
import './assets/css/animate.css'

import routes from './router.config.js'

Vue.use(ElementUI);
Vue.use(vueRouter);

const router = new vueRouter({ routes });

let vm = new Vue({
    el: '#app',
    router,
    render: h => h(App)
})