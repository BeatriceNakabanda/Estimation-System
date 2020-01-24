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
            <p>{{ estimate.dateCreated }}</p>
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
        <td class="table-head" scope="col"><b>Certainity</b></td>
        <!-- <td class="table-head" scope="col"><b>Sum Hours</b></td>
        <td class="table-head" scope="col"><b>Adjusted Sum Hours</b></td> -->
        <td class="table-head" scope="col">
          <span class="action-icons">
            <!-- <i v-on:click="isShowing = !isShowing" class="far fa-comments fa-1x" id="comments"></i> -->
            <i v-on:click="isShowing = !isShowing" class="fas fa-comments" id="comments"></i>
          </span>
        </td>
        <td class="table-head"  scope="col"></td>
    </tr>
  </thead>
  <tbody v-for="tableInfo in tableData" :key="tableInfo.id">
    <tr>
      <td scope="row">{{tableInfo.subTask}}</td>
      <td>{{tableInfo.research}}</td>
      <td>{{tableInfo.planning}}</td>
      <td>{{tableInfo.development}}</td>
      <td>{{tableInfo.testing}}</td>
      <td>{{tableInfo.stabilization}}</td>
      <td>{{tableInfo.certainity}}</td>
      <td>{{tableInfo.sumHours}}</td>
      <td>{{tableInfo.adjustedSumHours}}</td>
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
    </tr>
    <tr v-show="isShowing">
      <th><b>Comment:</b></th>
      <td colspan="10">{{tableInfo.comments}}</td>
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
  <th></th>

</tr>
<tr>
  <td colspan="12" class="text-right">
    <base-button type="primary" size="sm" class="shadow-none spacing btn-md mb-2" @click="modal = true">Add Row</base-button>
    <modal :show.sync="modal" id="modal">
      <template slot="header">
          <h3 class="modal-title" id="exampleModalLabel">New Task</h3>
      </template>
      <!-- Add task form -->
      <form role="form " >  
         <div class="row mt--4">
           <div class="col-sm-3"></div>
            <div class="col-sm-2">
              <h6 class="heading-small text-capitalize float-left  text-resize">Sum hours: </h6>
            </div>
            <div class="col-sm-2 ml-2">
              <h6 class="heading-small  text-capitalize float-left  text-resize" >{{calculatedSumHours}}</h6>
            </div> 
            <div class="col-sm-3 ">
              <h6 class="heading-small text-capitalize float-left  text-resize ">Adjusted Sum:</h6>
            </div>
            <div class="col-sm-1 ml--3">
              <h6 class="heading-small  text-capitalize float-left  text-resize">0.00 hrs</h6>
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
                          v-model="form.task"
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
                      v-model="form.research"
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
                      v-model="form.planning"
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
                      v-model="form.development"
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
                      v-model="form.testing"
                      >
            </base-input>
            </div>
          </div>
            <div class="row mt--2">
            <div class="col-sm-3">
              <h6 class="heading-small text-muted  float-left text-capitalize text-resize">Stabilization</h6>
              <i class="fas fa-info-circle ml-2 mt-2  btn-tooltip" id="myicon" v-b-tooltip.hover.right title="Stabilization ...."></i>
            </div>
            <div class="col-sm-3">  
              <base-input alternative
                      class=""
                      placeholder="0.00hrs"
                      v-model="form.stabilization"
                      >
            </base-input>
            </div>
            <div class="col-sm-3">
              <h6 class="heading-small text-muted  float-left text-capitalize text-resize">Certainty</h6>
              <i class="fas fa-info-circle  mr-2 mt-2 " id="myicon"></i>
            </div>
            <div class="col-sm-3">  
              <base-input alternative
                      class=""
                      placeholder="0.00hrs"
                      v-model="form.certainty"
                      >
            </base-input>
            </div>
          </div>
      
 
          <div class="row mt--2">
            <div class="col-sm-3">
              <h6 class="heading-small text-muted float-left text-capitalize text-resize">Comment</h6>
            </div>
            <div class="col-sm">
              <base-input alternative="">
                  <textarea rows="3" v-model="form.comment" class="form-control form-control-alternative" placeholder="Add comment here ..."></textarea>
              </base-input>
            </div>
          </div>
        </form>
      <!-- <div>
        <AddTaskForm />
      </div> -->
        <template slot="footer">
            <base-button class="shadow-none cancel-color mt--5" type="secondary" @click="modal = false">Close</base-button>
            <base-button class="shadow-none mt--5" type="primary">Add</base-button>
        </template>
    </modal>
  </td>
</tr>
</table>
</div>   
   <div class="card-footer">
      <div class="row  ">
        <div class="col text-left">
          <base-button size="sm" class="shadow-none spacing btn-lg px-5" id="cancel">Cancel</base-button>
        </div>
        <div class="col text-right">
          <base-button type="primary" size="sm" class="shadow-none spacing btn-lg px-4" id="save-draft">Save as draft</base-button>
          <base-button type="primary" size="sm" class="shadow-none spacing btn-lg px-5" id="submit">Submit</base-button>
        </div>
      </div>
   </div>
  </div>
</template>
<script>
// import AddTaskForm from '../Forms/AddTaskForm'
import axios from "axios";
// import { format } from 'date-fns'

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
         form : {
                    task: '',
                    research: 0,
                    planning: 0,
                    development: 0,
                    testing: 0,
                    stabilization: 0,
                    certainty: 0,
                    sumHours: 0,
                    adjustedSumHours: 0,
                    comments: '',
                },
         /* form : {
                id: '',
                subtask: '',
                developer: '',
                project: '',
                dueDate: '',
                taskDescription: ''
            }, */
        estimate: {
            dateCreated: "",
            projectManager: "",
            dueDate: "",
            project: "",
            taskDescription: "",
            title: ""
        },
/*         tableData: [
          {
            subTask: '',
            research: '',
            planning: '',
            development: '',
            testing: '',
            stabilization: '',
            certainity: '',
            sumHours: '',
            adjustedSumHours: '',
            comments: '',
          }
        ] */
        
      }
    },
    computed: {
      calculatedSumHours: function(){
        return parseInt(this.form.research) + parseInt(this.form.planning) + parseInt(this.form.development) + parseInt(this.form.testing) + parseInt(this.form.stabilization);
      }
    },
    methods: {
        /* formatDate: function(date){
        return format(new Date(date), 'dd-MM-yyy')
      } */
    },
    //fetches estimate when the component is created
    async created(){
      try {
        const res = await axios.get(`http://localhost:8081/api/estimate-request/` + this.$route.params.id)
        this.estimate = res.data; 
        console.log(res)
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
</style>
