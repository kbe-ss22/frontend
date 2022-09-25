import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import axiosInstance from './keycloak/interceptor'
import axios from 'axios';
import keycloak from "./Keycloak";
import { ReactKeycloakProvider } from '@react-keycloak/web'


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <App />
)

reportWebVitals();
