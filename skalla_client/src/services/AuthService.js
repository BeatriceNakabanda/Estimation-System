//making requests to the server
import axios from "axios";

const url = "http://localhost:8081/api/";

export default {
  login(credentials) {
    return axios.post(url + "user/userlogin", credentials).then(response => {
      response.data;
      const token = response.data.token;
      const role = response.data.role;
      const email = response.data.email;
      const name = response.data.name;
      const id = response.data.id;

      const user = {
        name,
        email,
        role,
        id
      };
      // console.log(role)
      // console.log(response);
      return {
        user,
        token
      };
    });
  },
  addEstimate(newEstimate) {
    return axios.post(url + "estimate-request", newEstimate).then(response => {
      const project = response.data.project;
      const developer = response.data.developer;
      const dueDate = response.data.dueDate;
      const title = response.data.title;
      const taskDescription = response.data.taskDescription;
      const projectManager = response.data.projectManager;
      const status = response.data.status;
      const dateCreated = response.data.dateCreated;

      const newEstimateRequest = {
        project,
        developer,
        dueDate,
        title,
        taskDescription,
        projectManager,
        status,
        dateCreated
      };

      return {
        newEstimateRequest
      };
    });
  }
};
