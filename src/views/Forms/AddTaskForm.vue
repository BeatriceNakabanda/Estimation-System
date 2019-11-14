<template>
        <form role="form ">  
          <div class="row mt--4">
            <div class="col-sm-3 ">
              <h6 class="text-resize heading-small text-muted float-left text-capitalize">Task</h6>
            </div>
              <div class="col-sm">
                  <base-input alternative
                          class=""
                          placeholder="Add sub task here..."
                          v-model="form.subtask"
                          >
                </base-input>
              </div>
              
          </div>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="heading-small text-muted  float-left text-capitalize text-resize">Research</h6>
            </div>
            <div class="col-sm">
              <base-input alternative
                      class=""
                      placeholder="0.00hrs"
                      v-model="form.research"
                      >
            </base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="heading-small text-muted float-left text-capitalize text-resize">Planning</h6>
            </div>
            <div class="col-sm">
              <base-input alternative
                      class=""
                      placeholder="0.00hrs"
                      v-model="form.planning"
                      >
            </base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="heading-small text-muted  float-left text-capitalize text-resize">Development</h6>
            </div>
            <div class="col-sm-9">
              <base-input 
                          alternative
                          class=""
                          placeholder="0.00hrs"
                          v-model="form.development"
              >
                  
              </base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="heading-small text-muted float-left text-capitalize text-resize">Testing</h6>
            </div>
            <div class="col-sm-9">
              <base-input 
                          alternative
                          class=""
                          placeholder="0.00hrs"
                          v-model="form.testing"
              >
                  
              </base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="heading-small text-muted  float-left text-capitalize text-resize">Stabilization </h6>
            </div>
            <div class="col-sm-9">
              <base-input 
                          alternative
                          class=""
                          placeholder="0.00hrs"
                          v-model="form.stabilization"
              >
              </base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="heading-small text-muted float-left text-capitalize text-resize">Certainty</h6>
            </div>
            <div class="col-sm">
              <base-input 
                          alternative
                          class=""
                          placeholder="%"
                          v-model="form.certainty"
              >
              <select class="custom-select" id="inputGroupSelect01">
                        <option selected>%</option>
                        <option value="1">5%</option>
                        <option value="2">10%</option>
                        <option value="3">15%</option>
                        <option value="4">20%</option>
                      </select>
              </base-input>
            </div>  
          </div>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="heading-small text-muted float-left text-capitalize text-resize">Comment</h6>
            </div>
            <div class="col-sm">
              <base-input alternative="">
                  <textarea rows="3" v-model="form.taskDescription" class="form-control form-control-alternative" placeholder="Add main task description here ..."></textarea>
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
                    id: '',
                    subtask: '',
                    developer: '',
                    project: '',
                    dueDate: '',
                    taskDescription: ''
                }, 
        }       
    }
}
</script>