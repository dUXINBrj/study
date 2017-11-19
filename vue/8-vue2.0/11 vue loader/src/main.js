import Vue from 'vue'
import vueRouter from 'vue-router'
import animate from './assets/css/animate.css'

import routes from './router.config.js'
import App from './App.vue'

Vue.use(vueRouter);

const router=new vueRouter(routes);

router.beforeEach(function (to, from, next) {
  if (to.path === '/news') { //判断此次路由要跳转的路径 并做相应的处理
  	console.log(2);
    next()
    //阻止路由跳转
    // next(false)
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
