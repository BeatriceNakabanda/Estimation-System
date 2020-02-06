<template>
  <div class="card shadow" id="card"
       :class="type === 'dark' ? 'bg-default': ''">
    <div v-on:click="isShow = !isShow"   class="card-header border-1"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            {{estimate.title}} 
          </h3>
        </div>
        <div class="col">
         <i class="ni ni-bold-down" id="bold-down"></i>
        </div>
      </div>
    </div>
      <div class="card-body">
        <div v-show="isShow"  class="content">
           <div class="row">
            <div class="col- pl-3 align-self-start">
              <p>Project </p>
              <p>Project Manager </p>
              <p>Date Created </p>
              <p>Due Date </p>
              <p>Main Task Description </p>
            </div>
            <div class="col details align-self-start">
            <p>{{estimate.project.name}}</p>
            <p>{{estimate.projectManager.name}}</p>
            <p>{{formatDate(estimate.dateCreated)}}</p>
            <p>{{estimate.dueDate}}</p>
            <p>{{estimate.taskDescription}}</p>
            </div>
          </div>
        </div>   
    </div>
    <div class="table-responsive table-hover">
      <table class="table">
        <thead class="thead-light">
            <tr>
          <td class="table-head" scope="col"><b>Task</b></td>
          <td class="table-head" scope="col"><b>Research</b></td>
          <td class="table-head" scope="col"><b>Planning</b></td>
          <td class="table-head" scope="col"><b>Development</b></td>
          <td class="table-head" scope="col"><b>Testing</b></td>
          <td class="table-head" scope="col"><b>Stablization</b></td>
          <td class="table-head" scope="col"><b>Certainty</b></td>
          <!-- <td class="table-head" scope="col"><b>Sum Hours</b></td>
          <td class="table-head" scope="col"><b>Adjusted Sum Hours</b></td> -->
          <td class="table-head" scope="col">
            <span class="action-icons">
              <!-- <i v-on:click="isShowing = !isShowing" class="far fa-comments fa-1x" id="comments"></i> -->
              <i v-on:click="isShowing = !isShowing" class="fas fa-comments" id="comments"></i>
            </span>
          </td>
          <td class="table-head"  scope="col"></td>
          <td class="table-head" scope="col"></td>
          <td class="table-head" scope="col"><b></b></td> 
      </tr>
    </thead>
  <tbody v-for="estimationInfo in estimationData" :key="estimationInfo.id">
    <tr>
      <td scope="row">{{estimationInfo.task}}</td>
      <td>{{estimationInfo.research}}</td>
      <td>{{estimationInfo.planning}}</td>
      <td>{{estimationInfo.development}}</td>
      <td>{{estimationInfo.testing}}</td>
      <td>{{estimationInfo.stabilization}}</td>
      <td>{{estimationInfo.certainty}}</td>

      <!-- <td>{{estimationInfo.sumHours}}</td>
      <td>{{estimationInfo.adjustedSumHours}}</td> -->
      <td></td>
      
      <td class="text-right pl-4">
        <span class="action-icons">
          <router-link  to="/" id="view">
            <i class="rounded-circle fas fa-pen" aria-hidden="true" id="action-icons"></i>
          </router-link>
        </span>
        <span class="action-icons">
          <router-link  to="/" id="view">
            <i class="rounded-circle fas fa-trash-alt fa-1x" aria-hidden="true" id="action-icons"></i>
          </router-link>
        </span>
      </td>
      <td></td>
      <td></td>
    </tr>
    <tr v-show="isShowing">
      <th><b>Comment:</b></th>
      <td colspan="10">{{estimationInfo.comments}}</td>
    </tr>
  </tbody>
  <!-- <tr>
  <th scope="col">Total</th>
  <th scope="col"></th>
  <th scope="col"></th>
  <th scope="col"></th>
  <th scope="col"></th>
  <th scope="col"></th>
  <th scope="col"></th>
  <th scope="col"></th>
  <th scope="col"></th>
  <th></th>
  <th></th>

