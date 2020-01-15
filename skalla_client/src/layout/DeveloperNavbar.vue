<template>
    <base-nav class="navbar-top navbar-dark"
              id="navbar-main"
              :show-toggle-button="false"
              expand>
        <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
           
        </form>
              <div class="navbar-nav align-items-left d-none d-md-flex">

          <div class="users">
            <span class="avatar avatar-sm mb-1" > 
                <img alt="Image placeholder"  id="user-image" height="38px"  src="../assets/user.png">
            </span> 
           
            <div class="user ml-2" >
              <p class=" text-md font-weight-bold" id="user-name">{{ name }}
              </p>
              <p class="text-sm " >
                {{ role }}
              </p>
            </div>
          </div>
        </div>
    </base-nav>
</template>
<script>
import router from "../router"
import store from "../store"
  export default {
    data() {
      return {
        activeNotifications: false,
        showMenu: false,
        searchQuery: '',
        name: '',
        role: ''
      };
    },

    async created() {
    if (!this.$store.getters.isLoggedIn) {
      router.push('/login')
    }
    this.name = this.$store.getters.getUser.name
    this.role = this.$store.getters.getUser.role
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
  margin-top: -5px; 
}
.avatar {
  border: none;
}
</style>
