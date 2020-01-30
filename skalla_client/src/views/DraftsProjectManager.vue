<template>
    <div>
        <base-header type="" class="pb-6 pb-8 pt-4 " id="table-head">
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <EstimatesTable :estimates="estimates" title="Light Table" />
                   
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import EstimatesTable from './Tables/ListOfDraftEstimateRequestsTable'
  import axios from "axios";
  import router from "../router"


  export default {
    name: 'estimates',
    components: {
      EstimatesTable,
    },
    data(){
      return {
        estimates: [],
      }
    },
    //fetches draftEstimateRequests when the component is created
    async created(){
      if (!this.$store.getters.isLoggedIn) {
      router.push('/')
    }
      try {
        const loggedInProjectManager = this.$store.getters.getUser.id 
        const res = await axios.get(`http://localhost:8081/api/draft-estimate-requests/` + loggedInProjectManager)

        this.estimates = res.data;
      } catch(e){
        console.error(e)
      }
    },
  };
</script>
<style>
#table-head{
    background-color: #d10572;
}
</style>
