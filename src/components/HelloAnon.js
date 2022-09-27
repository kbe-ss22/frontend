import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import keycloak from "../Keycloak";
import axiosInstance from '../keycloak/interceptor';
import Cookies from 'js-cookie';

class HelloAnon extends Component {
    constructor(props) {
        super(props);
        this.data = null;
        this.state = {message: null, json: null, errorMessage: null, authenticated: false};
    }

    componentDidMount() {
        

        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+keycloak.token,
                'Access-Control-Allow-Origin': '*',
                'withCredentials': true
            }
          };

        axiosInstance.get('http://localhost:8081/anonymous',config)
        .then(response => this.setState({message: response.data}))
    }

    render() {
        if(keycloak.authenticated) {

            return <div>Message from Server = {this.state.message}</div>
        
        } else {
            return <div>Unable to authenticate!</div>
        }
    }
}
export default HelloAnon;