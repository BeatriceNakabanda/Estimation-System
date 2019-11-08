<template>
    <form method="POST" role="form">
        <div>
            <div class="row">
            <div class="col-sm-3">
                <h6 class="heading-small text-muted mb-4">Title</h6>
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
                <h6 class="heading-small text-muted mb-4">Project</h6>
            </div>
            <div class="col-sm">
                <base-input alternative
                        class="mb-3"
                        placeholder="Edit developer here..."
                        v-model="estimate.project"
                        >
                        <select class="custom-select" id="inputGroupSelect01">
                        <option selected>Choose project...</option>
                        <option value="1">Refactory</option>
                        <option value="2">Xente</option>
                        <option value="3">Imuka</option>
                        <option value="4">Stanbic</option>
                        </select>
            </base-input>
            </div>
            </div>
            <div class="row">
            <div class="col-sm-3">
                <h6 class="heading-small text-muted mb-4">Assign to</h6>
            </div>
            <div class="col-sm">
                <base-input alternative
                        class="mb-3"
                        placeholder="Add project here..."
                        v-model="estimate.developer"
                        >
                        <select class="custom-select" id="inputGroupSelect01">
                        <option selected>Select developer...</option>
                        <option value="1">Benjamin</option>
                        <option value="2">Beatrice</option>
                        <option value="3">Ronnie</option>
                        <option value="4">Olive</option>
                        </select>
            </base-input>
            </div>
            </div>
            <div class="row">
            <div class="col-sm-3">
                <h6 class="heading-small text-muted mb-4">Due Date</h6>
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
                <h6 class="heading-small text-muted mb-4">Main Task Description </h6>
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
    data(){
        return{
            estimate:[
                {
                    title: '',
                    project: '',
                    developer: '',
                    dueDate: '',
                    taskDescription: '',
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