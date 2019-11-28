<template>
    <form method="POST" role="form">
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
                        :class="{ 'has-error': submitting && invalidName } " 
                        @focus="clearForm"
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
                        @focus="clearForm"
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
                                :class="{ 'has-error': submitting && invalidName }"
                                @focus="clearForm"
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
                            @focus="clearForm"
                            :class="{ 'has-error': submitting && invalidName }"
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
                :class="{ 'has-error': submitting && invalidName }"
                @focus="clearForm"
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

const baseURL = "http://localhost:8081/estimate"

export default {
    name: 'create-estimate-form',
    components: {
        flatPicker
        },
            // automatically computed properties(functions) to validate form inputs 
    computed: {
        invalidProjectName(){
            return this.estimate.project === ''
        },
        // invalidDeveloper(){
        //     return this.estimate.developers === ''
        // },
        invalidDueDate(){
            return this.dueDate === ''
        },
        invalidTitle(){
            return this.title === ''
        },
        invalidTaskDescription(){
            return this.taskDescription === ''
        }

    },
    data(){
        return{
            projects: [],
            developers: [],
            submitting: false,
            error: false,
            success: false,
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

    methods: {
        async addEstimate(){
            this.submitting = true
            this.clearForm()

                // validating empty inputs
            if(this.invalidProjectName || this.invalidProjectName || this.invalidDueDate || this.invalidTaskDescription)
            {
                this.error = true
                return
            }

        let newEstimate = {
            title: this.estimate.title,
            project: this.estimate.project,
            developer: this.estimate.developer,
            dueDate: this.estimate.dueDate,
            taskDescription: this.estimate.taskDescription
        }
        console.log(newEstimate)
        axios.post('http://localhost:8081/estimate', newEstimate)
            .then((response) =>{
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
            this.error = false
            this.success = true
            this.submitting = false
        
        this.$refs.first.focus()
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
        const response = await axios.get(`http://localhost:8081/projects`)
        // const resp = await axios.get(`http://localhost:8081/developers`)

        this.projects = response.data;
        // this.developers = resp.data;
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
