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
              <p class="text-md font-weight-bold" id="user-name">{{ name }}
              </p>
              <p class="text-sm">
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
      router.push('/')
    }else{
      this.name = this.$store.getters.getUser.name
      this.role = this.$store.getters.getUser.role
      console.log(this.role)
    }
    
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
      },
      // getUserData: function(){
      //   let self = this
      //     axios.get("http://localhost:8081/api/users")
      //           .then((response) => {
      //             console.log(response)
      //             self.$set(this, "user", response.data.user)
      //           })
      //           .catch((errors) => {
      //             console.log(errors)
      //             router.push("/")
      //           })
      // }
    },
    // mounted(){
    //   this.getUserData()
    // }
  };
</script>
<style>
.users {
  margin-top: 0px;
  padding-top: 2px;
}
#user-image {
  margin-bottom: -5px;
  margin-top: -5px;
}
.user {
  color: #fff;
  float: right;
}

.avatar {
  border: 4px solid red;
}
</style>