</tr> -->
<tr>
  <td colspan="12" class="text-right">
    <base-button type="primary" size="sm" class="shadow-none spacing btn-md mb-2" @click="modal = true">Add Task</base-button>
    <modal :show.sync="modal" id="modal">
      <template slot="header">
          <h3 class="modal-title" id="exampleModalLabel">New Task</h3>
      </template>
      <!-- Add task form -->
      <form role="form" method="POST">  
         <div class="row mt--4">
           <div class="col-sm-3"></div>
            <div class="col-sm-2">
              <h6 class="heading-small text-capitalize float-left  text-resize">Sum hours: </h6>
            </div>
            <div class="col-sm-2 ml-2">
              <h6 class="heading-small  text-capitalize float-left  text-resize" >{{calculatedSumHours}} hrs</h6>
            </div> 
            <div class="col-sm-3 ">
              <h6 class="heading-small text-capitalize float-left  text-resize" >Adjusted Sum: </h6>
            </div>
            <div class="col-sm-1 ml--3">
              <h6 class="heading-small  text-capitalize float-left  text-resize">{{calculatedAdjustedSumHours}} hrs</h6>
            </div>
          </div>
          <div class="row ">
            <div class="col-sm-3 ">
              <h6 class="text-resize heading-small text-muted float-left text-capitalize">Task</h6>
            </div>
              <div class="col-sm">
                  <base-input alternative
                          class=""
                          placeholder="Add sub task here..."
                          v-model="estimateData.task"
                          :class="{ 'has-error': submitting && invalidTask } " 
                          >
                </base-input>
              </div>  
          </div>
          <div class="row mt--2">
            <div class="col-sm-3">
              <h6 class="heading-small text-muted  float-left text-capitalize text-resize">Research</h6>
            </div>
            <div class="col-sm-3">  
              <base-input alternative
                      class=""
                      placeholder="0.00hrs"
                      v-model="estimateData.research"
                      :class="{ 'has-error': submitting && invalidResearchTime } " 
                      >
            </base-input>
            </div>
            <div class="col-sm-3">
              <h6 class="heading-small text-muted  float-left text-capitalize text-resize">Planning</h6>
            </div>
            <div class="col-sm-3">  
              <base-input alternative
                      class=""
                      placeholder="0.00hrs"
                      v-model="estimateData.planning"
                      :class="{ 'has-error': submitting && invalidPlanningTime } " 
                      >
            </base-input>
            </div>
          </div>
                    <div class="row mt--2">
            <div class="col-sm-3">
              <h6 class="heading-small text-muted  float-left text-capitalize text-resize">Development</h6>
            </div>
            <div class="col-sm-3">  
              <base-input alternative
                      class=""
                      placeholder="0.00hrs"
                      v-model="estimateData.development"
                      :class="{ 'has-error': submitting && invalidDevelopmentTime } " 

                      >
            </base-input>
            </div>
            <div class="col-sm-3">
              <h6 class="heading-small text-muted  float-left text-capitalize text-resize">Testing</h6>
            </div>
            <div class="col-sm-3">  
              <base-input alternative
                      class=""
                      placeholder="0.00hrs"
                      v-model="estimateData.testing"
                      :class="{ 'has-error': submitting && invalidTestingTime } " 
                      >
            </base-input>
            </div>
          </div>
            <div class="row mt--2">
            <div class="col-sm-3">
              <h6 class="heading-small text-muted  float-left text-capitalize text-resize">Stabilization</h6>
              <!-- <i class="fas fa-info-circle ml-2 mt-2  btn-tooltip" id="myicon" v-b-tooltip.hover.right title="Stabilization ...."></i> -->
            </div>
            <div class="col-sm-3">  
              <base-input alternative
                      class=""
                      placeholder="0.00hrs"
                      v-model="estimateData.stabilization"
                      :class="{ 'has-error': submitting && invalidStabilizationTime } " >
            </base-input>
            </div>
            <div class="col-sm-3">
              <h6 class="heading-small text-muted  float-left text-capitalize text-resize">Certainty</h6>
              <!-- <i class="fas fa-info-circle  mr-2 mt-2 " id="myicon"  v-b-tooltip.hover.right title="Certainty must be les"></i> -->
            </div>
            <div class="col-sm-3">  
              <base-input alternative
                      class=""
                      placeholder="0.00hrs"
                      :class="{ 'has-error': submitting && invalidCertainty } ">
                      <select class="custom-select" id="inputGroupSelect01" v-model="estimateData.certainty">
                        <option disabled value="">Please select</option>
                        <option v-for="certntyValue in certainty" :key="certntyValue.id">{{certntyValue.certaintyValue}}</option>
                        </select>
            </base-input>
            </div>
          </div>
      
 
          <div class="row mt--2">
            <div class="col-sm-3">
              <h6 class="heading-small text-muted float-left text-capitalize text-resize">Comment</h6>
            </div>
            <div class="col-sm">
              <base-input alternative="">
                  <textarea rows="3" v-model="estimateData.comment" class="form-control form-control-alternative" placeholder="Add comment here ..."></textarea>
              </base-input>
            </div>
          </div>
           <p v-if="error && submitting" class="error-message">
                ❗Please fill in all fields
            </p>
            <p v-if="success" class="success-message">
                ✅ Successfully sent
            </p>
        </form>
      <!-- <div>
        <AddTaskForm />
      </div> -->
        <template slot="footer">
            <base-button class="shadow-none cancel-color mt--5" type="secondary" @click="modal = false">Close</base-button>
            <base-button class="shadow-none mt--5" type="primary" @click="addEstimate">Add</base-button>
        </template>
        
    </modal>
  </td>
