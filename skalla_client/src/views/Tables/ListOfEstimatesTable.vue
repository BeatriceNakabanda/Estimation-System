<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row ">
        <div class="col text-right">
          <base-button type="primary" id="create-estimate" size="md" class="shadow-none spacing btn-md" @click="requestEstimateModal = true">Request Estimate</base-button>
          <modal :show.sync="requestEstimateModal">
                      <template slot="header">
                          <h3 class="modal-title " id="exampleModalLabel">Request Estimate</h3>
                      </template>
                      <!-- create estimate form -->
                      <!-- <CreateEstimateForm  /> -->
                          <form method="POST" role="form" @submit.prevent="addEstimate">
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
                                            @keypress="clearForm">
                                            <select class="custom-select" id="inputGroupSelect01" v-model="estimate.selectedProject">
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
                                            <select class="custom-select" id="inputGroupSelect01" v-model="estimate.selectedDeveloper">
                                                <option value="" disabled>Please select a developer</option>
                                                <option  v-for="developer in developers" v-bind:value="{id: developer._id, name: developer.name}"> {{developer.name}}</option>
                                            </select>
                                </base-input>
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
                                <base-button class="shadow-none mt-4 cancel-color" type="secondary" @click="handleSaveDraft()" >Save as draft</base-button>
                                <!-- <base-button class="shadow-none mt-4" type="primary" @click="addEstimate">Send request</base-button> -->
                                <base-button class="shadow-none mt-4" type="primary" @click="addEstimate()">Send request</base-button>
                            </form>
                  </modal>
        </div>
      </div>
    </div>

    <div class="table-responsive table-hover">
      <base-table class="table table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'" 
                  tbody-classes="list"
                  :data="estimates" id="left">
        <template  slot="columns"  >
          <th class="bgcolor">Title</th>
          <th class="bgcolor">Project</th>
          <th class="bgcolor">Developer</th>
          <th class="bgcolor">Date Created</th>
          <th class="bgcolor">Date Estimated</th>
          <th class="bgcolor">Status</th>
          <th class="bgcolor"></th>
        </template>
          <template class="table-row" slot-scope="{row}">
          <td class="title">
            {{row.title}}
          </td>
          <td class="project">
            {{row.project.name}}
          </td>
          <td class="developer">
            {{row.developer.name}}
          </td>
          <td class="dateCreated">
            {{ formatDate(row.dateCreated) }}
           
          </td>
          <td class="dateEstimated">
            {{row.DateEstimated}}
          </td>
          <td>
            <!-- <badge class="badge-dot mr-4" :type="row.statusType">
              <i :class="`bg-${row.statusType}`"></i>
              <span class="status">{{row.status}}</span>
            </badge> -->
              
              <span v-if="row.status === 'Submitted'" class="status" id="status-submitted">
                {{row.status}}
              </span>
              <span v-else class="status" id="status-estimated">{{row.status}}</span>           
          </td>
         
          <td >
            <span class="action-icons">
              <router-link  :to="`/view-estimate/${row._id}`" id="view">
                <i class="rounded-circle fa fa-eye fa-1x" aria-hidden="true" id="my-icons" ></i>
                <modal :show.sync="estimateModal">
                  <template slot="header">
                          <h3 class="modal-title " id="exampleModalLabel">Estimate</h3>
                      </template>
                </modal>
              </router-link>
            </span>
           
            
            
          </td>
          </template>

      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <!-- <base-pagination total="30"></base-pagination> -->
      <base-pagination></base-pagination>

    </div>
    
  </div>
