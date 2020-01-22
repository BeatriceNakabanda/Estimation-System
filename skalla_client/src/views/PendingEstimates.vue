<template>
    <div>
        <base-header type=""  id="table-head">
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <PendingEstimatesTable :estimates="estimates" title="Light Table" />
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
         estimates: [],
      }
    },
    //fetches pending estimates when the component is created
    async created(){
      if (!this.$store.getters.isLoggedIn) {
      router.push('/')
    }
      try {
        // Getting the id of the loggedInDeveloper and showing pending estimates specific to them
        const loggedInDeveloper = this.$store.getters.getUser.id
        const res = await axios.get(`http://localhost:8081/api/pending-estimates/` + loggedInDeveloper)
        this.estimates = res.data;
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