</tr>
</table>
</div>   
   <div class="card-footer">
      <div class="row">
        <div class="col text-left">
          <base-button size="sm" class="shadow-none spacing btn-lg px-5" id="cancel">Cancel</base-button>
        </div>
        <div class="col text-right">
          <!-- <base-button type="primary" size="sm" class="shadow-none spacing btn-lg px-4" id="save-draft">Save as draft</base-button> -->
          <base-button type="primary" size="sm" class="shadow-none spacing btn-lg px-5" id="submit" @click="handleSubmitEstimate">Submit</base-button>
        </div>
      </div>
      <!-- <div class="row text-center">
        
        <p v-if="error && submitting" class="error-message">
                ❗Unsuccessful
            </p>
            <p v-if="success" class="success-message">
                ✅ Successfully sent
            </p>
      
      </div> -->
   </div>
  </div>
</template>
<script>
// import AddTaskForm from '../Forms/AddTaskForm'
import AuthService from '../../services/AuthService'
import axios from "axios";
import { format } from 'date-fns'

  export default {
    name: 'pending-table',
    components: {
      // AddTaskForm,
    },
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
         modal: false,
         isShowing:false,
         isShow: false,
         submitting: false,
         error: false,
         success: false,
         format,
         estimateData : {
           task: '',
           research: 0,
           planning: 0,
           development: 0,
           testing: 0,
           stabilization: 0,
           certainty: 0,
           sum: 0,
           adjustedSum: 0,
           comments: '',
           totalSum: 0
          },
          estimationData: [],

        estimate: {
            dateCreated: "",
            projectManager: "",
            dueDate: "",
            project: "",
            taskDescription: "",
            title: ""
        },
        certainty: [
          { 
            id: 1,
            certaintyValue: 60 
          },
          { 
            id: 2,
            certaintyValue: 65 
          },
          { 
            id: 3,
            certaintyValue: 70 
          },
          { 
            id: 4,
            certaintyValue: 75
          },
          { 
            id: 5,
            certaintyValue: 80
          },
          { 
            id: 6,
            certaintyValue: 85 
          },
          { 
            id: 7,
            certaintyValue: 90 
          }
        ],

        
      }
    },
    computed: {

      calculatedSumHours: function(){
        if (this.estimateData.research === '' || this.estimateData.planning === ''|| this.estimateData.development === '' || this.estimateData.testing === '' || this.estimateData.stabilization === '') {
          return 0
        }else{
          return (parseInt(this.estimateData.research) + parseInt(this.estimateData.planning) + parseInt(this.estimateData.development) + parseInt(this.estimateData.testing) + parseInt(this.estimateData.stabilization)).toFixed(2);
        }
      },
      calculatedAdjustedSumHours: function(){
        return (parseInt(this.calculatedSumHours) * (1 + (1 - parseInt(this.estimateData.certainty) / 100))).toFixed(2)
      },
      // calculatedTotalResearch: function(){
      //   return estimateData.research
      // },
      invalidTask(){
        return this.estimateData.task === ''
      },
      invalidResearchTime(){
          return this.estimateData.research=== '' || isNaN( this.estimateData.research)
      },
      invalidPlanningTime(){
          return this.estimateData.planning === '' || isNaN(this.estimateData.planning)
      },
      invalidTestingTime(){
          return this.estimateData.testing === '' || isNaN(this.estimateData.testing)
      },
      invalidDevelopmentTime(){
          return this.estimateData.development === '' || isNaN(this.estimateData.development)
      },
      invalidStabilizationTime(){
          return this.estimateData.stabilization === '' || isNaN(this.estimateData.stabilization)
      },
      invalidCertainty(){
          return this.estimateData.testing === ''
      },
      
    },
    methods: {
       formatDate: function(dateCreated){
          return format(new Date(dateCreated), 'dd-MM-yyy')
            },
        //calculate total time for research
        // totalResearchTime(){

        // },
      
      async addEstimate(){
        this.submitting = true
        if(this.invalidTask || this.invalidResearchTime || this.invalidPlanningTime || this.invalidTestingTime || this.invalidDevelopmentTime || this.invalidStabilizationTime || this.invalidCertainty){
          this.error = true
          return
        }
        let sum = this.calculatedSumHours
        let adjustedSum = this.calculatedAdjustedSumHours
        let newEstimate ={
            developer: this.$store.getters.getUser.id,
            task: this.estimateData.task,
            research: this.estimateData.research,
            planning: this.estimateData.planning,
            development: this.estimateData.development,
            testing: this.estimateData.testing,
            stabilization: this.estimateData.stabilization,
            certainty: this.estimateData.certainty,
            sum,
            adjustedSum,
            comments: this.estimateData.comment, 
        }
        console.log(sum)
        console.log(adjustedSum)
        this.success=true
          // const response = await AuthService.addEstimation(newEstimate)
          // console.log(newEstimate)
          // console.log(response.addedEstimate.submittedDate)
          const response = await axios.post(`http://localhost:8081/api/create-estimate/` + this.$route.params.id, newEstimate)
          console.log(response)

          this.estimationData.push({
            task: response.data.task,
            research: response.data.research,
            planning: response.data.planning,
            development: response.data.development,
            testing: response.data.testing,
            stabilization: response.data.stabilization,
            certainty: response.data.certainty,
            comments: response.data.comments,
            sumHours: response.data.sumHours,
            adjustedSumHours: response.data.adjustedSumHours
          })

          const resp = await axios.put(`http://localhost:8081/api/update-getTotal/` + this.$route.params.id)
          console.log(resp)

          

      },
      //Sending estimates added to project manager by developer
      async handleSubmitEstimate(){
        // console.log(this.estimationData)
        const response = await axios.put(`http://localhost:8081/api/update-estimateRequest/` + this.$route.params.id, this.estimationData)
        console.log(response)

        this.success = true
        this.error = false
        
      }
    },
    //fetches estimate when the component is created
    async created(){
      try {
        const res = await axios.get(`http://localhost:8081/api/estimate-request/` + this.$route.params.id)
        this.estimate = res.data; 
        // console.log(res.data )
        


        // const loggedInDeveloper = this.$store.getters.getUser.id;
        // const response = await axios.get(`http://localhost:8081/api/get-all-estimates/` + loggedInDeveloper)
        const projectManagerId = res.data.projectManager._id
        // console.log(projectManagerId)
        const response = await axios.get(`http://localhost:8081/api/get/` + this.$route.params.id + `/` + projectManagerId)

        this.estimationData = response.data
        console.log(response.data)
        
        
      } catch(e){
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


/* displaying action icons on hover */
table > tbody > tr .action-icons{
  visibility: hidden;
}
table > tbody > tr:hover .action-icons{
  visibility: visible;
}

.details {
  /* margin-left: -800px; */
  color: rgb(140, 140, 146);
}
base-button{
  border-radius: 4px;
}

#cancel{
  background-color: #e2e0e1;
  border: none;
  color: #747273;
}
#save-draft{
  background-color: #faf9f9;
  color: #5e72e4;
  border: 1px solid #5e72e4;
}

