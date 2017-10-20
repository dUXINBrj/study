import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routerConfig from './router.config'

Vue.use(VueRouter);
//导入组件
const router = new VueRouter();

router.map(routerConfig);


router.redirect({
    '/': '/home'
});

router.start(App, '#app');