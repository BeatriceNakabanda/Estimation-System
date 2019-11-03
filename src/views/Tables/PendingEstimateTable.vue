<template>
  <div class="card shadow" id="card"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-1"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            {{title}}
          </h3>
        </div>
        
      </div>
    </div>
        <div class="card-body">
          <div class="row ">
            <!-- <div class="col- pl-3 align-self-start">
              <p>Project :</p>
              <p>Project Manager :</p>
              <p>Date Created :</p>
              <p>Due Date :</p>
              <p>Main Task Description :</p>
            </div>
            <div class="col details align-self-end" v-for="tableDataDetail in tableDataDetails" v-bind:key="tableDataDetail.id">
            <p>{{tableDataDetail.project}}</p>
            <p>{{tableDataDetail.projectManager}}</p>
            <p>{{tableDataDetail.dateCreated}}</p>
            <p>{{tableDataDetail.dueDate}}</p>
            <p>{{tableDataDetail.mainTaskDescription}}</p>
            </div> -->
          </div>
          <!-- <div class="row" v-for="tableDataDetail in tableDataDetails" v-bind:key="tableDataDetail.id">
            <p>{{tableDataDetail.mainTaskDescription}}</p>
          </div> -->
          
    </div>
    <hr class="mt--1">
    <div class="table-responsive table-hover table-lg">
      <base-table class="table table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'" 
                  tbody-classes="list"
                  :data="tableData" id="left">
        <template  slot="columns">
          <td class="table-head">Sub Task</td>
          <td class="table-head">Research</td>
          <td class="table-head">Planning</td>
          <td class="table-head">Development</td>
          <td class="table-head">Testing</td>
          <td class="table-head">Stabilization</td>
          <td class="table-head">Certainity</td>
          <td class="table-head">Sum hours</td>
          <td class="table-head">Adjusted sum hours</td>
          <td class="table-head">Comments</td>
          <td class="table-head"></td>
        </template>
          <template class="table-row" slot-scope="{row} ">
          <td>
            <div class="media" >
              
              <div class="media-body" >
                <span class="name mb-0 text-sm">{{row.subTask}}</span>
              </div>
            </div>
          </td>
          
          <td class="research">
            {{row.research}}
          </td>
          <td class="project">
            {{row.planning}}
          </td>
          <td class="dateCreated">
            {{row.development}}
          </td>
          <td class="dateEstimated">
            {{row.testing}}
          </td>
          <td class="dateEstimated">
            {{row.stabilization}}
          </td>
          <td class="dateEstimated">
            {{row.certainity}}
          </td>
          <td class="dateEstimated">
            {{row.sumHours}}
          </td>
          <td class="dateEstimated">
            {{row.adjustedSumHours}}
          </td>
          <td class="dateEstimated">
            {{row.comments}}
          </td>
          <td >
            <span class="action-icons">
              <router-link  to="/" id="view">
                <i class="rounded-circle fas fa-pen fa-1x" aria-hidden="true"></i>
              </router-link>
            </span>
            <span class="action-icons">
              <router-link  to="/" id="view">
                <i class="rounded-circle fas fa-trash-alt fa-1x" aria-hidden="true"></i>
              </router-link>
            </span>
          </td>
          </template>
      </base-table>
        <div class="row">
        <div class="col mx-3 text-right">
          <base-button type="primary" size="sm" class="shadow-none spacing btn-md mb-2">Add Row</base-button>
        </div>
      </div>
      <hr class=" mt--1" >
      <div class="row mt--2 mx-1">
        <div class="col text-left">
          <base-button size="md" class="shadow-none spacing btn-lg px-5" id="cancel">Cancel</base-button>
        </div>
        <div class="col text-right">
          <base-button size="md" class="shadow-none spacing btn-md px-4" id="save-draft">Save as draft</base-button>
          <base-button type="primary" size="md" class="shadow-none spacing btn-md px-5" id="submit">Submit</base-button>
        </div>
      </div>     
    </div>

  </div>
</template>
<script>
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
              mainTaskDescription: 'There is need for a dashboard representing different navigation links   for students',
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

/* Large screens ----------- */
/* @media only screen  and (min-width : 1824px) {
.card{
  margin-top: 20px;
  
}
} */



</style>
