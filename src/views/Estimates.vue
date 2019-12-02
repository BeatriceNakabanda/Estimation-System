<template>
<<<<<<< HEAD
    <div>
        <base-header type=""  id="table-head">
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <!-- <estimates-table title="Light Table" :estimates="estimates" @edit:estimate="editEstimate"></estimates-table>                     -->
                    <estimates-table  :estimates="estimates"></estimates-table>
                </div>
            </div>  
        </div>
=======
  <div>
    <base-header type="" id="table-head"> </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <!-- <estimates-table title="Light Table" :estimates="estimates" @edit:estimate="editEstimate"></estimates-table>                     -->
          <estimates-table :estimates="estimates"></estimates-table>
        </div>
      </div>
>>>>>>> 5130b298bb49fb6cd0ce6be654434809533f7458
    </div>
  </div>
</template>
<script>
<<<<<<< HEAD
<<<<<<< HEAD
  import EstimatesTable from './Tables/ListOfEstimatesTable'
  import axios from 'axios'
=======
import EstimatesTable from "./Tables/ListOfEstimatesTable";
import axios from "axios";
>>>>>>> 5130b298bb49fb6cd0ce6be654434809533f7458

  export default {
    name: 'estimates',
    components: {
      EstimatesTable
    },
    data(){
      return{
<<<<<<< HEAD
         estimates: [], 
        
        methods: {
          // creating an edit estimate method
          // editEstimate(id, updatedEstimate){
          //   this.estimates = this.estimates.map(estimate => employee.id === id ? updatedEstimate : estimate)
          // }
        }
=======
         estimates: [],

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        
>>>>>>> 5130b298bb49fb6cd0ce6be654434809533f7458
=======
=======
>>>>>>> parent of de4ab64... adding changes
=======
>>>>>>> parent of de4ab64... adding changes
        methods: {
          // creating an edit estimate method
          // editEstimate(id, updatedEstimate){
          //   this.estimates = this.estimates.map(estimate => employee.id === id ? updatedEstimate : estimate)
          // }
        }
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> parent of de4ab64... adding changes
=======
>>>>>>> parent of de4ab64... adding changes
=======
>>>>>>> parent of de4ab64... adding changes
      }
    },
    //fetches estimates when the component is created
    async created(){
      try {
        const res = await axios.get(`http://localhost:8081/estimates`)

<<<<<<< HEAD
        this.estimates = res.data; 
=======
        this.estimates = res.data;
>>>>>>> 5130b298bb49fb6cd0ce6be654434809533f7458
      } catch(e){
        console.error(e)
      }
    },
<<<<<<< HEAD
  

  }
</script>
<style>
#table-head{
    background-color: #d10572;
    height: 35vh;
=======

=======
  import EstimatesTable from './Tables/ListOfEstimatesTable'
  import axios from 'axios'

  export default {
    name: 'estimates',
    components: {
      EstimatesTable
    },
    data(){
      return{
         estimates: [], 
        methods: {
          // creating an edit estimate method
          // editEstimate(id, updatedEstimate){
          //   this.estimates = this.estimates.map(estimate => employee.id === id ? updatedEstimate : estimate)
          // }
        }
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
  
>>>>>>> parent of 1beb491... adding edit code

  }
</script>
<style>
<<<<<<< HEAD
#table-head {
  background-color: #d10572;
  height: 35vh;
>>>>>>> 5130b298bb49fb6cd0ce6be654434809533f7458
=======
#table-head{
    background-color: #d10572;
    height: 35vh;
>>>>>>> parent of 1beb491... adding edit code
}

</style>