</template>
<script>
import CreateEstimateForm from "../Forms/CreateEstimateForm";
import EditEstimateForm from "../Forms/EditEstimateForm";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import axios from "axios";
// import store from "../../store"
import { format } from 'date-fns' 
import AuthService from '../../services/AuthService';
export default {
  name: "estimates-table",
  components: {
    CreateEstimateForm,
    EditEstimateForm,
    flatPicker
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
      requestEstimateModal: false,
      estimateModal: false,
      format,

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
      
    };
  },
  // automatically computed properties(functions) to validate form inputs 
  computed: {
      invalidProjectName(){
          return this.estimate.selectedProject === ''
      },
      invalidDeveloper(){
          return this.estimate.selectedDeveloper === ''
      },
      invalidDueDate(){
          return this.estimate.dueDate === ''
      },
      invalidTitle(){
          return this.estimate.title === ''
      },
      invalidTaskDescription(){
          return this.estimate.taskDescription === ''
      }
  },
  async created(){
    try{
      
      const response = await axios.get(`http://localhost:8081/api/projects`)
      const resp = await axios.get(`http://localhost:8081/api/users/developers` )
      this.projects = response.data;
      this.developers = resp.data;
    }catch(e){
      console.error(e)
      
    }
  },
    
  methods: {
    formatDate: function(dateCreated){
      return format(new Date(dateCreated), 'dd/MM/yyy')
    },
    // add new Estimate method
    async addEstimate(){
    this.clearForm()
    this.submitting = true
                // validating empty inputs
        if(this.invalidProjectName || this.invalidDueDate  || this.invalidTitle || this.invalidTaskDescription)
        {
            this.error = true
            return
        }
        let createdEstimate = this.submitting = true
        if(createdEstimate){
            let newEstimate = {
                project: this.estimate.selectedProject.id,
                developer: this.estimate.selectedDeveloper.id,
                dueDate: this.estimate.dueDate,
                title: this.estimate.title,
                taskDescription: this.estimate.taskDescription,
                projectManager: this.$store.getters.getUser.id,
                status: "Submitted",
        }
        // console.log(newEstimate)
        const response = await AuthService.addEstimate(newEstimate);
        console.log(response)
       
        this.estimates.push({
          project: response.project,
          developer: response.developer,
          dueDate: response.dueDate,
          title: response.title,
          taskDescription: response.taskDescription,
          dateCreated: response.dateCreated,
          status: response.status,
        })
        
        }
        this.success = true
        this.error = false
        this.submitting = false 
                         
        },
        // Save as draft method
        async handleSaveDraft() {
          console.log('testing save' )
            this.clearForm()
            this.submitting = true
                // validating empty inputs
                if(this.invalidProjectName || this.invalidDueDate || this.invalidTitle || this.invalidTaskDescription)
                {
                    this.error = true
                    return
                }
                let draftedEstimate = this.submitting = true
                if(draftedEstimate){
                    let newEstimate = {
                    project: this.estimate.selectedProject.id,
                    developer: this.estimate.selectedDeveloper.id,
                    dueDate: this.estimate.dueDate,
                    title: this.estimate.title,
                    taskDescription: this.estimate.taskDescription,
                    projectManager: this.$store.getters.getUser.id,
                    status: this.estimate.status = "Draft",
                    statusType: this.estimate.statusType = "warning"
                    }
                console.log(newEstimate)
                const response = await AuthService.addEstimate(newEstimate);
                console.log(response)
                
                }
                this.success = true
                this.error = false
          },  

        clearForm(){
                this.success = false
                this.error = false
            },
  }
};
</script>
<style>
#view {
  color: #747273;
  padding-left: 10px;
}
#left {
  text-align: left;
}
/* Adding cursor to table */
.table-row {
  cursor: pointer;
}
.spacing {
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
span .status {
  font-size: 13px;
}
.bgcolor {
  background: #e7eaec !important;
}
/* displaying action icons on hover */
table > tbody > tr .action-icons {
  visibility: hidden;
}
table > tbody > tr:hover .action-icons {
  visibility: visible;
}
/* styling buttons */
#create-estimate {
  border-radius: 4px;
}
/* cancel button for modal */
.cancel-color {
  color: rgb(135, 141, 148);
  background-color: #e2e0e1;
}
.cancel-color:hover {
  color: #ffffff;
  background-color: #afadae;
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
#status-submitted{
  color: #fb6340;
}
#status-estimated{
  color: #2dce89;
}
/* Desktops and laptops ----------- */
@media only screen and (min-width: 1224px) {
  .card {
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