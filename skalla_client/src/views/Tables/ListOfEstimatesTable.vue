<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row ">
        <div class="col text-right">
          <base-button type="primary" id="create-estimate" size="md" class="shadow-none spacing btn-md" @click="requestEstimatesModel = true">Request Estimate</base-button>
          <modal :show.sync="requestEstimatesModel">
                      <template slot="header">
                          <h3 class="modal-title " id="exampleModalLabel">Request Estimate</h3>
                      </template>
                      <!-- create estimate form -->
                      <CreateEstimateForm  />
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
            <!-- {{ row.dateCreated }} -->
          </td>
          <td class="dateEstimated">
            {{row.dateEstimated}}
          </td>
          <td>
            <badge class="badge-dot mr-4" :type="row.statusType">
              <i :class="`bg-${row.statusType}`"></i>
              <span class="status">{{row.status}}</span>
            </badge>
          </td>
         
          <td >
            <span class="action-icons">
              <router-link  :to="`/view-estimate/${row._id}`" id="view">
                <i class="rounded-circle fa fa-eye fa-1x" aria-hidden="true" id="my-icons" ></i>
                <modal :show.sync="modal2">
                  <template slot="header">
                          <h3 class="modal-title " id="exampleModalLabel"> Estimate</h3>
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
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import axios from "axios";
import { format } from 'date-fns' 
export default {

  name: "estimates-table",
  components: {
    CreateEstimateForm,
    // EditEstimateForm 
    flatPicker
  },
  props: {
    estimates: Array,
    type: {
      type: String
    },
    title: String,
  },
  
  
  data() {
    return {
      modal: false,
      requestEstimatesModel: false,
      modal2: false,
      editEstimateModel: false,
      format,
      // estimateId: '',
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
            return this.estimate.project === ''
        },
        invalidDeveloper(){
            return this.estimate.developers === ''
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
  methods: {
    openEditModel(estimateId){
      this.editEstimateModel = true
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
            this.submitting = false 

        
    },
    clearForm(){
                this.success = false
                this.error = false
            },
      handleSave() {
      console.log('testing save' )
      }, 
    
    formatDate: function(dateCreated){
      return format(new Date(dateCreated), 'dd/MM/yyy')
    }
  },
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
