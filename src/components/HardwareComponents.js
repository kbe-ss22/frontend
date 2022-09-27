import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import keycloak from "../Keycloak";
import axiosInstance from '../keycloak/interceptor';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableTemplateHardware from './TableTemplateHardware';
import Cookies from 'js-cookie';

class HardwareComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {clients: [], message: [], authenticated: false};
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
        const {clients, isLoading} = this.state;
        const hardware = this.state.message;
        console.log(hardware)

        if(keycloak.authenticated) {

            if (isLoading) {
                return <p>Loading...</p>;
            } else {
                return (
                    <TableTemplateHardware props={hardware}/>
                );
            }
        } else {
            return <div>Unable to authenticate!</div>
        }
    }
}
export default HardwareComponents;
