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
           <div class="row ">
            <div class="col- pl-3 align-self-start">
             
              <p>Project </p>
              <p>Project Manager </p>
              <p>Date Created </p>
              <p>Due Date </p>
              <p>Main Task Description </p>
            </div>
            <div class="col details align-self-start" > 
              <p>{{estimate.project.name}}</p>
              <p>{{estimate.projectManager.name}}</p>
              <p>{{formatDate(estimate.dateCreated)}}</p>
              <p>{{estimate.dueDate}}</p>
              <p>{{estimate.taskDescription}}</p>
            </div>
          </div>
          <!-- <div class="pl-3 row details" >
            <p>{{estimate.taskDescription}}</p>
          </div> -->
        </div>   
    </div>
    <div class="table-responsive table-hover">
      <table class="table">
  <thead class="thead-light">
    <tr>
        <td class="table-head" scope="col"><b>Sub Task</b></td>
        <td class="table-head" scope="col"><b>Research</b></td>
        <td class="table-head" scope="col"><b>Planning</b></td>
        <td class="table-head" scope="col"><b>Development</b></td>
        <td class="table-head" scope="col"><b>Testing</b></td>
        <td class="table-head" scope="col"><b>Stablization</b></td>
        <td class="table-head" scope="col"><b>Certainity</b></td>
        <td class="table-head" scope="col"><b>Sum Hours (SH)</b></td>
        <td class="table-head" scope="col"><b>Adjusted SH</b></td>
        <td class="table-head" scope="col">
          <span class="action-icons">
            <i v-on:click="isShowing = !isShowing" class="fas fa-comments" id="comments"></i>
          </span>
        </td>
    </tr>
  </thead>
  <tbody v-for="estimation in estimated" :key="estimation._id">
    <tr>
      <td scope="row">{{estimation.subTask}}</td>
      <td>{{estimation.research}}</td>
      <td>{{estimation.planning}}</td>
      <td>{{estimation.development}}</td>
      <td>{{estimation.testing}}</td>
      <td>{{estimation.stabilization}}</td>
      <td>{{estimation.certainity}}</td>
      <td>{{estimation.sumHours}}</td>
      <td>{{estimation.adjustedSumHours}}</td>
      <!-- <td></td> -->
      <td class="text-right pl-4">
        <span class="action-icons">
          <router-link  to="/" id="view">
            <i class="rounded-circle fas fa-pen" aria-hidden="true" id="my-icons"></i>
          </router-link>
        </span>
        <span class="action-icons">
          <router-link  to="/" id="view">
            <i class="rounded-circle fas fa-trash-alt fa-1x" aria-hidden="true" id="my-icons"></i>
          </router-link>
        </span>
      </td>
    </tr>
    <tr v-show="isShowing">
      <th><b>Comment:</b></th>
      <td colspan="10">{{estimate.comments}}</td>
    </tr>
  </tbody>
  <tr>
  <th scope="col">Total</th>
  <th scope="col">2.00hrs</th>
  <th scope="col">4.00hrs</th>
  <th scope="col">4.00hrs</th>
  <th scope="col">4.00hrs</th>
  <th scope="col">4.00hrs</th>
  <th scope="col">90%</th>
  <th scope="col">18.00hrs</th>
  <th scope="col">19.80hrs</th>
  <th></th>
</tr>
</table>
</div>   
  </div>
</template>
<script>
import axios from "axios"
import { format } from "date-fns" 

  export default {
    name: 'estimates-table',
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
         isShowing:false,
         isShow: false,
         estimated: [],
          estimate: {
            dateCreated: "",
            projectManager: "",
            developer: "",
            dueDate: "",
            project: "",
            taskDescription: "",
            title: ""
          }
 
      }
    },
    methods: {
      formatDate: function(dateCreated){
          return format(new Date(dateCreated), 'dd-MM-yyy')
            },
    },
    //fetches estimate when the component is created
    async created(){
      try {
        // const res = await axios.get(`http://localhost:8081/api/estimate-request/` + this.$route.params.id)
        const res = await axios.get(`http://localhost:8081/api/estimate-request/` + this.$route.params.id)
        this.estimate = res.data; 
        //get estimate added by developer
        const response = await axios.get(`http://localhost:8081/api/estimated-estimates/` + this.$route.params.id)
        this.estimated = response.data
        // console.log(res)
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
/* Adjustments to font size of the table head content */
.table thead th {
  font-size: 13px;
  /* font-weight: 700; */
}
.table-head {  
  background: #e7eaec !important;
  
  font-weight: 700;
  /* text-transform: uppercase; */
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
#comments{
 color: #5e72e4;
}
#comments:hover {
  cursor:pointer;
  color: #d10572;
}

/* Desktops and laptops ----------- */
@media only screen  and (min-width : 1224px) {
.card{
  margin-top: 30px;
}
}
/* Adjustments to font size of the table head content */
.table thead th {
  font-size: 13px;
  /* font-weight: 700; */
}
.table-head {  
  background: #e7eaec !important;
  font-size: 90px;
  
  /* font-weight: 700; */
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
/* Large screens ----------- */
/* @media only screen  and (min-width : 1824px) {
.card{
  margin-top: 20px;
  
}
} */
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


</style>
