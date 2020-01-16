<template>
    <form method="POST" role="form" @submit.prevent="addEstimate">
        <div>
            <div class="row">
            <div class="col-sm-3">          
                <h6 class="heading-small text-muted mb-4 float-left">Project</h6>
            </div>
            <div class="col-sm">
                <base-input alternative
                        ref="first"
                        class="mb-3"
                        placeholder="Add project here..." 
                        :class="{ 'has-error': submitting && invalidProjectName } " 
                        
                        @keypress="clearForm"
                       >
                        <select class="custom-select" id="inputGroupSelect01" v-model="selectedProject">
                        <option value="" disabled>Please select a project</option>
                        <option v-for="project in projects" v-bind:value="{id: project._id, name: project.name}">{{project.name}}</option>
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
                       :class="{ 'has-error': submitting && invalidDeveloper }" 
                        >
                        <select class="custom-select" id="inputGroupSelect01" v-model="selectedDeveloper">
                            <option value="" disabled>Please select a developer</option>
                            <option v-for="developer in developers" v-bind:value="{id: developer._id, name: developer.name}"> {{developer.name}}</option>
                        </select>
            </base-input>
            <!-- <p>id: {{selectedProject.id}}</p>
            <p>name: {{selectedProject.name}}</p>
            <p>id: {{selectedDeveloper.id}}</p>
            <p>name: {{selectedDeveloper.name}}</p> -->

            </div>
            </div>
            <div class="row">
            <div class="col-sm-3">
                <h6 class="heading-small text-muted mb-4 float-left">Due Date</h6>
            </div>
            <div class="col-sm">
                <base-input addon-left-icon="ni ni-calendar-grid-58">
                    <flat-picker slot-scope="{focus, blur}"
                                @on-open="focus"
                                @on-close="blur"
                                :config="{allowInput: true, dateFormat: 'd-m-Y'}"
                                placeholder="17-07-2019"
                                class="form-control datepicker"
                                :class="{ 'has-error': submitting && invalidDueDate }"
                                v-model="estimate.dueDate">
                    </flat-picker>
                </base-input>
            </div>
            </div>
            <div class="row">
                <div class="col-sm-3">
                    <h6 class="heading-small text-muted mb-4 float-left">Title</h6>
                </div>
                <div class="col-sm">
                    <base-input alternative
                            class="mb-3"
                            placeholder="Add title here..."
                            v-model="estimate.title" 
                           
                            :class="{ 'has-error': submitting && invalidTitle }"
                        >
                </base-input>
                </div>
            </div>
            <div class="row">
            <div class="col-sm-5">
                <h6 class="heading-small text-muted mb-4 float-left">Main Task Description </h6>
            </div>
            <div class="col-sm-12">
                <base-input alternative=""
                :class="{ 'has-error': submitting && invalidTaskDescription }"
                
                >
                    <textarea rows="4" v-model="estimate.taskDescription" class="form-control form-control-alternative" placeholder="Add main task description here ..."></textarea>
                </base-input>
            </div>
            </div>
        </div>
            <p v-if="error && submitting" class="error-message">
                ❗Please fill in all fields
            </p>
            <p v-if="success" class="success-message">
                ✅ Request successfully sent
            </p>
            <base-button class="shadow-none mt-4 cancel-color" type="secondary" @click="handleSave" >Save as draft</base-button>
            <!-- <base-button class="shadow-none mt-4" type="primary" @click="addEstimate">Send request</base-button> -->
            <base-button class="shadow-none mt-4" type="primary" @click="addEstimate">Send request</base-button>

        </form>
        
</template>
<script>
import axios from 'axios';
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
// import AuthService from "../../services/AuthService";


export default {
    name: 'create-estimate-form',
    components: {
        flatPicker
        },
    data(){
        return{
            selectedProject: '',
            selectedDeveloper: '',
            error: false,
            submitting: false,
            success: false,
            projects: [],
            developers: [],

            estimates: [],
           
        estimate:
          {
            selectedProject: '',
            selectedDeveloper: '',
            status: '',
            statusType: '',
            dueDate: '',
            title: '',
            taskDescription: '',
          },
        }
        
    },
     // automatically computed properties(functions) to validate form inputs 
    computed: {
        invalidProjectName(){
            return this.estimate.project === ''
        },
        invalidDeveloper(){
            return this.estimate.developers === ''
        },
        invalidDueDate(){
            return this.estimate.dueDate === ''
        },
        invalidTitle(){
            return this.estimate.title === ''
        },
        invalidTaskDescription(){
            return this.estimate.taskDescription === ''
        }

    },

    methods: {
        async addEstimate(){
            this.clearForm()
            this.submitting = true

                // validating empty inputs
            if(this.invalidProjectName || this.invalidDueDate || this.invalidTitle || this.invalidTaskDescription)
            {
                this.error = true
                return
            }
        // const projectManager = this.$store.getters.getUser.id
        let newEstimate = {
            project: this.selectedProject.id,
            developer: this.selectedDeveloper.id,
            dueDate: this.estimate.dueDate,
            title: this.estimate.title,
            taskDescription: this.estimate.taskDescription,
            projectManager: this.$store.getters.getUser.id

        }
        // const id = this.estimate.developer.id
        // console.log(id)


        // console.log(projectManager)
        // console.log(newEstimate)
        // const response = await AuthService.addEstimate(newEstimate);

    
            
            // console.log(response)
            this.success = true
            this.error = false
            this.submitting = false 
                         
        },


    clearForm(){
                this.success = false
                this.error = false
            },
      handleSave() {
      console.log('testing save' )
      },  
    },
    async created(){
      try{
        const response = await axios.get(`http://localhost:8081/api/projects`)
        const resp = await axios.get(`http://localhost:8081/api/users/developers`)
        // const respons = await axios.get(`http://localhost:8081/api/estimate-request/5e202bf35dfb7025a93e779d` )

        const res = await axios.get(`http://localhost:8081/api/estimate-request/5e202bf35dfb7025a93e779d`)

        this.estimates = res.data;
        this.projects = response.data;
        this.developers = resp.data;
        // this.estimate = respons.data;
        // window.location.reload();
        // console.log(this.projects)
        // console.log(this.estimate)
      }catch(e){
        console.error(e)
        
      }
    },
    
    
}
</script>
<style scoped>
[class*='-message'] {
    font-weight: 500;
  }

  .error-message {
    color: #d33c40;
    text-align: left;
  }

  .success-message {
    color: #32a95d;
    text-align: left;
  }
</style>
