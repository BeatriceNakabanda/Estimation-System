<template>
    <div class="main-content bg-default">
        <!-- <div class="justify-content-center text-center py-1" id="header">   
            <router-link slot="brand" class="navbar-brand " to="/">
                <img src="../assets/logo.png" width="30%"/>
            </router-link>
        </div> -->
        <div class="header py-6 py-lg-5" id="header">
            <div class="container">
                
                <div class="header-body text-center mb-7">

                    <div class="row justify-content-center" >                          
                        <div class="col-lg-5 col-md-6">
                            <router-link slot="brand" class="navbar-brand  mb-5" to="/">
                                <img src="../assets/logo.png" width="98%"/>
                            </router-link>
                            <h1 class="text-white">Welcome!</h1>
                            <p class="text-lead text-white">Skala is your task estimation buddy</p>
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
        <div class="container mt--8 pb-4">
            <slide-y-up-transition mode="out-in" origin="center top">
                <router-view></router-view>
            </slide-y-up-transition>
        </div>
        <footer class="py-1 ">
            <div class="container  pb-3 " id="footer">
                <div class="row justify-content-center">
                    <div class="">
                        <div class="text-muted">
                            &copy; {{year}} <b>skala</b>
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
.navbar-brand{
    padding-left:140px; 
}
#header{
    background-color: #d10572;
}


</style>
