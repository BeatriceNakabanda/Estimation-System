<template>
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
                                        :class="{ 'has-error': submitting && invalidEmail } " 
                                        @keypress="clearForm"
                                        >
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.password"
                                        :class="{ 'has-error': submitting && invalidPassword } "
                                        >
                            </base-input>
                            <p v-if="error && submitting" class="error-message">
                                ❗Please fill in all fields
                            </p>
                            <base-checkbox class="custom-control-alternative text-left" >
                                <span class="text-muted">Remember me</span>
                            </base-checkbox>
                            <div class="text-center">
                                <base-button type="primary"  class="shadow-none mt-3 mb-5 px-5 mx-7" id="signin" @click="signIn">Sign in</base-button>
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
    name: 'login',
    data() {
      return {
        model: {
          email: '',
          password: ''
        }
      }
    },
     // automatically computed properties(functions) to validate form inputs 
    computed: {
        invalidEmail(){
            return this.model.email === ''
        },
        invalidPassword(){
            return this.model.password === ''
        }
    },
    methods : {
      login: (e) => {
      e.preventDefault()
      let email = e.target.elements.email.value
      let password = e.target.elements.password.value
      let login = () => {
        let data = {
          email: email,
          password: password
        }
        axios.post("/api/login", data)
          .then((response) => {
            // console.log("Logged in")
            router.push("/estimates")
          })
          .catch((err) => {
            console.log("Cannot log in")
          })
      }
      login()
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
