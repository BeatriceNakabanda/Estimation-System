<template>
    <base-nav class="navbar-top navbar-dark"
              id="navbar-main"
              :show-toggle-button="false"
              expand>
        <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
           
        </form>
        <ul class="navbar-nav align-items-left d-none d-md-flex">

         <span class="avatar avatar-sm mb-2">
                  <img alt="Image placeholder"  src="../assets/user.png">
                </span>
            <!-- <li class="nav-item dropdown">

                <base-dropdown class="nav-link pr-0">
                    <div class="media align-items-center" slot="title">
                <span class="avatar avatar-md mb-2">
                  <img alt="Image placeholder" src="../assets/images.jpeg">
                </span>
                        <div class="media-body ml-2 d-none d-lg-block" id="left">
                            <span class="mb-0 text-sm font-weight-bold">David Pereira
                            </span>
                            <span class="mb-0 text-sm font-weight-bold">
                              <small><br>Project Manager</small>
                            </span>
                        </div>
                    </div>

                    <template>
                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0">Welcome !</h6>
                        </div>
                        
                        <div class="dropdown-divider"></div>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-user-run"></i>
                            <span>Logout</span>
                        </router-link>
                    </template>
                </base-dropdown>
            </li> -->
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
#left{
  text-align: left;
}
.avatar {
  border: none;
}
</style>
