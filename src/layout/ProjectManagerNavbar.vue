<template>
    <base-nav class="navbar-top navbar-dark"
              id="navbar-main"
              :show-toggle-button="false"
              expand>
        <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
           
        </form>
        <div class="navbar-nav align-items-left d-none d-md-flex">

          <div class="users">
            <span class="avatar avatar-sm" > 
                <img alt="Image placeholder"  id="user-image" height="38px" src="../assets/user.png">
            </span> 
           
            <div class="user ml-2" >
              <p class="text-md font-weight-bold" id="user-name">Benjamin Lutaaya
              </p>
              <p class="text-sm">
                Developer
              </p>
            </div>
          </div>
        </div>
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
  margin-bottom: -5px;
  margin-top: -5px; 
}
.user{
  color: #fff;
  float: right;
}

.avatar{
  border: 4px solid red;
}

</style>
