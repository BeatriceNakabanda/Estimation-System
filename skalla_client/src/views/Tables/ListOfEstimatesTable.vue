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
                      <CreateEstimateForm @inputData="updateEstimate" />
                  </modal>
        </div>
      </div>
    </div>

    <div class="table-responsive table-hover">
      <table class="table table-flush">
        <thead class="thead-light">
          <tr>
            <th class="bgcolor">Title</th>
            <th class="bgcolor">Project</th>
            <th class="bgcolor">Developer</th>
            <th class="bgcolor">Date Created</th>
            <th class="bgcolor">Date Estimated</th>
            <th class="bgcolor">Status</th>
            <th class="bgcolor"></th>
            </tr>
          </thead>
            <tbody>
              <tr v-for="estimate in estimates" :key="estimate.id" @updateEstimate="updateEstimate">
            <td class="title">
              {{estimate.title}}
            </td>
            <td class="project">
              {{estimate.project.name}}
            </td>
            <td class="developer">
              {{estimate.developer.name}}
            </td>
            <td class="dateCreated">
              {{ formatDate(estimate.dateCreated) }}
              <!-- {{ row.dateCreated }} -->
            </td>
            <td class="dateEstimated">
              {{estimate.dateEstimated}}
            </td>
            <td>
              <!-- <badge class="badge-dot mr-4" :type="row.statusType">
                <i :class="`bg-${row.statusType}`"></i>
                <span class="status">{{row.status}}</span>
              </badge> -->
                
                <span v-if="estimate.status === 'Submitted'" class="status" id="status-submitted">
                  {{estimate.status}}
                </span>
                <span v-else class="status" id="status-estimated">{{estimate.status}}</span>           
            </td>
          
            <td >
              <span class="action-icons"> 
                <router-link  :to="`/view-estimate/${estimate._id}`" id="view">
                  <i class="rounded-circle fa fa-eye fa-1x" aria-hidden="true" id="my-icons" ></i>
                  <modal :show.sync="estimateModal">
                    <template slot="header">
                            <h3 class="modal-title " id="exampleModalLabel">Estimate</h3>
                        </template>
                  </modal>
                </router-link>
              </span>
          
            </td>
          </tr>
          </tbody>
      </table>
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
import axios from "axios";
// import store from "../../store"
import { format } from 'date-fns' 
// import AuthService from '../services/AuthService';
// const baseURL = "http://localhost:8081/api/estimate-requests";
export default {
  name: "estimates-table",
  components: {
    CreateEstimateForm,
    EditEstimateForm
  },
  props: {
    estimates: Array,
    type: {
      type: String
    },
    title: String,

    estimate: {
      type: Array
    },  
    
  },
  data() {
    return {
      requestEstimateModal: false,
      estimateModal: false,
      format,
      estimateData: ""
      
    };
  },
  watch: {
    estimate() {
      this.estimates.push(this.estimate)
    }
  }, 
  methods: {   
      async created(){
      try{
        if (!this.store.getters.isLoggedIn) {
          this.router.push('/');
          // const res = await axios.get(`http://localhost:8081/api/estimate-requests`)
          // this.estimates = res.data;
        }
      }catch(e){
        console.error(e)
        
      }
    },
    updateEstimate(estimatte){
      this.estimateData = estimatte
    },
    formatDate: function(dateCreated){
      return format(new Date(dateCreated), 'dd/MM/yyy')
    }
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
</style>