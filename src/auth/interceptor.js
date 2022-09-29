import axios from 'axios';
import keycloak from "../auth/Keycloak";

var axiosInstance = axios.create();

var config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+keycloak.token,
        'Access-Control-Allow-Origin': '*',
        'withCredentials': true
    }
    //,
    //responseType: 'blob'
  };

axiosInstance.interceptors.request.use(
    // config => {
    //     console.log("someone requested something");
    //     //const token = window.accessToken ? window.accessToken: 'dummy_token';
    //     const token = keycloak.token ? keycloak.token: 'dummy_token';
    //     console.log(keycloak.token)
    //     console.log(token)
    //     //config.headers['Authorization'] = 'Bearer ' + token;
    //     //config.headers.Authorization = 'Bearer ' + token;
    //     //config.headers.AccessControlAllowOrigin = '*';
    //     config.headers.common

    //     // 'Content-Type': 'application/json',
    //     // 'Access-Control-Allow-Origin': '*',
    //     // // Authorization: authInitialized ? `Bearer ${token}` : undefined,

    //     // config.
    //     // console.log("config.headers: ",config.headers)
    //     return config;
    // },
    config,
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
