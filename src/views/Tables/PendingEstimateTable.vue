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
              <p>Project :</p>
              <p>Project Manager :</p>
              <p>Date Created :</p>
              <p>Due Date :</p>
              <p>Main Task Description :</p>
            </div>
            <div class="col details align-self-start" v-for="tableDataDetail in tableDataDetails" v-bind:key="tableDataDetail.id">
            <p>{{tableDataDetail.project}}</p>
            <p>{{tableDataDetail.projectManager}}</p>
            <p>{{tableDataDetail.dateCreated}}</p>
            <p>{{tableDataDetail.dueDate}}</p>
            <!-- <p>{{tableDataDetail.mainTaskDescription}}</p> -->
            </div>
          </div>
          <div class="pl-3 row details" v-for="tableDataDetail in tableDataDetails" v-bind:key="tableDataDetail.id">
            <p>{{tableDataDetail.mainTaskDescription}}</p>
          </div>
        </div>   
    </div>
    <!-- <hr class="mt--1"> -->
<div class="table-responsive table-hover">
      <base-table class="table table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'" 
                  tbody-classes="list"
                  :data="tableData" id="left">
        <template  slot="columns"  >
          <td class="table-head">Sub Task</td>
          <td class="table-head">Research</td>
          <td class="table-head">Planning</td>
          <td class="table-head">Development</td>
          <td class="table-head">Testing</td>
          <td class="table-head">Stabilization</td>
          <td class="table-head">Certainity</td>
          <td class="table-head">Sum hours</td>
          <td class="table-head">Adjusted sum hours</td>
          <td class="table-head"></td>
          <td class="table-head"></td>
        </template>
          <template class="table-row" slot-scope="{row}">
            <td>
              {{row.subTask}}
            </td>
            <td>
              {{row.research}}
            </td>
            <td>
              {{row.planning}}
            </td>
            <td>
              {{row.development}}
            </td>
            <td>
              {{row.testing}}
            </td>
            <td>
              {{row.stabilization}}
            </td>
            <td>
              {{row.certainity}}
            </td>
            <td>
              {{row.sumHours}}
            </td>
            <td>
              {{row.adjustedSumHours}}
            </td>
            <td >
              <span class="action-icons">
                <router-link  to="/" id="view">
                  <i class="rounded-circle fa fa-eye fa-1x" aria-hidden="true"></i>
                </router-link>
              </span>
              <span class="action-icons">
                <router-link  to="/" id="view">
                  <i class="rounded-circle fas fa-pen" aria-hidden="true"></i>
                </router-link>
              </span>
              <span class="action-icons">
                <i v-on:click="isShowing = !isShowing" class="ni ni-bold-down  pt-2" id="bold-down"></i>
              </span>
            </td>
            <div v-show="isShow"  class="content">
           <div class="row ">
            <div class="col- pl-3 align-self-start">
              <p>Project :</p>
              <p>Project Manager :</p>
              <p>Date Created :</p>
              <p>Due Date :</p>
              <p>Main Task Description :</p>
            </div>
            <div class="col details align-self-start" v-for="tableDataDetail in tableDataDetails" v-bind:key="tableDataDetail.id">
            <p>{{tableDataDetail.project}}</p>
            <p>{{tableDataDetail.projectManager}}</p>
            <p>{{tableDataDetail.dateCreated}}</p>
            <p>{{tableDataDetail.dueDate}}</p>
            <!-- <p>{{tableDataDetail.mainTaskDescription}}</p> -->
            </div>
          </div>
          <div class="pl-3 row details" v-for="tableDataDetail in tableDataDetails" v-bind:key="tableDataDetail.id">
            <p>{{tableDataDetail.mainTaskDescription}}</p>
          </div>
        </div>   
          </template>
          <!-- <template class="table-row" slot-scope="{row2}"  >
          <tr v-show="isShowing">
                <td>
                    <ul class="list-group">
                    <li class="list-group-item disabled">{{row2.comments}}</li>
                    
                    </ul>
                </td>
              </tr>
              </template> -->
      </base-table>
    </div>

  </div>
</template>
<script>
// Import Vue and vue2-collapse
import Vue from 'vue'
import VueCollapse from 'vue2-collapse'

// Loading the plugin into the Vue.
Vue.use(VueCollapse)
  export default {
    name: 'pending-table',
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
        tableData: [
          {
            id: 1,
            subTask: 'Navbar',
            research: '1.00hrs',
            planning: '2.00hrs',
            development: '2.00hrs',
            testing: '2.00hrs',
            stabilization: '2.00hrs',
            certainity: '90%',
            sumHours: '9.00hrs',
            adjustedSumHours: '9.90hrs',
            comments: 'This should work well enough.',
          },
          {
            id: 2,
            subTask: 'Table',
            research: '1.00hrs',
            planning: '2.00hrs',
            development: '2.00hrs',
            testing: '2.00hrs',
            stabilization: '2.00hrs',
            certainity: '90%',
            sumHours: '9.00hrs',
            adjustedSumHours: '9.90hrs',
            comments: 'The hours are accurate.',
          },
        ],
        tableDataDetails: [
           {
             id: 1,
              project: 'Refactory',
              projectManager: 'David Pereira',
              dateCreated: '20-10-2019',
              dueDate: '23-10-2019',
              mainTaskDescription: 'There is need for a dashboard representing different navigation links for students. There is need for a dashboard representing different navigation links for students. There is need for a dashboard representing different navigation links for students',
           }
        ],
        
      }
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
  /* font-weight: 700; */
}
.table-head {  
  background: #e7eaec !important;
  
  /* font-weight: 700; */
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



</style>
