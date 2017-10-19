import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.use(VueRouter);
//导入组件
import Home from './components/Home.vue'
import News from './components/News.vue'
import Login from './components/Login.vue'
import Reg from './components/Reg.vue'
import Detail from './components/Detail.vue'
const router = new VueRouter();

router.map({
    '/home': {
        component: Home,
        subRoutes: {
            '/login': {
                component: Login
            },
            '/reg': {
                component: Reg
            }
        }
    },
    '/news': {
        component: News,
        subRoutes: {
            'detail/:id': {
                component: Detail
            }
        }
    }
});


router.redirect({
    '/': '/home'
});

router.start(App, '#app');