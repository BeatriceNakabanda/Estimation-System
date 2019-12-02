<template>
  <div>
    <base-header type="" id="table-head"> </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <!-- <estimates-table title="Light Table" :estimates="estimates" @edit:estimate="editEstimate"></estimates-table>                     -->
          <estimates-table :estimates="estimates"></estimates-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EstimatesTable from "./Tables/ListOfEstimatesTable";
import axios from "axios";

  export default {
    name: 'estimates',
    components: {
      EstimatesTable
    },
    data(){
      return{
         estimates: [],

        
      }
    },
    //fetches estimates when the component is created
    async created(){
      try {
        const res = await axios.get(`http://localhost:8081/estimates`)

        this.estimates = res.data;
      } catch(e){
        console.error(e)
      }
    },


      
    
  }
  
</script>
<style>
#table-head {
  background-color: #d10572;
  height: 35vh;
}
</style>
