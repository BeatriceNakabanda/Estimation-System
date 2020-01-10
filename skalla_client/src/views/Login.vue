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
                                    v-model="credentials.email"
                                    :class="{ }" 
                                    type="email"
                                    >
                        </base-input>
                        <div class="text-danger">{{ errors.email }}</div>

                        <base-input class="input-group-alternative"
                                    placeholder="Password"
                                    type="password"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="credentials.password"
                                    :class="{  } "
                                    >
                        </base-input>
                        <div class="text-danger">{{ errors.password }}</div>

                        <base-checkbox class="custom-control-alternative text-left" >
                            <span class="text-muted">Remember me</span>
                        </base-checkbox>

            <div class="text-center">
              <base-button
                type="primary"
                class="shadow-none mt-3 mb-2 px-5 mx-7"
                id="signin"
                @click="signIn"
                >Sign in</base-button
              >
                  <p v-if="msg">{{ msg }}</p>
            </div>
            </form>
                </div>
            </div>
        </div>
      </div>
</template>
<script>
  import router from "../router"
  // import axios from "axios"
  import AuthService from "../services/AuthService"
  import store from "../store"

  // Validating email and password
  const validateEmail = email => {
    if (!email.length) {
      return { valid: false, error: "Email is required" };
    }
    if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/)) {
      return { valid: false, error: "Please, enter a valid email." };
    }
    return { valid: true, error: null };
  };

  const validatePassword = password => {
  if (!password.length) {
    return { valid: false, error: "Password is required" };
  }
  if (password.length < 6) {
    return { valid: false, error: "Password is too short" };
  }
  return { valid: true, error: null };
};

  export default {
    name: 'Login',
    data(){
      return {
        // error: false,
        // submitting: false,
        // success: false,
        credentials:{
          email: '',
          password: ''
        },
        valid: true,
        success: false,
        errors: {},
        message: null,
        msg: ''
      }
    },
    methods: {
      
      async signIn(){
        try{
            this.errors = {}
            this.clearForm()

            const validEmail = validateEmail(this.credentials.email);
            this.errors.email = validEmail.error;
            if (this.valid) {
              this.valid = validEmail.valid
            }
            const validPassword = validatePassword(this.credentials.password)
            this.errors.password = validPassword.error
            if (this.valid) {
              this.valid = validPassword.valid
            }

            if (this.valid) {
              console.log(this.credentials)

              const response = await AuthService.login(this.credentials)
              this.msg = response.msg

              const token = response.token
              const user = response.user
              
              store.dispatch('login', { token, user })
              

              router.push('/estimates')
            } 
            } catch (error) {
              this.msg = error
            }

            //   axios.post('http://localhost:8081/api/user/userlogin', this.user)
            // .then((response) =>{
            //     console.log(response);
            // })
            // .catch((error) => {
            //     console.log(error);
            // });
            // }
    /* let newSignIn = {
            email: this.model.email,
            password: this.model.password
        }
        console.log(newSignIn) */
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
