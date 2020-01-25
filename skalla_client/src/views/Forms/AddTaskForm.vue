<template>
        <form role="form ">  
         <div class="row mt--4">
           <div class="col-sm-3"></div>
            <div class="col-sm-2">
              <h6 class="heading-small text-capitalize float-left  text-resize">Sum hours: </h6>
            </div>
            <div class="col-sm-2 ml-2">
              <h6 class="heading-small  text-capitalize float-left  text-resize">0.00 hrs</h6>
            </div> 
            <div class="col-sm-3 ">
              <h6 class="heading-small text-capitalize float-left  text-resize ">Adjusted Sum:</h6>
            </div>
            <div class="col-sm-1 ml--3">
              <h6 class="heading-small  text-capitalize float-left  text-resize">0.00 hrs</h6>
            </div>
          </div>
          <div class="row ">
            <div class="col-sm-3 ">
              <h6 class="text-resize heading-small text-muted float-left text-capitalize">Task</h6>
            </div>
              <div class="col-sm">
                  <base-input alternative
                          class=""
                          placeholder="Add sub task here..."
                          v-model="form.task"
                          >
                </base-input>
              </div>  
          </div>
          <div class="row mt--2">
            <div class="col-sm-3">
              <h6 class="heading-small text-muted  float-left text-capitalize text-resize">Research</h6>
            </div>
            <div class="col-sm-3">  
              <base-input alternative
                      class=""
                      placeholder="0.00hrs"
                      v-model="form.research"
                      >
            </base-input>
            </div>
            <div class="col-sm-3">
              <h6 class="heading-small text-muted  float-left text-capitalize text-resize">Planning</h6>
            </div>
            <div class="col-sm-3">  
              <base-input alternative
                      class=""
                      placeholder="0.00hrs"
                      v-model="form.planning"
                      >
            </base-input>
            </div>
          </div>
                    <div class="row mt--2">
            <div class="col-sm-3">
              <h6 class="heading-small text-muted  float-left text-capitalize text-resize">Development</h6>
            </div>
            <div class="col-sm-3">  
              <base-input alternative
                      class=""
                      placeholder="0.00hrs"
                      v-model="form.development"
                      >
            </base-input>
            </div>
            <div class="col-sm-3">
              <h6 class="heading-small text-muted  float-left text-capitalize text-resize">Testing</h6>
            </div>
            <div class="col-sm-3">  
              <base-input alternative
                      class=""
                      placeholder="0.00hrs"
                      v-model="form.testing"
                      >
            </base-input>
            </div>
          </div>
            <div class="row mt--2">
            <div class="col-sm-3">
              <h6 class="heading-small text-muted  float-left text-capitalize text-resize">Stabilization</h6>
              <i class="fas fa-info-circle ml-2 mt-2  btn-tooltip" id="myicon" v-b-tooltip.hover.right title="Stabilization ...."></i>
            </div>
            <div class="col-sm-3">  
              <base-input alternative
                      class=""
                      placeholder="0.00hrs"
                      v-model="form.stabilization"
                      >
            </base-input>
            </div>
            <div class="col-sm-3">
              <h6 class="heading-small text-muted  float-left text-capitalize text-resize">Certainty</h6>
              <i class="fas fa-info-circle  mr-2 mt-2 " id="myicon"></i>
            </div>
            <div class="col-sm-3">  
              <base-input alternative
                      class=""
                      placeholder="0.00hrs"
                      v-model="form.certainty"
                      >
            </base-input>
            </div>
          </div>
      
 
          <div class="row mt--2">
            <div class="col-sm-3">
              <h6 class="heading-small text-muted float-left text-capitalize text-resize">Comment</h6>
            </div>
            <div class="col-sm">
              <base-input alternative="">
                  <textarea rows="3" v-model="form.taskDescription" class="form-control form-control-alternative" placeholder="Add comment here ..."></textarea>
              </base-input>
            </div>
          </div>
        </form>
</template>
<script>
export default {
    name: 'add-task-form',
    data(){
        return{
            form : {
                    task: '',
                    research: '',
                    planning: '',
                    development: '',
                    testing: '',
                    stabilization: '',
                    certainty: '',
                    taskDescription: '',
                },
        }       
    },
}
</script>
<style>
#myicon{
  color: #5e72e4;
  
}
#myicon:hover {
  cursor:pointer;
  color: #d10572;
}
#myicon:hover, #myiconactive {font-size: 120%;}
</style>