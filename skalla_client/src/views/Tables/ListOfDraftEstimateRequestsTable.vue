<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">

    </div>

    <div class="table-responsive table-hover">
      <base-table class="table table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'" 
                  tbody-classes="list"
                  :data="draftEstimateRequests" id="left">
        <template  slot="columns"  >
          <th class="bgcolor">Title</th>
          <th class="bgcolor">Project</th>
          <th class="bgcolor">Developer</th>
          <th class="bgcolor">Date Created</th>
          <th class="bgcolor"></th>
          <!-- <th class="bgcolor">Action</th> -->
        </template>
          <template class="table-row" slot-scope="{row} ">
          <td class="title">
            {{row.title}}
          </td>

          <td class="project">
            {{row.project.name}}
          </td>
          <td class="developer">
            {{row.developer.name}}
          </td>
          <td class="date-created">
            {{ formatDate(row.dateCreated) }}
          </td>
         
          <td >
            <!-- Commented out eye icon for viewing as we only need to edit a draft estimate -->
            <!-- <span class="action-icons">
              <router-link  to="#" id="view">
                <i class="rounded-circle fa fa-eye fa-1x" id="my-icons" aria-hidden="true"></i>
              </router-link>
            </span> -->
            <span class="action-icons">
              <router-link  to="" id="view">
                <i class="rounded-circle fas fa-pen" aria-hidden="true" id="my-icons" @click="openEditModel(row._id)"></i>
              </router-link>
              <modal :show.sync="editDraftModal" >
                      <template slot="header">
                          <h3 class="modal-title " id="exampleModalLabel">Edit Draft Estimate Request</h3>
                      </template>
                      <!-- Edit Draft Estimate Request Form -->
                      <!-- <EditDraftEstimateRequestForm  /> -->
                          <form method="POST" role="form" @submit.prevent="handleEditt()">
                            <div>
                                <div class="row">
                                <div class="col-sm-3">          
                                    <h6 class="heading-small text-muted mb-4 float-left">Project</h6>
                                </div>
                                <div class="col-sm">
                                    <base-input alternative
                                            ref="first"
                                            class="mb-3"
                                            placeholder="Add project here..." 
                                            :class="{ 'has-error': submitting && invalidProjectName } " 
                                            
                                            @keypress="clearForm"
                                          >
                                            <select class="custom-select" id="inputGroupSelect01" v-model="selectedProject">
                                            <option value="" disabled>Please select a project</option>
                                            <option v-for="project in projects" v-bind:value="{id: project._id, name: project.name}">{{project.name}}</option>
                                            </select>
                                            
                                </base-input>
                      
                                </div>
                                </div>
                                <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="heading-small text-muted mb-4 float-left">Assign to</h6>
                                </div>
                                <div class="col-sm">
                                    <base-input alternative
                                            class="mb-3"
                                            placeholder="Add developer here..."
                                          :class="{ 'has-error': submitting && invalidDeveloper }" 
                                            >
                                            <select class="custom-select" id="inputGroupSelect01" v-model="selectedDeveloper">
                                                <option value="" disabled>Please select a developer</option>
                                                <option v-for="developer in developers" v-bind:value="{id: developer._id, name: developer.name}"> {{developer.name}}</option>
                                            </select>
                                </base-input>
                                <!-- <p>id: {{selectedProject.id}}</p>
                                <p>name: {{selectedProject.name}}</p>
                                <p>id: {{selectedDeveloper.id}}</p>
                                <p>name: {{selectedDeveloper.name}}</p> -->

                                </div>
                                </div>
                                <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="heading-small text-muted mb-4 float-left">Due Date</h6>
                                </div>
                                <div class="col-sm">
                                    <base-input addon-left-icon="ni ni-calendar-grid-58">
                                        <flat-picker slot-scope="{focus, blur}"
                                                    @on-open="focus"
                                                    @on-close="blur"
                                                    :config="{allowInput: true, dateFormat: 'd-m-Y'}"
                                                    placeholder="17-07-2019"
                                                    class="form-control datepicker"
                                                    :class="{ 'has-error': submitting && invalidDueDate }"
                                                    v-model="estimate.dueDate">
                                        </flat-picker>
                                    </base-input>
                                </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="heading-small text-muted mb-4 float-left">Title</h6>
                                    </div>
                                    <div class="col-sm">
                                        <base-input alternative
                                                class="mb-3"
                                                placeholder="Add title here..."
                                                v-model="estimate.title" 
                                              
                                                :class="{ 'has-error': submitting && invalidTitle }"
                                            >
                                    </base-input>
                                    </div>
                                </div>
                                <div class="row">
                                <div class="col-sm-5">
                                    <h6 class="heading-small text-muted mb-4 float-left">Main Task Description </h6>
                                </div>
                                <div class="col-sm-12">
                                    <base-input alternative=""
                                    :class="{ 'has-error': submitting && invalidTaskDescription }"
                                    
                                    >
                                        <textarea rows="4" v-model="estimate.taskDescription" class="form-control form-control-alternative" placeholder="Add main task description here ..."></textarea>
                                    </base-input>
                                </div>
                                </div>
                            </div>
                                <p v-if="error && submitting" class="error-message">
                                    ❗Please fill in all fields
                                </p>
                                <p v-if="success" class="success-message">
                                    ✅ Request successfully sent
                                </p>
                                <base-button class="shadow-none mt-4 cancel-color" type="secondary" @click="handleCancel" >Cancel</base-button>
                                <!-- <base-button class="shadow-none mt-4" type="primary" @click="addEstimate">Send request</base-button> -->
                                <base-button class="shadow-none mt-4" type="primary" @click="handleEditt(row._id)">Edit request</base-button>
                                <base-button class="shadow-none mt-4" type="primary" @click="handleSendRequest(row._id)">Send request</base-button>
                              
                            </form>
                  </modal>
            </span>
             <!-- <span class="action-icons" id="view" >
              <i class="rounded-circle ni ni-curved-next" aria-hidden="true" id="my-icons" @click="handleSendRequest(row._id)"></i>
            </span> -->
            
          </td>
          </template>

      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination total="30"></base-pagination>
    </div>

  </div>