/* Desktops and laptops ----------- */
@media only screen  and (min-width : 1224px) {
.card{
  margin-top: 30px;
}
}
/* Adjustments to font size of the table head content */
.table thead th {
  font-size: 13x;
  /* font-weight: 700; */
}
.table-head {  
  background: #e7eaec !important;
  font-size: 10px;
  
  font-weight: 700;
  /* text-transform: uppercase; */
}
iframe {
  display:block;
  margin-top: 20px;
  margin-left: 200px;
  width:850px;
  height:300px;
}
#bold-down{
  float: right;
  cursor: pointer;
}
.card-header{
  cursor: pointer;
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

/* Styling fonts */
.styling{
  font-weight: 400;
  font-size: 14px;
}
#modal{
  height: fit-content;
  /* margin-top: -4px; */
}

/* resizing the labels for the modal */
.text-resize{
  font-size: 14px;
}
/* Large screens ----------- */
/* @media only screen  and (min-width : 1824px) {
.card{
  margin-top: 20px;
  
}
} */
#comments{
 color: #5e72e4;
}
#comments:hover {
  cursor:pointer;
  color: #d10572;
}
#commentsactive {font-size: 120%;}
#action-icons {
  background-color: #5e72e4;
  color: #eee7eb;
}
#action-icons:hover {
  background-color: #d10572;
  color: #eee7eb;
}
/* .table{
  width: 100%; 
}
.card{
  width: 79vw;
} */
#myicon{
  color: #5e72e4;
}
#myicon:hover {
  cursor:pointer;
  color: #d10572;
}
#myicon:hover, #myiconactive {font-size: 120%;}
[class*='-message'] {
    font-weight: 500;
  }
  .error-message {
    color: #d33c40;
    text-align: left;
  }
  .success-message {
    color: #32a95d;
    text-align: center;
  }
</style>
