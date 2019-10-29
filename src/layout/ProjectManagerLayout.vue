<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="skala"
      title="skala"
      id="sidenav" 
    >
      <template slot="links" >
        <sidebar-item 
          :link="{
            name: 'Estimates',
            icon: 'ni ni-bullet-list-67 text-primary',
            path: '/estimates'
          }"
        />
        <sidebar-item  :link="{name: 'Projects', icon: 'ni ni-books text-blue', path: '/projects'}"/>
        <sidebar-item  :link="{name: 'Developers', icon: 'fa fa-users text-blue', path: '/developers'}"/>
        <div id="signout-position">
          <router-link  to="/login" >
              <i class="ni ni-user-run text-white" aria-hidden="true">&nbsp;&nbsp;&nbsp;Sign Out</i>
        </router-link>
        <!-- <sidebar-item  :link="{name: 'Sign out', icon: 'ni ni-user-run text-white', path: '/login'}"/> -->
        </div>
      </template>
      <!-- <div id="signout-position" class="position-fixed">
        <router-link  to="/login" >
              <i class="ni ni-user-run text-white" aria-hidden="true">&nbsp;&nbsp;&nbsp;Sign Out</i>
        </router-link>
        </div> -->
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <project-manager-navbar></project-manager-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
  import ProjectManagerNavbar from './ProjectManagerNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      ProjectManagerNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
      };
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
<style lang="scss">

#signout-position{
  background-color: #5E72E4;
  padding-left: 28px;
  padding-top: 25px;
  padding-bottom: 10px;
  position: absolute;
  display: inline-block;
  width: 100%;
  bottom: 0;
  left: 0;
 
}
// #signout-position{
//   background-color: #5E72E4;
//   padding-right:116px;
//   margin-right: 200px;
//   padding-left: 2px;
//   padding-top: 8px;
//   padding-bottom: 20px;
//   color: #fff;
//   margin-top: 600px;
 
// }

</style>
