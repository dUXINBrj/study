import Vue from 'vue'
import App from './App.vue'
import vueRouter from 'vue-router'
import axios from 'axios';
import "babel-polyfill";
import {
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Loading,
    Tree,
    Col,
    Row,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    MenuItem,
    Input,
    Card,
    Button,
    Table,
    TableColumn,
    Select,
    Option
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.css'
import './assets/css/animate.css'

import routes from './router.config.js'

Vue.use(vueRouter);
const BASE_URL = 'http://localhost:8086/static/store';
axios.defaults.baseURL=BASE_URL;
Vue.prototype.$http = axios;


Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Loading);
Vue.use(Tree);
Vue.use(Col);
Vue.use(Row);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Container);
Vue.use(Input);
Vue.use(Card);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Select);
Vue.use(Option);

const router = new vueRouter({ routes });

let vm = new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
