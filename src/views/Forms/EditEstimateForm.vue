<template>
  <form role="form">
    <div>
      <div class="row">
        <div class="col-sm-3">
          <h6 class="heading-small text-muted mb-4 float-left">Title</h6>
        </div>
        <div class="col-sm">
          <base-input alternative class="mb-3" v-model="estimate.title">
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-3">
          <h6 class="heading-small text-muted mb-4 float-left">Project</h6>
        </div>
        <div class="col-sm">
          <base-input alternative class="mb-3">
            <select
              class="custom-select"
              id="inputGroupSelect01"
              v-model="estimate.project"
            >
              <option value="" disabled>Please select a project</option>
              <option v-for="project in projects" v-bind:key="project.id">{{
                project.name
              }}</option>
            </select>
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-3">
          <h6 class="heading-small text-muted mb-4 float-left">Assign to</h6>
        </div>
        <div class="col-sm">
          <base-input
            alternative
            class="mb-3"
            placeholder="Add developer here..."
          >
            <select
              class="custom-select"
              id="inputGroupSelect01"
              v-model="estimate.developer"
            >
              <option value="" disabled>Please select a developer</option>
              <option
                v-for="developer in developers"
                v-bind:key="developer.id"
                >{{ developer.name }}</option
              >
            </select>
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-3">
          <h6 class="heading-small text-muted mb-4 float-left">Due Date</h6>
        </div>
        <div class="col-sm">
          <base-input
            addon-left-icon="ni ni-calendar-grid-58"
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
          <h6 class="heading-small text-muted mb-4 float-left">
            Main Task Description
          </h6>
        </div>
        <div class="col-sm-12">
          <base-input alternative="">
            <textarea
              rows="4"
              v-model="estimate.taskDescription"
              class="form-control form-control-alternative"
              placeholder="Add main task description here ..."
            ></textarea>
          </base-input>
        </div>
      </div>
    </div>
    <base-button
      class="shadow-none mt-4 cancel-color"
      type="secondary"
      @click="handleSave"
      >Cancel</base-button
    >
    <base-button class="shadow-none mt-4" type="primary" @click="editEstimate"
      >Save</base-button
    >
  </form>
</template>

<script>
export default {
  name: "edit-estimate-form",
  props: {
    estimates: Array,
    type: {
      type: String
    },
    title: String
  },
  methods: {
    async deleteUser(id) {
      try {
        const response = await axios.delete("./id");
        console.log(res.status);
      } catch (error) {
        console.error(error);
      }
    },
    async updateUser() {
      try {
        const res = await axios.put("", {
          name: "Atta Shah",
          job: "MEAN Stack Developer"
        });
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>
