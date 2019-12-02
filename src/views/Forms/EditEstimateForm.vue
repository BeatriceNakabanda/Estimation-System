<template>
<modal :show.sync="modal">
    <form method="POST" role="form">
        <h3 class="modal-title " id="exampleModalLabel">Edit Estimate</h3>
        <div>
            <div class="row">
            <div class="col-sm-3">
                <h6 class="heading-small text-muted mb-4 float-left">Title</h6>
            </div>
            <div class="col-sm">
                <base-input alternative
                        class="mb-3"
                        placeholder="Add title here..."
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
            <base-button class="shadow-none mt-4 cancel-color" type="secondary" @click="modal = false" >Cancel</base-button>
            <base-button class="shadow-none mt-4" type="primary" >Save</base-button>
        </form>
</modal>
</template>
<script>
<<<<<<< HEAD
import axios from 'axios';

const baseURL = "http://localhost:8081/estimate"

export default {
    name: 'edit-estimate-form',
    props:{
        estimates: Array
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
    async created(){
      try{
        const response = await axios.get(`http://localhost:8081/projects`)
        // const resp = await axios.get(`http://localhost:8081/developers`)
        const res = await axios.get(`http://localhost:8081/estimate/` + this.$route.params.id) 

        this.projects = response.data;
        this.estimate = res.data; 
        // this.developers = resp.data;
      }catch(e){
        console.error(e)
      }
    },
    
    methods: {
        onSubmit(evt){
            evt.preventDefault()
            axios.put(`http://localhost:8081/estimate/` + this.$route.params.id, this.estimate)
            .then(response => {
                this.$router.push({
                    name: 'ShowEstimate',
                    params: { id: this.$route.params.id}
                })
            } )
            .catch(e => {
                this.errors.push(e)
            })
        },
      handleSave() {
      console.log('testing save' )
      },  
    },

    
}
=======
import axios from "axios";

const baseURL = "http://localhost:8081/estimate";

export default {
  name: "edit-estimate-form",
  props: {
    estimates: Array
  },
  data() {
    return {
      projects: [],
      developers: []
    };
  },
  async created() {},

  methods: {
    onSubmit(evt) {},
    handleSave() {}
  }
};
>>>>>>> 5130b298bb49fb6cd0ce6be654434809533f7458
</script>
