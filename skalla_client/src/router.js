import Vue from "vue";
import Router from "vue-router";
import ProjectManagerLayout from "@/layout/ProjectManagerLayout";
import DeveloperLayout from "@/layout/DeveloperLayout";
import AuthLayout from "@/layout/AuthLayout";
import store from "../src/store";
Vue.use(Router);

//  created() {
//   if (!this.$store.getters.isLoggedIn) {
//     router.push('/')
//   }else{
//     this.name = this.$store.getters.getUser.name
//     this.role = this.$store.getters.getUser.role
//     console.log(this.role)
//   }
//  }
export default new Router({
  linkExactActiveClass: "active",
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // routes for login
    {
      path: "/",
      redirect: "login",
      component: AuthLayout,
      children: [
        {
          path: "/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/Login.vue")
        }
      ]
    },
    // routes for project manager
    {
      path: "/estimates",
      redirect: "estimates",
      component: ProjectManagerLayout,
      children: [
        {
          path: "/estimates",
          name: "Estimates",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/Estimates.vue"),
          children: [
            {
              path: "/edit-estimate",
              // name: 'Estimate',
              component: () =>
                import(
                  /* webpackChunkName: "demo" */ "./views/Forms/EditEstimateForm.vue"
                )
            }
          ]
        },
        {
          path: "/draftrequests",
          name: "Drafts",
          component: () =>
            import(
              /* webpackChunkName: "demo" */ "./views/DraftsProjectManager.vue"
            )
        },
        {
          path: "/projects",
          name: "Projects",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/Projects.vue")
        },
        {
          path: "/developers",
          name: "Developers",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/Developers.vue")
        },
        {
          path: "/view-estimate/:id",
          name: "View Estimate",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/ViewEstimate.vue")
        }
      ]
    },
    //routes for developer
    {
      path: "/",
      redirect: "pending-estimates",
      component: DeveloperLayout,
      children: [
        {
          path: "/pending-estimates",
          name: "Pending Estimates",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "demo" */ "./views/PendingEstimates.vue"
            )
        },
        {
          path: "/view-pending-estimate/:id",
          name: "Pending Estimate",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/PendingEstimate.vue")
        },
        {
          path: "/view-submitted-estimate/:id",
          name: "Submitted Estimate",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/SubmittedEstimate.vue")
        },
        {
          path: "/drafts",
          name: "Draft Estimates",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/Drafts.vue")
        },
        {
          path: "/submitted",
          name: "Submitted Estimates",
          component: () =>
            import(
              /* webpackChunkName: "demo" */ "./views/SubmittedEstimates.vue"
            )
        },
        {
          path: "/estimate-details",
          name: "estimate Details",
          component: () => import("./views/EstimateDetails.vue")
        }
      ]
    }
  ]
});
// router.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ['/login']
//   const authRequired = !publicPages.includes(to.path)
//   const loggedIn = this.$store.getUser('user')

//   if(authRequired && !loggedIn){
//     return next('/login')
//   }
//   next()
// })
