<template>
   <div>
        <base-header type="" class="pb-6 pb-8 pt-4 " id="table-head">
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
  import ProjectsTable from './Tables/ProjectsTable'
  export default {
    name: 'projects',
    components: {
      ProjectsTable
    }
  }
</script>
<style>
#table-head{
    background-color: #d10572;
    height: 35vh;
}
/* Desktops and laptops ----------- */
@media only screen  and (min-width : 1224px) {
/* Styles */
#table-head{
  /* padding-bottom: 20px; */
  min-height: 35vh;
}
}
</style>



