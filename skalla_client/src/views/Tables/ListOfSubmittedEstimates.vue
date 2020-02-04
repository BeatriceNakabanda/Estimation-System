<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">

    </div>

    <div class="table-responsive table-hover">
      <base-table class="table table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'" 
                  tbody-classes="list"
                  :data="submittedEstimate" id="left">
        <template  slot="columns">
          <th class="bgcolor">Title</th>
          <th class="bgcolor">Project</th>
          <th class="bgcolor">Project Manager</th>
          <th class="bgcolor">Date Created</th>
          <th class="bgcolor">Action</th>
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
          <td class="project">
            {{row.project.name}}
          </td>
          <td class="project-manager">
            {{row.projectManager.name}}
          </td> 
          <td class="date-created">
            {{formatDateCreated(row.dateCreated)}}
          </td>
          
          <td >
            <span class="action-icons">
              <router-link :to="`/view-submitted-estimate/${row._id}`" id="view">
                <i class="rounded-circle fa fa-eye fa-1x" id="my-icons" aria-hidden="true"></i>
              </router-link>
            </span>
            <!-- <span class="action-icons">
              <router-link  to="/" id="view">
                <i class="rounded-circle fas fa-pen" aria-hidden="true"></i>
              </router-link>
            </span> -->
            
          </td>
          </template>

      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination></base-pagination>
    </div>

  </div>
</template>
<script>
import axios from "axios";
import { format } from 'date-fns' 
  export default {
    name: 'drafts-estimates-table',
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
        submittedEstimate:[]
      }
    },
    methods: {
      formatDateCreated: function(dateCreated){
        return format(new Date(dateCreated), 'dd-MM-yyy')
    },
    },
    async created() {
      try {
      // Getting the id of the loggedInDeveloper and showing submitted estimates specific to them
      const loggedInDeveloper= this.$store.getters.getUser.id;
      const res = await axios.get( `http://localhost:8081/api/request-estimated/` + loggedInDeveloper );
      this.submittedEstimate = res.data;

      console.log(this.submittedEstimate);
    } catch (e) {
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
base-button{
  border-radius: 4px;
}
#my-icons {
  background-color: #5e72e4;
  color: #eee7eb;
  border-color: #5e72e4;
}
#my-icons:hover {
  background-color: #d10572;
  color: #eee7eb;
  border-color: #d10572
}

/* Desktops and laptops ----------- */
@media only screen  and (min-width : 1224px) {
.card{
  margin-top: 30px;
}
}
</style>
