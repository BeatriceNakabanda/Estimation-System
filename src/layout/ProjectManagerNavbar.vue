<template>
    <base-nav class="navbar-top navbar-dark"
              id="navbar-main"
              :show-toggle-button="false"
              expand>
        <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
           
        </form>
          <ul class="navbar-nav align-items-left d-none d-md-flex text-white" id="cursor">
              <li class="nav-item dropdown">
                  <div class="media align-items-center pr-0" slot="title">
                  <span class="avatar avatar-sm rounded-circle mb-2">
                    <img alt="Image placeholder" src="../assets/avatar image.png">
                  </span>
                      <div class="media-body ml-2 d-none d-lg-block">
                          <span class="mb-0 text-sm-left font-weight-bold">David Pereira
                          </span>
                          <span class="mb-0 text-sm-left">
                            <br><small>Project Manager</small>
                          </span>
                      </div>
                  </div>
              </li>
          </ul>
    </base-nav>
</template>
<script>
  export default {
    data() {
      return {
        activeNotifications: false,
        showMenu: false,
        searchQuery: ''
      };
    },
    methods: {
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
      }
    }
  };
</script>
<style>
#cursor{
  cursor: auto;
}
</style>
