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
      <base-table class="table  table-flush "
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

        <template slot-scope="{row}">
          
          <th scope="row">
            <div class="media">
              
              <div class="media-body" >
                <span class="name mb-0 text-sm">{{row.title}}</span>
              </div>
            </div>
          </th>
          
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
         
          <td class="action">
            <router-link  to="/" id="view">
              <i class="fa fa-eye fa-2x" aria-hidden="true"></i>
            </router-link>
            
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
  padding-left: 16px;
  padding-right: 16px;
}
/* Adjustments to font size of the table head content */
.table thead th {
  font-size: 12px;
  font-weight: 700;
}

/* First column of table font adjustment */
.text-sm {
  font-weight: 400;
  font-size: 13px !important;
}

/* Status column font size adjustment */
span .status{
  font-size: 13px; 
}

.bgcolor {  
  background: #e7eaec !important;
}


</style>
