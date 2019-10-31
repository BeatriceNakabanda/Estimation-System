<template>
    <div>
        <base-header type="" class="pb-6 pb-8 pt-4" id="table-head">     
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                  <!-- table for displaying details of a single pending estimate -->
                    <pending-table title="Dashboard"></pending-table>
                </div>
            </div>
            
        </div>

    </div>
</template>
<script>
  import PendingTable from './Tables/PendingEstimateTable'
  export default {
    name: 'pending-estimate',
    components: {
      PendingTable
    }
  };
</script>
<style>
#table-head{
    background-color: #d10572; 
}
</style>
