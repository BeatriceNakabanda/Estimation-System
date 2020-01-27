<template>
                          <form method="POST" role="form" >
                            <div >
                                <div class="row">
                                <div class="col-sm-3">          
                                    <h6 class="heading-small text-muted mb-4 float-left">Project</h6>
                                </div>
                                <div class="col-sm">
                                    <base-input alternative
                                            ref="first"
                                            class="mb-3"
                                            placeholder="Add project here..." 
                                            
                                            @keypress="clearForm"
                                          >
                                            <select class="custom-select" id="inputGroupSelect01" v-model="newEstimate.project">
                                            <option value="" disabled>{{estimate.project.name}}</option>
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
                                          
                                            >
                                            <select class="custom-select" id="inputGroupSelect01" v-model="newEstimate.developer">
                                                <option value="" disabled>{{estimate.developer.name}}</option>
                                                <option  v-for="developer in developers" v-bind:value="{id: developer._id, name: developer.name}"> {{developer.name}}</option>
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
                                                    
                                                    class="form-control datepicker"
                                                    :class="{ 'has-error': submitting  }"
                                                    v-model="newEstimate.dueDate"
                                                    >
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
                                                
                                                v-model="newEstimate.title"
                                                :class="{ 'has-error': submitting  }"
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
                                    :class="{ 'has-error': submitting }">
                                        <textarea rows="4" 
                                        class="form-control form-control-alternative" 
                                        
                                        v-model="newEstimate.taskDescription"></textarea>
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
                                <div class="row  ">
                                <div class="col text-left">
                                  <base-button class="shadow-none mt-4 cancel-color" type="secondary" @click="handleCancel" >Cancel</base-button>
                                </div>
                                <!-- <base-button class="shadow-none mt-4" type="primary" @click="addEstimate">Send request</base-button> -->
                                <div class="col text-right">
                                  <base-button class="shadow-none mt-4" type="primary" id="save-draft" @click="handleEditt(estimate._id)">Edit request</base-button>
                                  <base-button class="shadow-none mt-4" type="primary" id="submit" @click="openSendRequestModel(estimate._id)">Send request</base-button>
                                </div>
                                </div>
                                <!-- <p>{{newEstimateId}}</p> -->
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
    props: {
        // estimates: Array,
        // type: {
            // type: String
        // },
        estimateId: String
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
        newEstimate:{
            project: '',
            developer: '',
            status: '',
            statusType: '',
            dueDate: '',
            title: '',
            taskDescription: '',
          }
        }
        
    },
     // automatically computed properties(functions) to validate form inputs 
    computed: {
        // invalidProjectName(){
        //     return this.estimate.project === ''
        // },
        // invalidDeveloper(){
        //     return this.estimate.developers === ''
        // },
        // invalidDueDate(){
        //     return this.estimate.dueDate === ''
        // },
        // invalidTitle(){
        //     return this.estimate.title === ''
        // },
        // invalidTaskDescription(){
        //     return this.estimate.taskDescription === ''
        // }
    },
    methods: {
                  handleEditt(estimateId){
            this.submitting = true
            this.clearForm()
            
           
            let newEstimateId = this.openEditModel(estimateId)
            console.log(newEstimateId)
           
            const editedEstimate = {
                  project: this.newEstimate.project.id,
                  developer: this.newEstimate.developer.id,
                  dueDate: this.newEstimate.dueDate,
                  title: this.newEstimate.title,
                  taskDescription: this.newEstimate.taskDescription,
                  projectManager: this.$store.getters.getUser.id
              }
             
              console.log(editedEstimate)
            axios.put(`http://localhost:8081/api/estimate-request/` + newEstimateId , editedEstimate)
                  .then((response) =>{
                      console.log(response);
                  })
                  .catch((error) => {
                      console.log(error);
                  });
                  this.success = true
                  this.error = false
     
          },
          handleCancel(){
            this.editDraftModal = false
          },
                    async handleSendRequest(estimateId){
            // let newEstimateId = this.openEditModel(estimateId)
            let editedEstimate = {
                  project: this.estimate.project.id,
                  developer: this.estimate.developer.id,
                  dueDate: this.estimate.dueDate,
                  title: this.estimate.title,
                  taskDescription: this.estimate.taskDescription,
                  projectManager: this.$store.getters.getUser.id,
                  status: this.estimate.status = "Submitted"
              }
              console.log(editedEstimate)
            axios.put(`http://localhost:8081/api/estimate-request/` + estimateId , editedEstimate)
                  .then((response) =>{
                      console.log(response);
                  })
                  .catch((error) => {
                      console.log(error);
                  });
          },
                    async handleSendRequest2(estimateId){
            let newEstimateId = this.openSendRequestModel(estimateId)
            
            let editedEstimate = {
                  status: this.estimate.status = "Submitted"
              }
            axios.put(`http://localhost:8081/api/estimate-request/` + newEstimateId , editedEstimate)
                  .then((response) =>{
                      console.log(response);
                  })
                  .catch((error) => {
                      console.log(error);
                  });
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
        // const res = await axios.get(`http://localhost:8081/api/estimate-request/` + this.$route.params.id)
        // this.estimates = res.data;
        // this.estimate = res.data; 
        // console.log(res)
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