<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    <div class="card-header bg-transparent pb-0">
                        <div class="text-muted text-center mt-2 mb-3"><small>Sign in with credentials</small></div>
                    </div>
                    <div class="card-body px-lg-5 py-lg-3">
                        <form role="form" class="mb-1" @submit.prevent="login">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-circle-08"
                                        v-model="email">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="password">
                            </base-input>

                            <base-checkbox class="custom-control-alternative text-left" >
                                <span class="text-muted">Remember me</span>
                            </base-checkbox>
                            <div class="text-center">
                              <!-- <router-link slot="brand" class="navbar-brand" to="/"> -->
                                <base-button type="primary"  class="shadow-none mt-3 mb-5 px-5 mx-7" id="signin" @click="login">Sign in</base-button>
                              <!-- </router-link> -->
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
  export default {
    name: 'login',
    data() {
      return {
          email: '',
          password: ''
      }
    },
    methods: {
      login(){
        console.log(this.email),
        console.log(this.password)
      }
    }
  }
</script>
<style>
#signin{
  /* margin-left: -15px; */
  padding: 4px 16px;
  
}
</style>

