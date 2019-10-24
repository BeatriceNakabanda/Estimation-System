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
            name: 'Estimates',
            icon: 'ni ni-bullet-list-67 text-primary',
            path: '/estimates'
          }"
        />
        <sidebar-item :link="{name: 'Projects', icon: 'ni ni-books text-blue', path: '/projects'}"/>
        <sidebar-item :link="{name: 'Developers', icon: 'fa fa-users text-blue', path: '/developers'}"/>
        <!-- <sidebar-item :link="{name: 'Login', icon: 'ni ni-key-25 text-info', path: '/login'}"/> -->

      </template>
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
</style>
