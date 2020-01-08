<template>
        <!-- <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    <div class="card-header bg-transparent pb-0">
                        <div class="text-muted text-center mt-2 mb-3"><small>Sign in with credentials</small></div>
                    </div>
                    <div class="card-body px-lg-5 py-lg-3">
                        <form method="POST" role="form" class="mb-1" @submit.prevent="signIn">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-circle-08"
                                        v-model="model.email"
                                        :class="{ 'has-error': submitting && invalidEmail }" 
                                        @keypress="clearForm"
                                        >
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.password"
                                        :class="{ 'has-error': submitting && invalidPassword } "
                                        @keypress="clearForm"
                                        >
                            </base-input>

                            <base-checkbox class="custom-control-alternative text-left" >
                                
                                <span class="text-muted">Remember me</span>
                                
                            </base-checkbox>

                            
                            <div class="text-center">
                                <base-button type="primary"  class="shadow-none mt-3 mb-4 px-5 mx-7" id="signin" @click="signIn">Sign in</base-button>
                            </div>

                            <div class="text-center">
                              <small>
                              <span v-if="error && submitting" class="text-danger error-message text-muted ">
                                  Please fill in email and password fields
                              </span>
                            </small>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div> -->

            <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    <div class="card-header bg-transparent pb-0">
                        <div class="text-muted text-center mt-2 mb-3"><small>Sign in with credentials</small></div>
                    </div>
                    <div class="card-body px-lg-5 py-lg-3">
                        <form method="POST" role="form" class="mb-1" @submit.prevent="signIn">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-circle-08"
                                        v-model="model.email"
                                        :class="{ 'has-error': submitting && invalidEmail }" 
                                        @keypress="clearForm"
                                        >
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.password"
                                        :class="{ 'has-error': submitting && invalidPassword } "
                                        @keypress="clearForm"
                                        >
                            </base-input>

                            <base-checkbox class="custom-control-alternative text-left" >
                                <span class="text-muted">Remember me</span>
                            </base-checkbox>

                            <div class="text-center">
                                <base-button type="primary"  class="shadow-none mt-3 mb-2 px-5 mx-7" id="signin" @click="signIn">Sign in</base-button>                        
                            </div>

                            <div class="text-center mt-2">
                              <small>
                              <span v-if="error && submitting" class="text-danger error-message text-muted ">
                                  Please fill in email and password fields
                              </span>
                            </small>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
  import router from "../router"
  import axios from "axios";


  export default {
    name: 'Login',
    data(){
      return {
        error: false,
        submitting: false,
        success: false,
        model:{
          email: '',
          password: ''
        }
      }
    },
    //automatically computed properties(functions) to validate form inputs 
    computed: {
      invalidEmail(){
            return this.model.email === ''
        },
      invalidPassword(){
            return this.model.password === ''
        }
    },
    methods: {
      async signIn(){
            this.clearForm()
            this.submitting = true


            // validating empty inputs
            if(this.invalidEmail || this.invalidPassword )
            {
                this.error = true
                return
            }

    let newSignIn = {
            email: this.model.email,
            password: this.model.password
        }
        console.log(newSignIn)
        axios.post('http://localhost:8081/api/login', newSignIn)
            .then((response) =>{
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
            
            this.success = true
            this.error = false
            this.submitting = false
    }, 
    clearForm(){
                this.success = false
                this.error = false
            }
    }
  }  
</script>
<style>
#signin{
  /* margin-left: -15px; */
  padding: 4px 16px;
}

.text-danger {
    color: #dc3545!important;
}
</style>