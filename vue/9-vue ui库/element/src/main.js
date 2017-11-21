import Vue from 'vue'
import App from './App.vue'
import vueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.css'

import routes from './router.config.js'
import VueTree from './components/tree/index.js'

Vue.use(ElementUI);
Vue.use(vueRouter);
Vue.use(VueTree);

//如果vuerouter需要多个配置 传参为对象时 routes文件内需要直接导出数组 而不是对象
const router = new vueRouter({routes});

let vm = new Vue({
    el: '#app',
    router,
    render: h => h(App)
})