</template>
<script>

// import EditDraftEstimateRequestForm from "../Forms/EditDraftEstimateRequestForm";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { format } from 'date-fns';
import axios from 'axios'

  export default {
    name: 'drafts-estimates-table',
    components: {
      flatPicker
      //  EditDraftEstimateRequestForm,
    },
    props: {
      draftEstimateRequests: Array,
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
        editDraftModal: false,
        selectedProject: '',
        selectedDeveloper: '',
        error: false,
        submitting: false,
        success: false,
        projects: [],
        developers: [],
           
        estimate:
          {
            selectedProject: '',
            selectedDeveloper: '',
            status: '',
            statusType: '',
            dueDate: '',
            title: '',
            taskDescription: '',
          },
      }
    },
    methods: {
          openEditModel(estimateId){
            this.editDraftModal = true
            // this.estimateId
            console.log(estimateId)
            
            return estimateId
          },
          handleEditt(estimateId){
            this.submitting = true
            this.clearForm()
            // validating empty inputs
              if(this.invalidProjectName || this.invalidDueDate || this.invalidTitle || this.invalidTaskDescription)
                  {
                      this.error = true
                      return
                  }
            let newEstimateId = this.openEditModel(estimateId)
            
            console.log(newEstimateId)
            // debugger
            let editedEstimate = {
                  project: this.selectedProject.id,
                  developer: this.selectedDeveloper.id,
                  dueDate: this.estimate.dueDate,
                  title: this.estimate.title,
                  taskDescription: this.estimate.taskDescription,
                  projectManager: this.$store.getters.getUser.id

              }
            axios.put(`http://localhost:8081/api/estimate-request/` + newEstimateId , editedEstimate)
                  .then((response) =>{
                      console.log(response);
                  })
                  .catch((error) => {
                      console.log(error);
                  });

                  this.success = true
                  this.error = false

              
          },
          handleCancel(){
            this.editDraftModal = false
          },
          
          async handleSendRequest(estimateId){
            // let newEstimateId = this.openEditModel(estimateId)
            let editedEstimate = {
                  status: this.estimate.status = "Submitted"

              }
            axios.put(`http://localhost:8081/api/estimate-request/` + estimateId , editedEstimate)
                  .then((response) =>{
                      console.log(response);
                  })
                  .catch((error) => {
                      console.log(error);
                  });

          },

          clearForm(){
                this.success = false
                this.error = false
                },
      formatDate: function(dateCreated){
      return format(new Date(dateCreated), 'dd / MM / yyy')
      },
      // async handleSendRequest(estimateId){
      //       this.submitting = true
      //       let newEstimateId = this.openEditModel(estimateId)
            
      //       console.log(newEstimateId)
      //       // debugger
      //       let createdEstimate = this.submitting = true
      //       if(createdEstimate){
      //       let editedEstimate = {
      //             project: this.selectedProject.id,
      //             developer: this.selectedDeveloper.id,
      //             dueDate: this.estimate.dueDate,
      //             title: this.estimate.title,
      //             taskDescription: this.estimate.taskDescription,
      //             projectManager: this.$store.getters.getUser.id,
      //             status: this.estimate.status = "Submitted"

      //         }
      //       axios.put(`http://localhost:8081/api/estimate-request/` + newEstimateId , editedEstimate)
      //             .then((response) =>{
      //                 console.log(response);
      //             })
      //             .catch((error) => {
      //                 console.log(error);
      //             });

      //       }

      // },
      async created(){
      try{
        if (!this.store.getters.isLoggedIn) {
          this.router.push('/');
        }
        const response = await axios.get(`http://localhost:8081/api/projects`)
        const resp = await axios.get(`http://localhost:8081/api/users/developers`)
        // const res = await axios.get(`http://localhost:8081/api/estimate-request/` + estimateId)

        this.projects = response.data;
        this.developers = resp.data;
        // this.estimate = res.data; 
        // window.location.reload();
      }catch(e){
        console.error(e)
        
      }
    },
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
/* .rounded-circle {
  border: 1px solid rgb(201, 201, 199);
  padding: 6px;
  
} */

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
/* .table{
  width: 100%; 
}
.card{
  width: 79vw;
} */
base-button{
  border-radius: 4px;
  
}
#my-icons {
  background-color: #5e72e4;
  border-color: #5e72e4;
  color: #eee7eb;
}
#my-icons:hover {
  background-color: #d10572;
  border-color: #d10572;
  color: #eee7eb;
}

/* Desktops and laptops ----------- */
@media only screen  and (min-width : 1224px) {
.card{
  margin-top: 30px;
}
}
</style>
