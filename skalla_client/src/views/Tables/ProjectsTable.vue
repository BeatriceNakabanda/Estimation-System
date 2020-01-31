<template>
    <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row ">
        <div class="col text-right">
          <base-button type="primary" id="create-estimate" size="md" class="shadow-none spacing btn-md" @click="modal1 = true">Add Project</base-button>
          <modal :show.sync="modal1">
            <template slot="header">
              <h3 class="modal-title ml-2" id="exampleModalLabel">Add New Project</h3>
            </template>
            <!-- Add project form -->
            <div>
            <!-- <AddProjectForm  /> -->
              <form role="form" method="POST" >
              <div class="row mb-3  mr-3">
                <div class="col-sm-4">
                  <h6 class="heading-small text-muted">Project Name</h6>
                </div>
                <div class="col-sm">
                  <base-input
                    alternative
                    :class="{ 'has-error': submitting && invalidProjectName }"
                    ref="first" 
                    placeholder="Add project name here..."
                    v-model="project.name"
                    @keypress="clearForm">
                  </base-input>
                </div>
              </div>
                <p v-if="error && submitting" class="error-message ml-3">
                  ❗Please add project name
                </p>
                <p v-if="success" class="success-message ml-3">
                  ✅ Project successfully added
                </p>
              <base-button
                class="shadow-none cancel-color"
                type="secondary"
                @click="modal1 = false"
                >Close</base-button>
              <base-button class="shadow-none mr-4" type="primary" @click="addProject">Add</base-button>
            </form> 
            </div>
        </modal>
        </div>
      </div>
    </div>

    <div class="table-responsive table-hover">
      <table class="table">
        <thead class="thead-light">
          <tr>
            <th class="bgcolor">No</th>
            <th class="bgcolor">Project</th>
            <th class="bgcolor"></th>
            <th class="bgcolor"></th>
            <th class="bgcolor"></th>
            <th class="bgcolor"></th>
            
        </tr>
        </thead>
          <tbody>
            <tr v-for="(project, index) in projects">
              <td >{{ index + 1 }}</td>
               <td> {{ project.name}}</td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
            </tr>
          </tbody>
      </table>
    </div>
    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination></base-pagination>
    </div>
  </div>
</template>
<script>
import AddProjectForm from '../Forms/AddProjectForm'
import axios from 'axios';
const baseURL = "http://localhost:8081/api/project";

export default {
    name: 'projects-table',
    components: {
      AddProjectForm,
    },
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
        modal1: false,
        projects: [],
        project: {
          name: ""
        },
        error: false,
        submitting: false,
        success: false,

      }
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
      const res = await axios.post(baseURL, { name: this.project.name});
      this.projects.push({
          name: res.data.name
        })
        console.log(res.data.name)
      // this.name = "";
    
      this.success = true
      this.error = false
      // this.submitting = false
    },
    clearForm(){
      this.success = false
      this.error = false
    }
  },
    async created(){
      try{
        const res = await axios.get(`http://localhost:8081/api/projects`)

        this.projects = res.data;
      }catch(e){
        console.error(e)
      }
    } 
}
</script>
<style>
#view{
  color: #747273;
  padding-left: 10px;
}
#left{
  text-align: left;
}
/* Adding cursor to table */
.table-row{
  cursor:pointer;
}

.spacing{
  padding-left: 16px;
  padding-right: 16px;
}
/* Adjustments to font size of the table head content */
.table thead th {
  font-size: 13px;
  font-weight: 700;
}

/* First column of table font adjustment */
.text-sm {
  font-weight: 400;
  font-size: 13px !important;
}
/* styling rounded border */
.rounded-circle {
  border: 1px solid rgb(201, 201, 199);
  padding: 6px;
  
}

/* Status column font size adjustment */
span .status{
  font-size: 13px; 
}

.bgcolor {  
  background: #e7eaec !important;
}
/* displaying action icons on hover */
table > tbody > tr .action-icons{
  visibility: hidden;
} 
table > tbody > tr:hover .action-icons{
  visibility: visible;
} 
/* styling buttons */
#create-estimate{
  border-radius: 4px; 
}
/* cancel button for modal */
.cancel-color{
  color: rgb(135, 141, 148);
  background-color: #e2e0e1;
}
.cancel-color:hover{
  color: #ffffff;
  background-color: #afadae;
}

/* Desktops and laptops ----------- */
@media only screen  and (min-width : 1224px) {
.card{
  margin-top: 30px;
}
}
[class*='-message'] {
    font-weight: 500;
  }
  .error-message {
    color: #d33c40;
    text-align: left;
  }
  .success-message {
    color: #32a95d;
    text-align: left;
  }
</style>