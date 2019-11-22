<template>
    <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row ">
        <div class="col text-right">
          <base-button type="primary" id="create-estimate" size="md" class="shadow-none spacing btn-md" @click="modal1 = true">Add Project</base-button>
          <modal :show.sync="modal1">
                      <template slot="header">
                          <h3 class="modal-title " id="exampleModalLabel">Add New Project</h3>
                      </template>
                      <!-- Add project form -->
                      <div>
                         <AddProjectForm  />
                      </div>
                  </modal>
        </div>
      </div>
    </div>

    <div class="table-responsive table-hover">
      <base-table class="table table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'" 
                  tbody-classes="list"
                  :data="projects" id="left">
        <template  slot="columns"  >
          <th class="bgcolor">No</th>
          <th class="bgcolor">Project</th>
          <th class="bgcolor"></th>
          <th class="bgcolor"></th>
          <th class="bgcolor"></th>
          <th class="bgcolor"></th>
          <th class="bgcolor"></th>
        </template>
          <template class="table-row" slot-scope="{row} ">
          <td>
            <div class="media" > 
              <div class="media-body" >
                <span class="name mb-0 text-sm">{{row.id}}</span>
              </div>
            </div>
          </td>
          <td class="project">
            {{row.name}}
          </td>
          <td>       
          </td>
          <td>
          </td>
          <td>
          </td>
          <td> 
          </td>
          <td>
            <badge class="badge-dot mr-4" :type="row.statusType">
              <i :class="`bg-${row.statusType}`"></i>
              <span class="status">{{row.status}}</span>
            </badge>
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
import AddProjectForm from '../Forms/AddProjectForm'
import axios from 'axios';

export default {
    name: 'projects-table',
    components: {
      AddProjectForm,
    },
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
        modal1: false,
        projects: [],
        form : {
                project: '',
            },

      }
    },
    async created(){
      try{
        const res = await axios.get(`http://localhost:8081/projects`)

        this.projects = res.data;
      }catch(e){
        console.error(e)
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