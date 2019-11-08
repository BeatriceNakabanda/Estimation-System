<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row ">
        <div class="col text-right">
          <base-button type="primary" id="create-estimate" size="md" class="shadow-none spacing btn-md" @click="modal1 = true">Create Estimate</base-button>
          <modal :show.sync="modal1">
                      <template slot="header">
                          <h3 class="modal-title " id="exampleModalLabel">Create Estimate</h3>
                      </template>
                      <!-- create estimate form -->
                      <CreateEstimateForm @add:estimate="addEstimate" />
                  </modal>
        </div>
      </div>
    </div>

    <div class="table-responsive table-hover">
      <base-table class="table table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'" 
                  tbody-classes="list"
                  :data="estimates" id="left">
        <template  slot="columns"  >
          <th class="bgcolor">Title</th>
          <th class="bgcolor">Project</th>
          <th class="bgcolor">Developer</th>
          <th class="bgcolor">Date Created</th>
          <th class="bgcolor">Date Estimated</th>
          <th class="bgcolor">Status</th>
          <th class="bgcolor"></th>
        </template>
          <template class="table-row" slot-scope="{row} ">
          <td class="title">
            {{row.title}}
          </td>
          <td class="project">
            {{row.project}}
          </td>
          <td class="developer">
            {{row.developer}}
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
                <i class="rounded-circle fa fa-eye fa-1x" aria-hidden="true" @click="modal2 = true"></i>
                <modal :show.sync="modal2">
                  <template slot="header">
                          <h3 class="modal-title " id="exampleModalLabel"> Estimate</h3>
                      </template>
                </modal>
              </router-link>
            </span>
            <span class="action-icons">
              <router-link  to="/" id="view" >
                <i class="rounded-circle fas fa-pen" aria-hidden="true" @click="modal = true"></i>
                <modal :show.sync="modal">
                    <template slot="header">
                        <h3 class="modal-title " id="exampleModalLabel">Edit Estimate</h3>
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
                                    v-model="estimates.title"
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
                                    v-model="estimates.developer"
                                    >
                                    <select class="custom-select" id="inputGroupSelect01">
                                      <option selected>Choose developer...</option>
                                      <option value="1">Beatrice</option>
                                      <option value="2">Benjamin</option>
                                      <option value="3">Ronnie</option>
                                      <option value="4">Olive</option>
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
                                    v-model="estimates.project"
                                    >
                                    <select class="custom-select" id="inputGroupSelect01">
                                      <option selected>Select project...</option>
                                      <option value="1">Refactory</option>
                                      <option value="2">Xente</option>
                                      <option value="3">Imuka</option>
                                      <option value="4">Stanbic</option>
                                      <option value="5">Emata</option>
                                    </select>
                          </base-input>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="heading-small text-muted mb-4">Due Date</h6>
                          </div>
                          <div class="col-sm">
                            <base-input addon-left-icon="ni ni-calendar-grid-58"
                                        alternative
                                        class="mb-3"
                                        placeholder="17-07-2019"
                                        v-model="estimates.dueDate"
                            >
                                
                            </base-input>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="heading-small text-muted mb-4">Main Task Description</h6>
                          </div>
                          <div class="col-sm-12">
                            <base-input alternative="">
                                <textarea rows="4" v-model="estimates.taskDescription" class="form-control form-control-alternative" placeholder="Add main task description here ..."></textarea>
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
      <!-- <base-pagination total="30"></base-pagination> -->
      <base-pagination></base-pagination>

    </div>
    
  </div>
</template>
<script>
import CreateEstimateForm from '../Forms/CreateEstimateForm'
  export default {
    name: 'estimates-table',
    components: {
      CreateEstimateForm,
    },
    props: {
      // estimates: Array,
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
        modal : false,
        modal1: false,
        modal2: false,
        estimates: [
          {
            id: 1,
            title: 'Dashboard',
            project: 'Refactory',
            developer: 'Benjamin',
            // dateCreated: '17-07-2018',
            // dateEstimated: '18-07-2018',
            status: 'Estimated',
            statusType: 'success',
            dueDate: '',
            taskDescription: '',
          },
          {
            id: 2,
            title: 'SDK',
            project: 'Xente',
            developer: 'Beatrice',
            // dateCreated: '17-07-2018',
            // dateEstimated: '',
            status: 'Draft',
            statusType: 'warning',
            dueDate: '',
            taskDescription: '',

          },
          {
            id: 3,
            title: 'Registration',
            project: 'Refactory',
            developer: 'Ronnie',
            // dateCreated: '17-07-2018',
            // dateEstimated: '18-07-2018',
            status: 'Estimated',
            statusType: 'success',
            dueDate: '',
            taskDescription: '',
          },
          {
            id: 4,
            title: 'Onboarding',
            project: 'Xente',
            developer: 'Olive',
            // dateCreated: '17-07-2018',
            // dateEstimated: '',
            status: 'Draft',
            statusType: 'warning',
            dueDate: '',
            taskDescription: '',  
          },
          {
            id: 5,
            title: 'Login',
            project: 'Xente',
            developer: 'Sunday',
            // dateCreated: '17-07-2018',
            // dateEstimated: '',
            status: 'Submitted',
            statusType: 'info',
            dueDate: '',
            taskDescription: '',
          },
        ]
      }
    },
  methods: {
    addEstimate(estimate){
        const lastId =
          this.estimates.length > 0
            ? this.estimates[this.estimates.length - 1].id
            : 0;
        const id = lastId + 1;
        const newEstimate = { ...estimate, id };
      this.estimates = [...this.estimates, newEstimate];
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
/* styling buttons */
#create-estimate{
  border-radius: 4px; 
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

/* Desktops and laptops ----------- */
@media only screen  and (min-width : 1224px) {
.card{
  margin-top: 30px;
}
}


</style>
