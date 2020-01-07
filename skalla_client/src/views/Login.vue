/* eslint-disable no-console */
<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    <div class="card-header bg-transparent pb-0">
                        <div class="text-muted text-center mt-2 mb-3"><small>Sign in with credentials</small></div>
                    </div>
                    <div class="card-body px-lg-5 py-lg-3">
                      <form action="/login" method="post">
    <div>
        <label>Username:</label>
        <input type="text" id="username" name="username"/>
    </div>
    <div>
        <label>Password:</label>
        <input type="password" id="password" name="password"/>
    </div>
    <div>
        <input type="submit" value="Log In"/>
    </div>
</form>
                        <!-- <form role="form" action="/login" method="post" class="mb-1">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-circle-08"
                                        v-model="model.email">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.password">
                            </base-input>

                            <base-checkbox class="custom-control-alternative text-left" >
                                <span class="text-muted">Remember me</span>
                            </base-checkbox>
                            <div class="text-center">
                              <router-link slot="brand" type="submit" class="navbar-brand" to="/">
                                <base-button type="primary"  class="shadow-none mt-3 mb-5 px-5 mx-7" id="signin">Sign in</base-button>
                              </router-link>
                            </div>
                        </form> -->
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      // model: {
      //   email: '',
      //   password: ''
      // }
      email: "",
      password: ""
    };
  },
  mounted() {
    // eslint-disable-next-line no-undef
    posting();
  },
  methods: {
    posting: function() {
      var body = {
        email: "body.email",
        password: "body.password"
      };

      axios({
        method: "post",
        url: "http://localhost:8081/login",
        data: body
      })
        .then(function(response) {
          // eslint-disable-next-line no-console
          console.log(response);
        })
        .catch(function(error) {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    }
  }

  // async posting() {
  //   try {
  //     const res = await axios.post(`http://localhost:8081/login`, {
  //       email: document.getElementById("email"),
  //       password: document.getElementById("password")
  //     });

  //     this.email = res.data;
  //   } catch (e) {
  //     // eslint-disable-next-line no-console
  //     console.error(e);
  //   }
  // }
};
</script>
<style>
#signin {
  /* margin-left: -15px; */
  padding: 4px 16px;
}
</style>
