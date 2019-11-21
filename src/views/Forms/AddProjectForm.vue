<template>
  <form role="form">
    <div class="row">
      <div class="col-sm-4">
        <h6 class="heading-small text-muted mb-4">Project Name</h6>
      </div>
      <div class="col-sm">
        <base-input
          alternative
          class="mb-3"
          placeholder="Add project name here..."
          v-model="project.name"
        >
        </base-input>
      </div>
    </div>
    <base-button
      class="shadow-none cancel-color"
      type="secondary"
      @click="modal1 = false"
      >Close</base-button
    >
    <base-button class="shadow-none" type="primary" @click="addProject"
      >Add</base-button
    >
  </form>
</template>
<script>
import axios from "axios";
const baseURL = "http://localhost:8081/project";

export default {
  name: "add-project-form",
  data() {
    return {
      project: {
        name: ""
      }
    };
  },
  methods: {
    async addProject() {
      const res = await axios.post(baseURL, {
        name: this.project.name
      });
      this.projects = [...this.projects, res.dat];
      this.name = "";
    }
  }
};
</script>
