import Vue from 'vue'
import Router from 'vue-router'
import ProjectManagerLayout from '@/layout/ProjectManagerLayout'
import DeveloperLayout from '@/layout/DeveloperLayout' 
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    // routes for project manager 
        {
          path: '/',
          redirect: 'estimates',
          component: ProjectManagerLayout,
          children: [
        {
          path: '/estimates',
          name: 'Estimates',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Estimates.vue')
        },
        {
          path: '/projects',
          name: 'Projects',
          component: () => import(/* webpackChunkName: "demo" */ './views/Projects.vue')
        },
        {
          path: '/developers',
          name: 'Developers',
          component: () => import(/* webpackChunkName: "demo" */ './views/Developers.vue')
        },
       
        
      ]
    },
    // routes for login
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
       
      ]
    },
    //routes for developer
    {
      path: '/',
      redirect: 'pending',
      component: DeveloperLayout,
      children: [
    {
      path: '/pending',
      name: 'Pending Estimates',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "demo" */ './views/PendingEstimates.vue')
    },
    {
      path: '/drafts',
      name: 'Drafts Estimates',
      component: () => import(/* webpackChunkName: "demo" */ './views/DraftedEstimates.vue')
    },
    {
      path: '/submitted',
      name: 'submitted Estimates',
      component: () => import(/* webpackChunkName: "demo" */ './views/SubmittedEstimates.vue')
    },
    
  ]
},
  ]
})
