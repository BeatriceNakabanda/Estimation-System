<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row ">
        <div class="col text-right">
          <base-button type="primary" size="sm" class="shadow-none spacing btn-lg">Create Estimate</base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive table-hover">
      <base-table class="table table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'" 
                  tbody-classes="list"
                  :data="tableData" id="left">
        <template  slot="columns"  >
          <th class="bgcolor">Title</th>
          <th class="bgcolor">Developer</th>
          <th class="bgcolor">Project</th>
          <th class="bgcolor">Date Created</th>
          <th class="bgcolor">Date Estimated</th>
          <th class="bgcolor">Status</th>
          <th class="bgcolor"></th>
        </template>
          <template class="table-row" slot-scope="{row} ">
          <!-- <td>
            <div class="media" >
              
              <div class="media-body" >
                <span class="name mb-0 text-sm">{{row.title}}</span>
              </div>
            </div>
          </td> -->
          <td class="title">
            {{row.title}}
          </td>
          
          <td class="developer">
            {{row.developer}}
          </td>
          <td class="project">
            {{row.project}}
          </td>
          <td class="dateCreated">
            {{row.dateCreated}}
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
              <router-link  to="/" id="view">
                <i class="rounded-circle fa fa-eye fa-1x" aria-hidden="true"></i>
              </router-link>
            </span>
            <span class="action-icons">
              <router-link  to="/" id="view" >
                <i class="rounded-circle fas fa-pen" aria-hidden="true" @click="modal = true"></i>
                  <modal :show.sync="modal">
                      <template slot="header">
                          <h5 class="modal-title" id="exampleModalLabel">Edit</h5>
                      </template>
                      <div>
                        <form role="form">
                          <div class="row">
                            <div class="col-sm-3">
                              <h6 class="heading-small text-muted mb-4">Title</h6>
                            </div>
                            <div class="col-sm">
                              <base-input alternative
                                      class="mb-3"
                                      placeholder="Edit title here..."
                                      v-model="form.title"
                                      >
                            </base-input>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-sm-3">
                              <h6 class="heading-small text-muted mb-4">Developer</h6>
                            </div>
                            <div class="col-sm">
                              <base-input alternative
                                      class="mb-3"
                                      placeholder="Edit developer here..."
                                      v-model="form.developer"
                                      >
                                      <select class="custom-select" id="inputGroupSelect01">
                                        <option selected>Choose developer...</option>
                                        <option value="1">Benjamin</option>
                                        <option value="2">Beatrice</option>
                                        <option value="3">Olive</option>
                                        <option value="4">Ronnie</option>
                                      </select>
                            </base-input>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-sm-3">
                              <h6 class="heading-small text-muted mb-4">Project</h6>
                            </div>
                            <div class="col-sm">
                              <base-input alternative
                                      class="mb-3"
                                      placeholder="Add project here..."
                                      v-model="form.project"
                                      >
                                      <select class="custom-select" id="inputGroupSelect01">
                                        <option selected>Select project...</option>
                                        <option value="1">Refactory</option>
                                        <option value="2">Xente</option>
                                        <option value="3">Imuka</option>
                                        <option value="4">Stanbic</option>
                                      </select>
                            </base-input>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-sm-3">
                              <h6 class="heading-small text-muted mb-4">Due Date</h6>
                            </div>
                            <div class="col-sm">
                              <base-input addon-left-icon="ni ni-calendar-grid-58">
                                  <flat-picker slot-scope="{focus, blur}"
                                              @on-open="focus"
                                              @on-close="blur"
                                              :config="{allowInput: true}"
                                              class="form-control datepicker"
                                              
                                              v-model="form.dueDate">
                                  </flat-picker>
                              </base-input>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-sm-3">
                              <h6 class="heading-small text-muted mb-4">Main <br>Task <br>Description :</h6>
                            </div>
                            <div class="col-sm">
                              <base-input alternative="">
                                  <textarea rows="4" v-model="form.taskDescription" class="form-control form-control-alternative" placeholder="Add main task description here ..."></textarea>
                              </base-input>
                            </div>
                          </div>
                        </form>
                      </div>
                      <template slot="footer">
                          <base-button class="shadow-none cancel-color" type="secondary" @click="modal = false">Cancel</base-button>
                          <base-button class="shadow-none" type="primary">Save</base-button>
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
      <base-pagination total="30"></base-pagination>
    </div>

  </div>
</template>
<script>
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css"

  export default {
    components: {flatPicker},
    name: 'estimates-table',
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
        modal : false,
        form : {
                id: '',
                title: '',
                developer: '',
                project: '',
                dueDate: '2018-07-17',
                taskDescription: ''
            },
        tableData: [
          {
            id: 1,
            title: 'Dashboard',
            developer: 'Benjamin',
            project: 'Refactory',
            dateCreated: '17-07-2018',
            dateEstimated: '18-07-2018',
            status: 'Estimated',
            statusType: 'success',
          },
          {
            id: 2,
            title: 'SDK',
            developer: 'Beatrice',
            project: 'Xente',
            dateCreated: '17-07-2018',
            dateEstimated: '',
            status: 'Draft',
            statusType: 'warning',

          },
          {
            id: 3,
            title: 'Registration',
            developer: 'Ronnie',
            project: 'Refactory',
            dateCreated: '17-07-2018',
            dateEstimated: '18-07-2018',
            status: 'Estimated',
            action: '',
            statusType: 'success',
          },
          {
            id: 4,
            title: 'Onboarding',
            developer: 'Olive',
            project: 'Xente',
            dateCreated: '17-07-2018',
            dateEstimated: '',
            status: 'Draft',
            action: '',
            statusType: 'warning',
           
          },
          {
            id: 5,
            title: 'Login',
            developer: 'Sunday',
            project: 'Xente',
            dateCreated: '17-07-2018',
            dateEstimated: '',
            status: 'Submitted',
            action: '',
            statusType: 'info',
           
          },
        ]
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
span .status{
  font-size: 13px; 
}

.bgcolor {  
  background: #e7eaec !important;
}
/* displaying action icons on hover */
table > tbody > tr .action-icons{
  visibility: hidden;
} 
table > tbody > tr:hover .action-icons{
  visibility: visible;
} 
base-button{
  border-radius: 4px;
  border: 1px solid;
}

/* cancel button text color */
.cancel-color{
  color: rgb(135, 141, 148);
  background-color: #e2e0e1;
}


  
</style>
