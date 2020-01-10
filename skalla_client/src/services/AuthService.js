//making requests to the server
import axios from 'axios'

const url = 'http://localhost:8081/api/'

export default {
    login(credentials){
        return axios
        .post(url + 'user/userlogin', credentials)
        .then(response => response.data)
    },
    getSecretContent(){
        return axios.get(url + 'secret-route/').then(response => response.data)
    }
}