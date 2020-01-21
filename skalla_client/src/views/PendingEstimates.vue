<template>
    <div>
        <base-header type=""  id="table-head">
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <PendingEstimatesTable :pendingEstimates="pendingEstimates" title="Light Table" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>

  import PendingEstimatesTable from './Tables/ListOfPendingEstimates'
  import axios from "axios";
  import router from "../router"

  export default {
    name: 'pending',
    components: {
      PendingEstimatesTable
    },
    data(){
      return{
         pendingEstimates: [],
      }
    },
    //fetches pending estimates when the component is created
    async created(){
      if (!this.$store.getters.isLoggedIn) {
      router.push('/')
    }
      try {
        const res = await axios.get(`http://localhost:8081/api/pending-estimates`)

        this.pendingEstimates = res.data;
      } catch(e){
        // console.error(e)
      }
    }
  };
</script>
<style>
#table-head{
    background-color: #d10572;
    height: 35vh;
}
</style>