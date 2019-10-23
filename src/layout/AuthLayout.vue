<template>
    <div class="main-content bg-default">
        <!-- <div class="justify-content-center text-center py-1" id="header">   
            <router-link slot="brand" class="navbar-brand " to="/">
                <img src="../assets/logo.png" width="30%"/>
            </router-link>
        </div> -->
        <div class="header py-6  mh-100" id="header">
            <div class="container">
                
                <div class="header-body text-center mb-5">

                    <div class="row justify-content-md-center" >                          
                        <div class="col-md-auto">
                            <router-link slot="brand" class="navbar-brand ml-8 mb-5" to="/">
                                <img src="../assets/logo.png" width="40%"/>
                            </router-link>
                            <h1 class="text-white">Welcome!</h1>
                            <p class="text-lead text-white">skala is your task estimation buddy</p>
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
        <div class="container mt--8 pb-2 ">
            <slide-y-up-transition mode="out-in" origin="center top">
                <router-view></router-view>
            </slide-y-up-transition>
        </div>
        <footer >
            <div class="container " id="footer">
                <div class="row justify-content-center">
                    <div >
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
#header{
    background-color: #d10572;
    margin-bottom: 5px; 
}



</style>
