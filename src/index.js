import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import axiosInstance from './keycloak/interceptor'
import axios from 'axios';
import keycloak from "./Keycloak";


// axios.interceptors.request.use(
//   config => {
//       //const token = window.accessToken ? window.accessToken: 'dummy_token';
//       console.log("Keycloak token: ",keycloak.token)
      
//       const token = keycloak.token ? keycloak.token: 'dummy_token';
//       config.headers['Authorization'] = 'Bearer ' + token;
//       return config;
//   },
//   error => {
//       Promise.reject(error)
//   });

// axios.interceptors.response.use((response) => {
//   return response
// }, function (error) {
//   return Promise.reject(error);
//   } 
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <ReactKeycloakProvider>
    //<React.StrictMode>
      <App />
    //</React.StrictMode>
  // </ReactKeycloakProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
