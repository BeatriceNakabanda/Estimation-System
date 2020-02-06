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
            <p>{{formatDateCreated(estimate.dateCreated)}}</p>
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
      <td></td>
      <td></td>
      <!-- <td>{{estimationInfo.sumHours}}</td>
      <td>{{estimationInfo.adjustedSumHours}}</td> -->
      

  
    </tr>
    <tr v-show="isShowing">
      <th><b>Comment:</b></th>
      <td colspan="10">{{estimationInfo.comments}}</td>
    </tr>
  </tbody>
  <tr>
  <th scope="col">Total</th>
  <th scope="col">{{(estimate.ResearchTotal).toFixed(2)}}hrs</th>
  <th scope="col">{{(estimate.PlanningTotal).toFixed(2)}}hrs</th>
  <th scope="col">{{(estimate.DevelopmentTotal).toFixed(2)}}hrs</th>
  <th scope="col">{{(estimate.testingTotal).toFixed(2)}}hrs</th>
  <th scope="col">{{(estimate.stabilizationTotal).toFixed(2)}}hrs</th>
  <th scope="col">{{(estimate.certaintyAverage).toFixed(2)}}hrs</th>
  <th></th>
  <th></th>

  

</tr>

</table>
</div>   

  </div>
</template>
<script>
// import AddTaskForm from '../Forms/AddTaskForm'
import AuthService from '../../services/AuthService'
import axios from "axios";
import { format } from 'date-fns'

  export default {
    name: 'submitted-table',
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

          estimationData: [],

        estimate: {
            dateCreated: "",
            projectManager: "",
            dueDate: "",
            project: "",
            taskDescription: "",
            title: ""
        },


        
      }
    },

    methods: {
        formatDateCreated: function(dateCreated){
          return format(new Date(dateCreated), 'dd-MM-yyy')
        },
        // formatDueDate: function(dueDate){
        //   return format(new Date(dueDate), 'dd-MM-yyy')
        // },
    },
    //fetches estimate when the component is created
    async created(){
      try {
        const res = await axios.get(`http://localhost:8081/api/estimate-request/` + this.$route.params.id)
        this.estimate = res.data; 
        // console.log(res.data )
        
        const projectManagerId = res.data.projectManager._id
        // console.log(projectManagerId)
        const response = await axios.get(`http://localhost:8081/api/get/` + this.$route.params.id + `/` + projectManagerId)

        // const response = await axios.get(`http://localhost:8081/api/estimated-estimates/` + this.$route.params.id)

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
    text-align: left;
  }
</style>
