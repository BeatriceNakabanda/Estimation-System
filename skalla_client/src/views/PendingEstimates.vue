<template>
    <div>
        <base-header type=""  id="table-head">
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <estimates-table title="Light Table"></estimates-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import EstimatesTable from './Tables/ListOfPendingEstimates'
  export default {
    name: 'pending',
    components: {
      EstimatesTable
    }
  };
</script>
<style>
#table-head{
    background-color: #d10572;
    height: 35vh;
}
</style>