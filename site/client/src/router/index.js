import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Register from '@/components/Register'
import Team from '@/components/Team'
import TopTeamStats from '@/components/TopTeamStats'
import Login from '@/components/Login'
import NotFound from '@/components/NotFound'

Vue.use(Router)

const router = new Router({
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
      component: Index,
      meta: {title: 'Home'}
    },
    {
      path:'/stats/teams',
      name: 'topTeamStats',
      component: TopTeamStats
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: NotFound
    },
    {
      path: '*',
      redirect: 'not-found'
    }
  ],
  beforeRouteUpdate (to, from, next){
    this.name = to.params.name;
    next();
  }
})



const defaultTitle = 'Football Stats';
router.afterEach((to, from) => {
  document.title = to.meta.title || defaultTitle;
});


export default router;
