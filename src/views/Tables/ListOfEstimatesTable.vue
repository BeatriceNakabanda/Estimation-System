<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row ">
        
        <div class="col text-right">
          <base-button type="primary" size="sm" class="spacing">Create Estimate</base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive table-hover">
      <base-table class="table table-flush "
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'" 
                  tbody-classes="list"
                  :data="tableData" id="left">
        <template slot="columns">
          <th>Title</th>
          <th>Developer</th>
          <th>Project</th>
          <th>Date Created</th>
          <th>Date Estimated</th>
          <th>Status</th>
          <th></th>
        </template>

        <template slot-scope="{row} " class="row" >
          
          <td>
            <div class="media" >
              
              <div class="media-body" >
                <span class="name mb-0 text-sm">{{row.title}}</span>
              </div>
            </div>
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
          <span class="fa fa-eye fa-1x"></span>
            <!-- <span class="act">
              <router-link  to="/" id="view">
                <i class="rounded-circle fa fa-eye fa-1x" aria-hidden="true"></i>
              </router-link>
            </span>
            <span class="act">
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
      <base-pagination total="30"></base-pagination>
    </div>

  </div>
</template>
<script>
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
  padding-left: 1rem;
  padding-right: 1rem;
}
/* Adjustments to font size of the table head content */
.table thead th {
  font-size: 0.68rem;
  font-weight: 700;
}

/* First column of table font adjustment */
.text-sm {
  font-weight: 400;
  font-size: 0.8125rem !important;  /*  13px font size*/
}
/* styling rounded border */
.rounded-circle {
  border: 1px solid rgb(201, 201, 199);
  padding: 6px;
  
}

/* .row > :hover { 
   cursor: progress;
} */
.table-hover>:hover span,
.table-hover>:hover {
  background-color: transparent;
}

.table-hover>.table>.row .glyphicon-hand-right {
  visibility: hidden
}

.table-hover>.table>.row :hover .glyphicon-hand-right {
  color: blue;
  visibility: visible
}
</style>
