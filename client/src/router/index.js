import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Register from '@/components/Register'
import Team from '@/components/Team'

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
      path: '*',
      redirect: 'index'
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
