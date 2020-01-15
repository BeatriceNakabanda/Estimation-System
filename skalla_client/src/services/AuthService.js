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
            const userId = response.data._id

            const user ={
                name,
                email,
                role,
            }
            // console.log(role)
            // console.log(response);
            return {
                user,
                token
            }
        })
        
    },
    // addEstimate(newEstimate){
    //     return axios
    //     .post(url + 'estimate-request', newEstimate)
    //     .then(response => {
    //         const
    //     })


    // }

}
