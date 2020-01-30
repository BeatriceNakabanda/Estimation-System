//making requests to the server
import axios from "axios";

const url = "http://localhost:8081/api/";

export default {    
    login(credentials){
        return axios
        .post(url + 'user/userlogin', credentials)
        .then(response => {
            response.data
            const token = response.data.token
            const role = response.data.role
            const email = response.data.email
            const name = response.data.name
            const id = response.data.id

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

            const newEstimateRequest = {
                project,
                developer,
                dueDate,
                title,
                taskDescription,
                projectManager,
                status,
                dateCreated
            }
            
            return{
                newEstimateRequest
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
            const task = response.data.task
            const research = response.data.research
            const planning = response.data.planning
            const development = response.data.development
            const testing = response.data.testing
            const stabilization = response.data.stabilization
            const certainty = response.data.certainty
            const sumHours = response.data.sumHours
            const adjustedSumHours = response.data.adjustedSumHours
            const comments = response.data.comments

            const estimation ={
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
            return {
                estimation
            }
        })
    }
    

}
