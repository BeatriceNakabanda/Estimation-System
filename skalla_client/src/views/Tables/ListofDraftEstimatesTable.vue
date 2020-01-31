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
                  :data="tableData" id="left">
        <template  slot="columns"  >
          <th class="bgcolor">Title</th>
          <th class="bgcolor">Project</th>
          <th class="bgcolor">Project Manager</th>
          <th class="bgcolor">Date Created</th>
          <th class="bgcolor"></th>
          <!-- <th class="bgcolor">Action</th> -->
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
            {{row.project}}
          </td>
          <td class="project-manager">
            {{row.projectManager}}
          </td>
          <td class="project-created">
            {{row.dateCreated}}
          </td>
         
          <td >
            <!-- <span class="action-icons">
              <router-link  to="#" id="view">
                <i class="rounded-circle fa fa-eye fa-1x" id="my-icons" aria-hidden="true"></i>
              </router-link>
            </span> -->
            <span class="action-icons">
              <router-link  :to="`/view-pending-estimate/${row._id}`" id="view">
                <i class="rounded-circle fas fa-pen" aria-hidden="true" id="my-icons"></i>
                
              </router-link>
            </span>
            
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
        draftEstimates: Array,
        tableData: [
          {
            id: 1,
            dateCreated: '17-07-2018',
            title: 'Dashboard',
            project: 'Refactory',
            projectManager: 'David Pereira',
          },
          {
            id: 2,
            dateCreated: '20-09-2018',
            title: 'login',
            project: 'Xente',
            projectManager: 'David Pereira',
           
          },
          {
           id: 3,
            dateCreated: '31-02-2019',
            title: 'Navbar',
            project: 'Refactory',
            projectManager: 'David Pereira',
          },
          {
            id: 4,
            dateCreated: '17-07-2018',
            title: 'Dashboard',
            project: 'Xente',
            projectManager: 'Cindy',
           
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
/* .rounded-circle {
  border: 1px solid rgb(201, 201, 199);
  padding: 6px;
  
} */

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
/* .table{
  width: 100%; 
}
.card{
  width: 79vw;
} */
base-button{
  border-radius: 4px;
  
}
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

/* Desktops and laptops ----------- */
@media only screen  and (min-width : 1224px) {
.card{
  margin-top: 30px;
}
}
</style>
