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

            const user ={
                name,
                email,
                role,
                id
            }
            // console.log(role)
            // console.log(response);
            return {
                user,
                token
            }
        })
        
    },
    //Sending project manager estimate request to the server
    addEstimate(newEstimate){
        return axios
        .post(url + 'estimate-request', newEstimate)
        .then(response => {
            response.data
            const project = response.data.project
            const developer = response.data.developer
            const dueDate = response.data.dueDate
            const title = response.data.title
            const taskDescription = response.data.taskDescription
            const projectManager = response.data.projectManager
            const status = response.data.status
            const dateCreated = response.data.dateCreated
            return{
                    project,
                    developer,
                    dueDate,
                    title,
                    taskDescription,
                    projectManager,
                    status,
                    dateCreated
            } 
            // console.log(response)
        })
    },
    //sending developer estimation to the server
    addEstimation(newEstimate){
        return axios
        .post(url + 'create-estimate', newEstimate)
        .then(response =>{
            response.data
            // let addedEstimate = response.data
            const task = response.data.task
            const research = response.data.research
            const planning = response.data.planning
            const development = response.data.development
            const testing = response.data.testing
            const stabilization = response.data.stabilization
            const certainty = response.data.certainty
            const sumHours = response.data.sum
            const adjustedSumHours = response.data.adjustedSum
            const comments = response.data.comments
            // console.log(addedEstimate)
            return {
                task,
                research,
                planning,
                development,
                testing,
                stabilization,
                certainty,
                sumHours,
                adjustedSumHours,
                comments
            }
        })
    }
    

}
