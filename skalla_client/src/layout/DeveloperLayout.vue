<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="skala"
      title="skala"
      id="sidenav"   
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Pending',
            icon: 'ni ni-bullet-list-67 text-primary',
            path: '/pending-estimates'
          }"
        />
        <!-- <sidebar-item :link="{name: 'Drafts', icon: 'ni ni-box-2 text-blue', path: '/drafts'}"/> -->
        <sidebar-item :link="{name: 'Submitted', icon: 'ni ni-archive-2 text-blue', path: '/submitted'}"/>
        <!-- <sidebar-item :link="{name: 'Login', icon: 'ni ni-key-25 text-info', path: '/login'}"/> -->
        <div id="signout-position" @click="logout">
              <i class="ni ni-user-run text-white" aria-hidden="true">&nbsp;&nbsp;&nbsp;Sign Out</i>
        </div>
      </template> 
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <developer-navbar></developer-navbar>

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
  import DeveloperNavbar from './DeveloperNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';
  import store from '../store';
  import router from '../router';

  export default {
    components: {
      DeveloperNavbar,
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
      },
      logout() {
      store.dispatch('logout');
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
</style>
