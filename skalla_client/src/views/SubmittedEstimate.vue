<template>
    <div>
        <base-header type=""  id="table-head">     
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                  <!-- table for displaying details of a single pending estimate -->
                    <submitted-table ></submitted-table>
                </div>
            </div>
            
        </div>

    </div>
</template>
<script>
  import SubmittedTable from './Tables/SubmittedEstimateTable'
  export default {
    name: 'pending-estimate',
    components: {
      SubmittedTable
    }
  };
</script>
<style>
/* Desktops and laptops ----------- */
@media only screen  and (min-width : 1224px) {
/* Styles */
#table-head{
  min-height: 35vh;
}
}
#table-head{
    background-color: #d10572; 
    height: 35vh;
}
</style>
