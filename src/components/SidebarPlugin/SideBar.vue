<template>
    <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
        <div class="container-fluid">
          
            <!--Toggler-->
            <navbar-toggle-button @click.native="showSidebar">
                <span class="navbar-toggler-icon"></span>
            </navbar-toggle-button>
            
                <img class="logo" src="../../assets/logo.png"  alt="..." width="60%"/>
            <slot name="mobile-right">
                <ul class="nav align-items-center d-md-none">          
                    <base-dropdown class="nav-item" position="right">
                        <a slot="title" class="nav-link" href="#" role="button">
                            <div class="media align-items-center">
                              <span class="avatar avatar-sm rounded-circle">
                                <img alt="Image placeholder" src="img/theme/team-1-800x800.jpg">
                              </span>
                            </div>
                        </a>

                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0">Welcome!</h6>
                        </div>
                        <div class="dropdown-divider"></div>
                        <a href="#!" class="dropdown-item">
                            <i class="ni ni-user-run"></i>
                            <span>Logout</span>
                        </a>
                    </base-dropdown>
                </ul>
            </slot>
            <slot></slot>
            <div v-show="$sidebar.showSidebar" class="navbar-collapse collapse show" id="sidenav-collapse-main">

                <div class="navbar-collapse-header d-md-none">
                    <div class="row">
                        <div class="col-6 collapse-brand">
                            <router-link to="/">
                                <img :src="logo">
                            </router-link>
                        </div>
                        <div class="col-6 collapse-close">
                            <navbar-toggle-button @click.native="closeSidebar"></navbar-toggle-button>
                        </div>
                    </div>
                </div>

                <ul class="navbar-nav">
                    <slot name="links">
                    </slot>
                </ul>
               
            </div>
            </div>
    </nav>
</template>
<script>
  import NavbarToggleButton from '@/components/NavbarToggleButton'

  export default {
    name: 'sidebar',
    components: {
      NavbarToggleButton
    },
    props: {
      logo: {
        type: String,
        default: 'img/brand/green.png',
        description: 'Sidebar app logo'
      },
      autoClose: {
        type: Boolean,
        default: true,
        description: 'Whether sidebar should autoclose on mobile when clicking an item'
      }
    },
    provide() {
      return {
        autoClose: this.autoClose
      };
    },
    methods: {
      closeSidebar() {
        this.$sidebar.displaySidebar(false)
      },
      showSidebar() {
        this.$sidebar.displaySidebar(true)
      }
    },
    beforeDestroy() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false;
      }
    }
  };
</script>
<style>
.navbar-brand{
  /* margin-left: 0px; */
  padding-right: 120px;  
}
.logo{
  margin-left: -0.75rem;
}

</style>
