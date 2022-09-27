import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import keycloak from "../Keycloak";
import axiosInstance from '../keycloak/interceptor';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableTemplateHardware from './TableTemplateHardware';

class HardwareComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {clients: [], message: [], keycloak: null, authenticated: false};
        //this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        // keycloak.init({onLoad: 'login-required', checkLoginIframe: 'false'}).then(authenticated => {
        //     this.setState({ keycloak: keycloak, authenticated: authenticated })
        //   })

        console.log("hardwarecom... fired yay")
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+keycloak.token,
                'Access-Control-Allow-Origin': '*',
                'withCredentials': true
            },
            params: {
                currencyParam: "Eur"
            }
            //,
            //responseType: 'blob'
          };
        
        // axiosInstance.get('http://localhost:8081/hardwarecomponents', config, {params: {currencyParam: "EUR"}})
        axiosInstance.get('http://localhost:8081/hardwarecomponents', config)
        .then(response => this.setState({message: response.data}))
        // .then(response => response.json)
        // .then(data => this.setState({clients: data}));
        console.log("this.state.message (componentDidMount): ",this.state.message)
    }

    render() {
        
        const {clients, isLoading} = this.state;
        const hardware = this.state.message;
        console.log(hardware)
    
        if(this.state.keycloak) {

            if(this.state.authenticated) {

                if (isLoading) {
                    return <p>Loading...</p>;
                }
                console.log("this.state.message (render): ",this.state.message)
                let json = JSON.parse(this.state.message)
                console.log("json: ",json)
                
                    return <div>Message from Server = {this.state.message}</div>

            } else {
                return <div>Unable to authenticate!</div>
            }
        }
        return (
            <TableTemplateHardware props={hardware}/>
        );
    }
}
export default HardwareComponents;
