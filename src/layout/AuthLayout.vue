<template>
    <div class="main-content bg-default">
        <div class="header py-6  mh-100" id="header">
            <div class="container">
                <div class="header-body text-center mb-5">
                    <div class="row justify-content-md-center" >                          
                        <div class="col-md-auto">
                                <img src="../assets/logo.png" width="20%"/>
                            <h1 class="text-white mt-3">Welcome!</h1>
                            <p class="text-lead text-white">skalla is your task estimation buddy</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="separator separator-bottom separator-skew zindex-100">
                <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
                     xmlns="http://www.w3.org/2000/svg">
                    <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
                </svg>
            </div>
        </div>
        <!-- Page content -->
        <div class="container mt--8 ">
            <slide-y-up-transition mode="out-in" origin="center top">
                <router-view></router-view>
            </slide-y-up-transition>
        </div>
        <footer >
            <div class="container" >
                <div class="row justify-content-center">
                    <div >
                        <div class="text-muted mt-3" id="footer">
                            &copy; {{year}} <b>skalla</b>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>
<script>
  import { SlideYUpTransition } from 'vue2-transitions'

  export default {
    name: 'auth-layout',
    components: {
      SlideYUpTransition
    },
    data() {
      return {
        year: new Date().getFullYear(),
        showMenu: false
      }
    }
  }
</script>
<style>
#header{
    background-color: #d10572;
    /* margin-bottom: 5px;  */
    
}

.main-content{
    position: relative;
    min-height: 100vh;
}
</style>
