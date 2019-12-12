<template>
    <div>
        <base-header type="" class="pb-6 pb-8 pt-4 " id="table-head">
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
  import EstimatesTable from './Tables/ListOfSubmittedEstimates'
  export default {
    name: 'estimates',
    components: {
      EstimatesTable
    }
  };
</script>
<style>
#table-head{
    background-color: #d10572;
}
</style>
