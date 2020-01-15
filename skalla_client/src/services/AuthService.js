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
            const role = response.data.role
            const name = response.data.name;
            console.log(role)
            console.log(name);
            if(role === 'Developer'){
                router.push('/pending-estimates')
              }else if(role === 'Project Manager'){
                router.push('/estimates')
              }
        })
        
    },

}
