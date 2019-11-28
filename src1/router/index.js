import Vue from 'vue'
import Router from 'vue-router'
// 登录页面
const Login = () => import('../views/login/login.vue')
// 首页
const Welcome = () => import('../views/welcome/welcome')
// 用户管理
const Users = () => import('../views/user/user.vue')
// 权限管理
const Roles = () => import('../views/permission/roles.vue')
const Rights = () => import('../views/permission/rights.vue')
// 商品管理
const goodsList = () => import('../views/shoplist/goodsList.vue')
const Params = () => import('../views/shoplist/params.vue')
const Categories = () => import('../views/shoplist/categories.vue')
const Add = () => import('../views/shoplist/add.vue')
// 订单管理
const Orders = () => import('../views/orders/orders.vue')
// 数据统计
const Reports = () => import('../views/reports/reports.vue')
Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: '/cuihongxing/',
  routes: [
    {
      path: '/',
      redirect: '/login',
      meta: {
        title: '登录',
        keepAlive: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登录',
        keepAlive: false
      }
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/users',
      component: Users,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/roles',
      component: Roles,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/rights',
      component: Rights,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/goods',
      component: goodsList,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/add',
      component: Add,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/params',
      component: Params,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/categories',
      component: Categories,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/orders',
      component: Orders,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/reports',
      component: Reports,
      meta: {
        keepAlive: true
      }
    }
  ]
})
