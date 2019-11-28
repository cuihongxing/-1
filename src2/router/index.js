import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/logon/logon'
// import Welcome from '@/views/welcome/welcome'
import Welcome from '@/views/welcome/welcome-zong'
import WelcomeItem from '@/views/welcome/welcome-item'
import User from '@/views/welcome-right/user'
import Roles from '@/views/welcome-right/roles'
import Rights from '@/views/welcome-right/rights'
import Reports from '@/views/welcome-right/reports'
import Orders from '@/views/welcome-right/orders'
import Categories from '@/views/welcome-right/categories'
import Params from '@/views/welcome-right/params'
import Goods from '@/views/welcome-right/goods'
import GoodsList from '@/views/welcome-right/goodslist'
import GoodsAdd from '@/views/welcome-right/goodsadd'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    { path: '/', redirect:'login'},
    { path: '/login', name: 'login', component:Login },

    { path: '/welcome', 
      name: 'welcome',
      component: Welcome,
      children:[
      { path:'', name:'welcomeitem', component:WelcomeItem },
      { path:'/users', name:'user', component:User },
      { path:'/roles', name:'roles', component:Roles },
      { path:'/rights', name:'rights', component:Rights },
      { path:'/reports', name:'reports', component:Reports },
      { path:'/orders', name:'orders', component:Orders },
      { path:'/categories', name:'categories', component:Categories },
      { path:'/params', name:'params', component:Params },
      { path:'/goods', name:'goods', component:Goods,
        children:[
          { path:'',name:'goodslist',component:GoodsList },
          { path:'/add',name:'goodsadd',component:GoodsAdd }
        ]
      }
    ]
   },
     
  ]
})
