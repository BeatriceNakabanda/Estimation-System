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
                       :class="{ 'has-error': submitting && invalidDeveloper } " 
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
                <!-- <base-input addon-left-icon="ni ni-calendar-grid-58"
                            alternative
                            class="mb-3"
                            placeholder="17-07-2019"
                            v-model="estimate.dueDate"
                >
                    
                </base-input> -->
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
                ✅ Request successfully edited
            </p>
            <base-button class="shadow-none mt-4 cancel-color" type="secondary" @click="handleSave" >Save as draft</base-button>
            <!-- <base-button class="shadow-none mt-4" type="primary" @click="addEstimate">Send request</base-button> -->
            <base-button class="shadow-none mt-4" type="primary" @click="addEstimate">Edit request</base-button>

        </form>
        
</template>
<script>
import axios from 'axios';
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

const baseURL = "http://localhost:8081/api/estimate-request"

export default {
    name: 'create-estimate-form',
    components: {
        flatPicker
        },
    data(){
        return{
            error: false,
            submitting: false,
            success: false,
            projects: [],
            developers: [],
           
        estimate:
          {
            project: '',
            developer: '',
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

        let edtitedEstimate = {
            project: this.estimate.project,
            developer: this.estimate.developer,
            dueDate: this.estimate.dueDate,
            title: this.estimate.title,
            taskDescription: this.estimate.taskDescription
        }
        console.log(edtitedEstimate)
        axios.put('http://localhost:8081/api/estimate-request/5de538265144501d695f354c', edtitedEstimate)
            .then((response) =>{
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
            
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
        const resp = await axios.get(`http://localhost:8081/api/developers`)
        const respons = await axios.get(`http://localhost:8081/api/estimate-request/5de538265144501d695f354c`)

        this.projects = response.data;
        this.developers = resp.data;
        this.estimate = respons.data;
        // window.location.reload();
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
