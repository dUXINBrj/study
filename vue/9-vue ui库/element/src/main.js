import Vue from 'vue'
import App from './App.vue'
import vueRouter from 'vue-router'
import axios from 'axios';
import "babel-polyfill";
import BaiduMap from 'vue-baidu-map';
import {
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
    Option,
    Icon,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Message,
    DatePicker,
    Tabs,
    TabPane,
    Tooltip,
    Pagination
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.css'
import './assets/css/animate.css'
import config from './config.js'

import routes from './router.config.js'

Vue.use(vueRouter);
Vue.use(BaiduMap, {
  ak: 'zwVpEq7Soe6T65PiCynLj5qeGfnSFcjU'
});
Vue.prototype.$lib = config;
axios.defaults.baseURL=config.baseUrl;
Vue.prototype.$http = axios;
Vue.prototype.$msg=Message;


Vue.use(Loading);
Vue.use(Tree);
Vue.use(Col);
Vue.use(Row);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Input);
Vue.use(Card);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Select);
Vue.use(Option);
Vue.use(Icon);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(DatePicker);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tooltip);
Vue.use(Pagination);

const router = new vueRouter({ routes });

let vm = new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
