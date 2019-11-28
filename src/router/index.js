import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Login from '@/views/login'
import Resign from '@/views/resign'
import News from '@/views/news'
import Group from '@/views/group'
import Person from '@/views/person'
import Message from '@/views/message' 

Vue.use(Router)

export default new Router({
  // linkActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/resign',
      name: 'resign',
      component: Resign
    },
    {
      path: '/news',
      name: 'news',
      component: News,
      children: [
        {
          path: '',
          name: 'message',
          component: Message
        },
        {
          path: '/group',
          name: 'group',
          component: Group
        },
        {
          path: '/person',
          name: 'person',
          component: Person
        }
      ]
    },
  ]
})
