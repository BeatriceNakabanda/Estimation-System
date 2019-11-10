<template>
    <div>
        <base-header type="" class="pb-6 pb-8 pt-4 " id="table-head">
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <estimates-table title="Light Table" :estimates="estimates" @edit:estimate="editEstimate"></estimates-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import EstimatesTable from './Tables/ListOfEstimatesTable'
  export default {
    name: 'estimates',
    components: {
      EstimatesTable
    },
    data(){
      return{
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
            title: 'Dashboard',
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
        ],
        methods: {
          // creating an edit estimate method
          editEstimate(id, updatedEstimate){
            this.estimates = this.estimates.map(estimate => employee.id === id ? updatedEstimate : estimate)
          }
        }
      }
    }
  }
</script>
<style>
#table-head{
    background-color: #d10572;
}
/* Desktops and laptops ----------- */
@media only screen  and (min-width : 1224px) {
/* Styles */
#table-head{
  /* padding-bottom: 20px; */
  min-height: 35vh;
}
}
</style>
