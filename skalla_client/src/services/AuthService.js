//making requests to the server
import axios from "axios";
import router from "../router";

const url = "http://localhost:8081/api/";

<<<<<<< HEAD
export default {
  login(credentials) {
    return axios.post(url + "user/userlogin", credentials).then(response => {
      response.data;
      const role = response.data.role;
      const name = response.data.name;
      console.log(role);
      console.log(name);
      if (role === "Developer") {
        router.push("/pending-estimates");
      } else if (role === "Project Manager") {
        router.push("/estimates");
      }
    });
  },
  getSecretContent() {
    return axios.get(url + "secret-route/").then(response => response.data);
  }
};
=======
export default {    
    login(credentials){
        return axios
        .post(url + 'user/userlogin', credentials)
        .then(response => {
            response.data
            const role = response.data.role
            console.log(role)
            if(role === 'Developer'){
                router.push('/pending-estimates')
              }else if(role === 'Project Manager'){
                router.push('/estimates')
              }
        })
        
    },
    
    getSecretContent(){
        return axios.get(url + 'secret-route/').then(response => response.data)
    }
}
>>>>>>> b60f15c0748cf67778be1e1c02ac1b0baf75c848
