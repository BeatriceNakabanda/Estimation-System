<template>
    <div>
        <base-header type="" class="pb-6 pb-8 pt-4 " id="table-head">
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <!-- <estimates-table title="Light Table" :estimates="estimates" @edit:estimate="editEstimate"></estimates-table>                     -->
                    <estimates-table title="Light Table" :estimates="estimates"></estimates-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import EstimatesTable from './Tables/ListOfEstimatesTable'
  import axios from 'axios'
  export default {
    name: 'estimates',
    components: {
      EstimatesTable
    },
    data(){
      return{
         estimates: [ ],
        //  async created(){
        //    try{
        //      const res = await axios.get(``)
        //    }
        //  },
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
