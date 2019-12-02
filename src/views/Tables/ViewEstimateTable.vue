<template>
  <div class="card shadow" id="card"
       :class="type === 'dark' ? 'bg-default': ''">
    <div v-on:click="isShow = !isShow"   class="card-header border-1"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            {{title}} 
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
            <div class="col details align-self-start" v-for="estimate in estimates" v-bind:key="estimate.id">
            <p>{{estimate.project}}</p>
            <p>{{estimate.projectManager}}</p>
            <p>{{estimate.dateCreated}}</p>
            <p>{{estimate.dueDate}}</p>
            </div>
          </div>
          <div class="pl-3 row details" v-for="estimate in estimates" v-bind:key="estimate.id">
            <p>{{estimate.mainTaskDescription}}</p>
          </div>
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
<<<<<<< HEAD
  <tbody v-for="estimate in estimates" :key="estimate.id">
=======
  <tbody v-for="estimate in estimates" :key="estimate._id">
>>>>>>> 5130b298bb49fb6cd0ce6be654434809533f7458
    <tr>
      <td scope="row">{{estimate.subTask}}</td>
      <td>{{estimate.research}}</td>
      <td>{{estimate.planning}}</td>
      <td>{{estimate.development}}</td>
      <td>{{estimate.testing}}</td>
      <td>{{estimate.stabilization}}</td>
      <td>{{estimate.certainity}}</td>
      <td>{{estimate.sumHours}}</td>
      <td>{{estimate.adjustedSumHours}}</td>
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
import axios from "axios";
const baseURL = "http://localhost:8081/estimates";

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
         estimates: [], 
 
      }
    },
    //fetches estimates when the component is created
    async created(){
      try {
<<<<<<< HEAD
        const res = await axios.get(`http://localhost:8081/estimates` + this.$route.params.id)
=======
        const res = await axios.get(`http://localhost:8081/estimates` )
>>>>>>> 5130b298bb49fb6cd0ce6be654434809533f7458

        this.estimates = res.data; 
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
