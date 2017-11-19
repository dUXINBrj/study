import Container from './components/Container.vue'
import Login from './components/login/Login.vue'
import Dashboard from './components/dashboard/Dashboard.vue'
import Level1map from './components/level1map/Level1map.vue'

export default[
        {path:'*',redirect:'/login'},
        {path:'/login',component:Login},
        {path:'/index',redirect:'/index/dashboard',component:Container,children:[
            {path:'/index/dashboard',component:Dashboard},        
            {path:'/index/level1map',component:Level1map},        
        ]}
    ]