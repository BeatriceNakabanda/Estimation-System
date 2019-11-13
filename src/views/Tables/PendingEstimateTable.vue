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
            <div class="col details align-self-start" v-for="tableDataDetail in tableDataDetails" v-bind:key="tableDataDetail.id">
            <p>{{tableDataDetail.project}}</p>
            <p>{{tableDataDetail.projectManager}}</p>
            <p>{{tableDataDetail.dateCreated}}</p>
            <p>{{tableDataDetail.dueDate}}</p>
            </div>
          </div>
          <div class="pl-3 row details" v-for="tableDataDetail in tableDataDetails" v-bind:key="tableDataDetail.id">
            <p>{{tableDataDetail.mainTaskDescription}}</p>
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
            <i v-on:click="isShowing = !isShowing" class="far fa-comments fa-1x" id="comments"></i>
          </span>
        </td>
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
      <!-- <td></td> -->
      <td class="text-right pl-4">
        <span class="action-icons">
          <router-link  to="/" id="view">
            <i class="rounded-circle fas fa-pen" aria-hidden="true"></i>
          </router-link>
        </span>
        <span class="action-icons">
          <router-link  to="/" id="view">
            <i class="rounded-circle fas fa-trash-alt fa-1x" aria-hidden="true"></i>
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
</tr>
<tr>
  <td colspan="12" class="text-right">
    <base-button type="primary" size="sm" class="shadow-none spacing btn-md mb-2" @click="modal = true">Add Row</base-button>
    <modal :show.sync="modal">
      <template slot="header">
          <h3 class="modal-title " id="exampleModalLabel">Add Sub Task</h3>
      </template>
      <div>
        <form role="form">
          <div class="row">
            <div class="col-sm-3">
              <h6 class="text-resize heading-small text-muted mb-4 float-left text-capitalize">Sub Task</h6>
            </div>
              <div class="col-sm">
                  <base-input alternative
                          class="mb-3"
                          placeholder="Add sub task here..."
                          v-model="form.subtask"
                          >
                </base-input>
              </div>
          </div>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="heading-small text-muted mb-4 float-left text-capitalize text-resize">Research</h6>
            </div>
            <div class="col-sm">
              <base-input alternative
                      class="mb-3"
                      placeholder="Add research here..."
                      v-model="form.research"
                      >
            </base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="heading-small text-muted mb-4 float-left text-capitalize text-resize">Planning</h6>
            </div>
            <div class="col-sm">
              <base-input alternative
                      class="mb-3"
                      placeholder="Add planning here..."
                      v-model="form.planning"
                      >
            </base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="heading-small text-muted mb-4 float-left text-capitalize text-resize">Development</h6>
            </div>
            <div class="col-sm-9">
              <base-input 
                          alternative
                          class="mb-3"
                          placeholder="Add development here..."
                          v-model="form.development"
              >
                  
              </base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="heading-small text-muted mb-4 float-left text-capitalize text-resize">Testing</h6>
            </div>
            <div class="col-sm-9">
              <base-input 
                          alternative
                          class="mb-3"
                          placeholder="Add testing here..."
                          v-model="form.testing"
              >
                  
              </base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="heading-small text-muted mb-4 float-left text-capitalize text-resize">Stabilization </h6>
            </div>
            <div class="col-sm-9">
              <base-input 
                          alternative
                          class="mb-3"
                          placeholder="Add stabilization here..."
                          v-model="form.stabilization"
              >
              </base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="heading-small text-muted mb-4 float-left text-capitalize text-resize">Certainty</h6>
            </div>
            <div class="col-sm">
              <base-input 
                          alternative
                          class="mb-3"
                          placeholder="Add certainty here..."
                          v-model="form.certainty"
              >
              <select class="custom-select" id="inputGroupSelect01">
                        <option selected>Add certainty...</option>
                        <option value="1">5%</option>
                        <option value="2">10%</option>
                        <option value="3">15%</option>
                        <option value="4">20%</option>
                      </select>
              </base-input>
            </div>  
          </div>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="heading-small text-muted mb-4 float-left text-capitalize text-resize">Sum hours</h6>
            </div>
            <div class="col-sm-1">
              <p class="styling">0 hrs</p>
            </div>  
          </div>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="heading-small text-muted mb-4 float-left text-capitalize text-resize">Adjusted Sum</h6>
            </div>
            <div class="col-sm-1">
              <p class="styling">0 hrs</p>
            </div>  
          </div>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="heading-small text-muted mb-4 float-left text-capitalize text-resize">Comment</h6>
            </div>
            <div class="col-sm-12">
              <base-input alternative="">
                  <textarea rows="4" v-model="form.taskDescription" class="form-control form-control-alternative" placeholder="Add main task description here ..."></textarea>
              </base-input>
            </div>
          </div>
        </form>
      </div>
        <template slot="footer">
            <base-button class="shadow-none cancel-color" type="secondary" @click="modal = false">Close</base-button>
            <base-button class="shadow-none" type="primary">Add</base-button>
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
         modal: false,
         isShowing:false,
         isShow: false,
         form : {
                id: '',
                subtask: '',
                developer: '',
                project: '',
                dueDate: '',
                taskDescription: ''
            },
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
  cursor:pointer;
}
</style>
