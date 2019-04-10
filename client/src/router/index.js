import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Register from '@/components/Register'
import Team from '@/components/Team'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/team/:team',
      name: 'team',
      component: Team
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '*',
      redirect: 'index'
    }
  ]
})
