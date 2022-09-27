import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import keycloak from "../Keycloak";
import axiosInstance from '../keycloak/interceptor';
import Cookies from 'js-cookie';

class HardwareComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {clients: [], message: null, authenticated: false};
    }

    componentDidMount() {
        let cookieCurrency = Cookies.get('currency') ?? 'EUR';
        
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+keycloak.token,
                'Access-Control-Allow-Origin': '*',
                'withCredentials': true
            },
            params: {
                currencyParam: cookieCurrency
            }
          };
        
        axiosInstance.get('http://localhost:8081/hardwarecomponents', config)
        .then(response => this.setState({message: response.data}))
    }

    render() {
        console.log("this.state.message: ",this.state.message)
        if(keycloak.authenticated) {
            return <div>check console</div>
            // return <div>Message from Server = {this.state.message}</div>
        
        } else {
            return <div>Unable to authenticate!</div>
        }
    }
}
export default HardwareComponents;
