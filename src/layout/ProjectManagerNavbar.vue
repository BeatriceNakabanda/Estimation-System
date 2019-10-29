<template>
    <base-nav class="navbar-top navbar-dark"
              id="navbar-main"
              :show-toggle-button="false"
              expand>
        <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
           
        </form>
        <ul class="navbar-nav align-items-left d-none d-md-flex">

          <div class="users">
            <span class="avatar avatar-sm mb-1" > 
                <img alt="Image placeholder"  id="user-image" src="../assets/user.png">
            </span> 
           
            <div class="user ml-2" >
              <p class=" text-sm font-weight-bold" id="user-name">David Pereira
              </p>
              <p class="text-sm " >
                Project Manager
              </p>
            </div>
          </div>
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

.users{
  margin-top: 0px;
  padding-top: 2px;
  
}
#user-image{
  border: none;
}
.user{
  color: #fff;
  float: right;
}
#user-name{
  margin-bottom: -4px;
}
.avatar {
  border: none;
}


</style>
