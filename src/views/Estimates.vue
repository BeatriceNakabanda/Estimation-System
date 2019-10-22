<template>
    <div>
        <base-header type="" class="pb-6 pb-8 pt-5 pt-md-8" id="table-head">
            <!-- Card stats -->
           
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <projects-table title="Light Table"></projects-table>
                </div>
            </div>
            
        </div>

    </div>
</template>
<script>
  import ProjectsTable from './Tables/EstimatesTable'
  export default {
    name: 'estimates',
    components: {
      ProjectsTable
    }
  };
</script>
<style>
#table-head{
    background-color: #d10572;
  
    
}
</style>
