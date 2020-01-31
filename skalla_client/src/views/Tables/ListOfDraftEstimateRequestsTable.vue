<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">

    </div>

    <div class="table-responsive table-hover">
      <table class="table">
        <thead class="thead-light">
          <tr>
            <th class="bgcolor">Title</th>
            <th class="bgcolor">Project</th>
            <th class="bgcolor">Developer</th>
            <th class="bgcolor">Date Created</th>
            <th class="bgcolor"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="estimate in estimates" :key="estimate.id">
          <td class="title">
            {{estimate.title}}
          </td>

          <td class="project">
            {{estimate.project.name}}
          </td>
          <td class="developer">
            {{estimate.developer.name}}
          </td>
          <td class="date-created">
            {{ formatDate(estimate.dateCreated) }}
          </td>
         
          <td >
            <span class="action-icons">
              <router-link  to="" id="view">
                <i class="rounded-circle fas fa-pen" aria-hidden="true" id="my-icons" @click="openEditModel(estimate._id)"></i>
              </router-link>
              <modal :show.sync="editDraftModal" >
                      <template slot="header">
                          <h3 class="modal-title " id="exampleModalLabel">Edit Draft Estimate Request</h3>
                      </template>
                      <!-- Edit Draft Estimate Request Form -->
                      <!-- <EditDraftEstimateRequestForm  /> -->
                          <form method="POST" role="form" >
                            <div >
                                <div class="row">
                                <div class="col-sm-3">          
                                    <h6 class="heading-small text-muted mb-4 float-left">Project</h6>
                                </div>
                                <div class="col-sm">
                                    <base-input alternative
                                            ref="first"
                                            class="mb-3"
                                            placeholder="Add project here..." 
                                            
                                            @keypress="clearForm"
                                          >
                                            <select class="custom-select" id="inputGroupSelect01" v-model="newEstimate.project">
                                            <option value="" disabled>{{estimate.project.name}}</option>
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
                                          
                                            >
                                            <select class="custom-select" id="inputGroupSelect01" v-model="newEstimate.developer">
                                                <option value="" disabled>{{estimate.developer.name}}</option>
                                                <option  v-for="developer in developers" v-bind:value="{id: developer._id, name: developer.name}"> {{developer.name}}</option>
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
                                                    :placeholder="[estimate.dueDate]"
                                                    class="form-control datepicker"
                                                    v-model="newEstimate.dueDate"
                                                    >
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
                                                :placeholder="[estimate.title]"
                                                v-model="newEstimate.title"
                                            >
                                    </base-input>
                                    </div>
                                </div>
                                <div class="row">
                                <div class="col-sm-5">
                                    <h6 class="heading-small text-muted mb-4 float-left">Main Task Description </h6>
                                </div>
                                <div class="col-sm-12">
                                    <base-input alternative="">
                                        <textarea rows="4" 
                                        class="form-control form-control-alternative" 
                                        :placeholder="[estimate.taskDescription]"
                                        v-model="newEstimate.taskDescription"></textarea>
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
                                <div class="row  ">
                                <div class="col text-left">
                                  <base-button class="shadow-none mt-4 cancel-color" type="secondary" @click="handleCancel" >Cancel</base-button>
                                </div>
                                <!-- <base-button class="shadow-none mt-4" type="primary" @click="addEstimate">Send request</base-button> -->
                                <div class="col text-right">
                                  <base-button class="shadow-none mt-4" type="primary" id="save-draft" @click="handleEditt(estimate._id)">Edit request</base-button>
                                  <base-button class="shadow-none mt-4" type="primary" id="submit" @click="handleSendRequest2(estimate._id)">Send request</base-button>
                                </div>
                                </div>
                                <!-- <p>{{newEstimateId}}</p> -->
                            </form>
                  </modal>
            </span>
             <!-- <span class="action-icons" id="view" >
              <i class="rounded-circle ni ni-curved-next" aria-hidden="true" id="my-icons" @click="handleSendRequest2(estimate._id)"></i>
              <p v-if="error && submitting" class="error-message">
                  ❗Please fill in all fields
              </p>
              <p v-if="success" class="success-message">
                  ✅ Request successfully sent
              </p>
            </span> -->
     
            
          </td>
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
      estimates: Array,
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
        editDraftModal: false,
        sendEstimateRequest: false,
        // selectedProject: '',
        // selectedDeveloper: '',
        error: false,
        submitting: false,
        success: false,
        projects: [],
        developers: [],
        taskDescription: '',
        // newEstimateId: '',
           
        // estimate:
        //   {
        //     project: '',
        //     developer: '',
        //     status: '',
        //     statusType: '',
        //     dueDate: '',
        //     title: '',
        //     taskDescription: '',
        //   },
          newEstimate:{
            project: '',
            developer: '',
            status: '',
            statusType: '',
            dueDate: '',
            title: '',
            taskDescription: '',
          }
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
            
           
            let newEstimateId = this.openEditModel(estimateId)
            console.log(newEstimateId)
           
            const editedEstimate = {
                  project: this.newEstimate.project.id,
                  developer: this.newEstimate.developer.id,
                  dueDate: this.newEstimate.dueDate,
                  title: this.newEstimate.title,
                  taskDescription: this.newEstimate.taskDescription,
                  projectManager: this.$store.getters.getUser.id
              }
             
              console.log(editedEstimate)
            axios.put(`http://localhost:8081/api/estimate-request/` + newEstimateId , editedEstimate)
                  .then((response) =>{
                      console.log(response);
                       this.estimates.push({
                        project: this.response.project.name,
                        developer: response.developer.name,
                        dueDate: response.dueDate,
                        title: response.title,
                        taskDescription: response.taskDescription,
                        dateCreated: response.dateCreated,
                        status: response.status,
                })
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
            let newEstimateId = this.openEditModel(estimateId)
            let editedEstimate = {
                  
                  status: "Submitted"
              }
              console.log(editedEstimate)
            axios.put(`http://localhost:8081/api/estimate-request/` + newEstimateId , editedEstimate)
                  .then((response) =>{
                      console.log(response);
                  })
                  .catch((error) => {
                      console.log(error);
                  });
          },
          openSendRequestModel(estimateId){
            this.sendEstimateRequest = true
            return estimateId
          },
          async handleSendRequest2(estimateId){
           
            
            let editedEstimate = {
                  status: "Submitted"
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
      }
    },
    async created(){
      try{
        const response = await axios.get(`http://localhost:8081/api/projects`)
        const resp = await axios.get(`http://localhost:8081/api/users/developers`)
        
        this.projects = response.data;
        this.developers = resp.data;
        // window.location.reload();
        // console.log(this.projects)
      }catch(e){
        console.error(e)
        
      }
    },
    
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
#save-draft{
  background-color: #faf9f9;
  color: #5e72e4;
  border: 1px solid #5e72e4;
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
#details{
  font-size: 17px;
  color: rgb(17, 16, 19);
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