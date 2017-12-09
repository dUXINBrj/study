import Container from './components/Container.vue'
import Login from './components/login/Login.vue'
import Dashboard from './components/dashboard/Dashboard.vue'
import Level1map from './components/level1map/Level1map.vue'
import Fire from './components/Fire/Fire.vue'
import Warning from './components/warning/Warning.vue'
import Error from './components/Error/Error.vue'
import NotFoundComponent from './components/404/404.vue'

export default[
        // {path:'/login',component:Login},
        {path:'/index',redirect:'/index/dashboard',component:Container,children:[
          {path:'/index/dashboard',component:Dashboard},
          {path:'/index/level1map',component:Level1map},
          {path:'/index/fire',component:Fire},
          {path:'/index/warning',component:Warning},
          {path:'/index/error',component:Error}
        ]},
        {path: '*', component: NotFoundComponent}
]
