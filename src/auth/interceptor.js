import axios from 'axios';
import keycloak from "../auth/Keycloak";

var axiosInstance = axios.create();

  axiosInstance.interceptors.request.use(
    req => {
        var headersFix = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+keycloak.token,
            'Access-Control-Allow-Origin': '*',
            'withCredentials': true
        }
        req.headers = headersFix
        return req
    },
    error => {
        console.log(error)
        Promise.reject(error)
    });

axiosInstance.interceptors.response.use((response) => {
    return response
}, function (error) {
    return Promise.reject(error);
    }
);
export default axiosInstance;