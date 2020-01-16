//making requests to the server
import axios from "axios";
import router from "../router";

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
            console.log(id)
            // console.log(response);
            return {
                user,
                token
            }
        })
        
    },
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

            const newEstimateRequest = {
                project,
                developer,
                dueDate,
                title,
                taskDescription,
                projectManager
            }
            return{
                newEstimateRequest
            } 
            // console.log(response)
        })


    }

}
