<template>
  <form role="form" method="POST" >
    <div class="row">
      <div class="col-sm-4">
        <h6 class="heading-small text-muted mb-4">Project Name</h6>
      </div>
      <div class="col-sm">
        <base-input
          alternative
          :class="{ 'has-error': submitting && invalidProjectName }"
          ref="first" 
          placeholder="Add project name here..."
          v-model="project.name"
          @keypress="clearForm"
        >
        </base-input>
      </div>
    </div>
      <p v-if="error && submitting" class="error-message">
        ❗Please add project name
      </p>
      <p v-if="success" class="success-message">
        ✅ Project successfully added
      </p>
    <base-button
      class="shadow-none cancel-color"
      type="secondary"
      @click="modal1 = false"
      >Close</base-button
    >
    <base-button class="shadow-none" type="primary" @click="addProject">Add</base-button
    >
  </form>
</template>
<script>
import axios from "axios";
const baseURL = "http://localhost:8081/project";

export default {
  name: "add-project-form",
  data() {
    return {  
      error: false,
      submitting: false,
      success: false,
      project: {
        name: ""
      },
      
    };
  },
    computed:{
    invalidProjectName(){
      return this.project.name === ''
    }
  },
  methods: {
    async addProject() {
      this.clearForm()
      //Adding submitting status
      this.submitting = true
      
      
      //checking whether user is submiting empty project name
      if ( this.invalidProjectName ){
        this.error = true
        return
      }
      const res = await axios.post(baseURL, {
        name: this.project.name
      });
      this.projects = [...this.projects, res.dat];
      this.name = "";

      this.success = true
      this.error = false
      this.submitting = false
    },
    clearForm(){
      this.success = false
      this.error = false
    }
  }
};
</script>
<style  scoped>
  [class*='-message'] {
    font-weight: 500;
  }

  .error-message {
    color: #d33c40;
  }

  .success-message {
    color: #32a95d;
  }
</style>
