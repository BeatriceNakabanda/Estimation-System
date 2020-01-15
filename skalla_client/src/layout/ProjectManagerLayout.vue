<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="skala"
      title="skala"
      id="sidenav" 
    >
      <template slot="links" >
        <sidebar-item :link="{name: 'Estimates', icon: 'ni ni-bullet-list-67 text-primary', path: '/estimates'}"/>
        <sidebar-item  :link="{name: 'Drafts', icon: 'ni ni-box-2 text-blue', path: '/draftrequests'}"/>
        <sidebar-item  :link="{name: 'Projects', icon: 'ni ni-books text-blue', path: '/projects'}"/>
        <sidebar-item  :link="{name: 'Developers', icon: 'fa fa-users text-blue', path: '/developers'}"/>
        <div id="signout-position" @click="logout">
          <!-- <router-link  to="/login" > -->
              <i class="ni ni-user-run text-white" aria-hidden="true" >&nbsp;&nbsp;&nbsp;Sign Out</i>
        <!-- </router-link> -->
        </div>
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <project-manager-navbar></project-manager-navbar>

      <div class="main" @click="toggleSidebar">
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
  import router from '../router';
  // import axios from "axios"

  export default {
    components: {
      ProjectManagerNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'vue', //vue|blue|orange|green|red|primary
        role: '',
        secretMessage: ''

      };
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
        
      },
      logout() {
      this.$store.dispatch('logout');
      router.push('/');
    }
    }
  };
</script>
<style lang="scss">

#signout-position{
  background-color: #5E72E4;
  padding-left: 28px;
  padding-top: 15px;
  padding-bottom: 36px;
  position: absolute;
  width: 100%;
  height: 6%;
  bottom: 0px;
  left: 0;
 
}
// .main{
//   padding-top: 1000px;
// }
</style>
