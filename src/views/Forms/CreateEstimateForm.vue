<template>
    <form method="POST" role="form">
        <div>
            <div class="row">
            <div class="col-sm-3">
                <h6 class="heading-small text-muted mb-4 float-left">Title</h6>
            </div>
            <div class="col-sm">
                <base-input alternative
                        class="mb-3"
                        placeholder="Edit title here..."
                        v-model="estimate.title"
                        >
            </base-input>
            </div>
            </div>
            <div class="row">
            <div class="col-sm-3">
                <h6 class="heading-small text-muted mb-4 float-left">Project</h6>
            </div>
            <div class="col-sm">
                <base-input alternative
                        class="mb-3"
                        placeholder="Edit  project here..." 
                       >
                        <select class="custom-select" id="inputGroupSelect01" v-model="selected"         >
                        <!-- <option v-for="estimate in estimates" v-bind:key="estimate.id">
                            {{ estimate.project }}
                        </option> -->
                        <option :value="null">Please select a project</option>
                        <option v-for="project in projects" v-bind:key="project.id">{{project.name}}</option>
                        <!-- <option value="Xente">Xente</option>
                        <option value="Imuka">Imuka</option>
                        <option value="Stanbic">Stanbic</option> -->
                        </select>
                        <p>{{selected}}</p>
            </base-input>
   
            </div>
            </div>
            <div class="row">
            <div class="col-sm-3">
                <h6 class="heading-small text-muted mb-4 float-left">Assign to</h6>
            </div>
            <div class="col-sm">
                <base-input alternative
                        class="mb-3"
                        placeholder="Add developer here..."
                        v-model="estimate.developer">
                        <select class="custom-select" id="inputGroupSelect01">
                            <option :value="null">Please select a developer</option>
                            <option v-for="developer in developers" v-bind:key="developer.id">{{developer.name}}</option>
                        </select>
                        <p>{{estimate.developer}}</p>
            </base-input>
            </div>
            </div>
            <div class="row">
            <div class="col-sm-3">
                <h6 class="heading-small text-muted mb-4 float-left">Due Date</h6>
            </div>
            <div class="col-sm">
                <base-input addon-left-icon="ni ni-calendar-grid-58"
                            alternative
                            class="mb-3"
                            placeholder="17-07-2019"
                            v-model="estimate.dueDate"
                >
                    
                </base-input>
            </div>
            </div>
            <div class="row">
            <div class="col-sm-5">
                <h6 class="heading-small text-muted mb-4 float-left">Main Task Description </h6>
            </div>
            <div class="col-sm-12">
                <base-input alternative="">
                    <textarea rows="4" v-model="estimate.taskDescription" class="form-control form-control-alternative" placeholder="Add main task description here ..."></textarea>
                </base-input>
            </div>
            </div>
        </div>
            <base-button class="shadow-none mt-4 cancel-color" type="secondary" @click="handleSave" >Save</base-button>
            <base-button class="shadow-none mt-4" type="primary" @click="handleSubmit">Send to Developer</base-button>
        </form>
</template>
<script>
export default {
    name: 'create-estimate-form',
    props: {
        // estimates: Array,
    },
    data(){
        return{
            selected: null,
            estimate:[
                {
                    title: '',
                    project: '',
                    developer: '',
                    dueDate: '',
                    taskDescription: '',
                }
            ],
            projects: [
                {   
                    id: 1,
                    name: 'Xente', 
                },
                {   
                    id: 2,
                    name: 'Refactory'
                },
                {   
                    id: 3,
                    name: 'Imuka Access'
                },
                {   
                    id: 4,
                    name: 'Kanzu Code', 
                    
                    },
            ],
            developers: [
                {
                    id: 1,
                    name: 'Benjamin',
                },
                {
                    id: 1,
                    name: 'Ronnie',
                },
                {
                    id: 1,
                    name: 'Beatrice',
                },
                {
                    id: 1,
                    name: 'Sunday',
                }
                
            ]
            
        }
        
    },
    methods: {
      handleSubmit() {
    //   console.log('testing submit')
      this.$emit('add:estimate', this.estimate)
      },
      handleSave() {
      console.log('testing save' )
      },

    },
    
}
</script>