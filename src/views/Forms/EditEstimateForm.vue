<template>
    <form role="form">
        <div>
            <div class="row">
            <div class="col-sm-3">
                <h6 class="heading-small text-muted mb-4 float-left">Title</h6>
            </div>
            <div class="col-sm">
                <base-input alternative
                        class="mb-3"
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
                       >
                        <select class="custom-select" id="inputGroupSelect01" v-model="estimate.project">
                        <option value="" disabled>Please select a project</option>
                        <option v-for="project in projects" v-bind:key="project.id">{{project.name}}</option>
                        </select>
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
                        >
                        <select class="custom-select" id="inputGroupSelect01" v-model="estimate.developer">
                            <option value="" disabled>Please select a developer</option>
                            <option v-for="developer in developers" v-bind:key="developer.id">{{developer.name}}</option>
                        </select>
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
            <base-button class="shadow-none mt-4 cancel-color " type="secondary"  @click="modal = false">Cancel</base-button>
            <base-button class="shadow-none mt-4 " type="primary " @click="editMode(estimate.id)">Save</base-button>
            <ol>
                <li>{{estimate.title}}</li>
            </ol>
    </form>
</template>

<script>    
 
 import axios from 'axios'
    
export default {
    name: 'edit-estimate-form',
    props: {
        estimates: Array,
        type: {
            type: String
        },
        title: String
    },
    data(){
        return{
        projects: [],
        developers: [],
        estimate:
          {
            title: '',
            project: '',
            developer: '',
            status: '',
            statusType: '',
            dueDate: '',
            taskDescription: '',
          },
        }
    },
    // async created(id){
    //   try {
    //     const res = await axios.get(`http://localhost:3000/estimates/${id}`)

    //     this.estimates = res.data; 
    //   } catch(e){
    //     console.error(e)
    //   }
    // },
    // mounted(){
    //     this.id = this.$route.params.id,
    //     this.fetchEstimate(this.id)
    // },
    methods: {
        // used to fetch the article to updated
        // @return {[type]} [description]
    //    fetchEstimate(id){
    //         const response = await axios.get(`http://localhost:3000/estimates/${id}`, {
                
    //         }

    //    }
           
        async editEstimate(id, updatedEstimate){
           
                const response = await axios.put(`http://localhost:3000/estimates/${id}`, {
                    title: this.estimate.title,
                    project: this.estimate.project,
                    developer: this.estimate.developer,
                    status: this.estimate.status,
                    dueDate: this.estimate.dueDate,
                    taskDescription: this.estimate.taskDescription,
                })
        this.estimates = [...this.estimates, res.data]
        this.title = '' ,
        this.project = '',
        this.developer = '',
        this.status = '',
        this.dueDate = '',
        this.taskDescription = ''
            
        },
         editMode(id) {
            this.editing = id;
            },
            
    }
}
</script>