<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row ">
        
        <div class="col text-right">
          <base-button type="primary" size="sm">Create Estimate</base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table class="table  table-flush "
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="tableData" id="left">
        <template slot="columns" >
          <th>Title</th>
          <th>Developer</th>
          <th>Project</th>
          <th>Date Created</th>
          <th>Date Estimated</th>
          <th>Status</th>
          <th>Action</th>
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
            title: 'Dashboard',
            developer: 'Benjamin',
            project: 'Refactory',
            dateCreated: '17-07-2018',
            dateEstimated: '18-07-2018',
            status: 'Estimated',
            action: '',
            statusType: 'success',
          },
          {
            
            title: 'SDK',
            developer: 'Sunday',
            project: 'Xente',
            dateCreated: '17-07-2018',
            dateEstimated: '',
            status: 'Created',
            action: '',
            statusType: 'warning',
           
          },
          {
            title: 'Registration',
            developer: 'Benjamin',
            project: 'Refactory',
            dateCreated: '17-07-2018',
            dateEstimated: '18-07-2018',
            status: 'Estimated',
            action: '',
            statusType: 'success',
          },
          {
            
            title: 'Onboarding',
            developer: 'Sunday',
            project: 'Xente',
            dateCreated: '17-07-2018',
            dateEstimated: '',
            status: 'Created',
            action: '',
            statusType: 'warning',
           
          },
          {
            
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
  color: #636162;
  padding-left: 10px;
}
#left{
  text-align: left;
}



</style>
