import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import keycloak from "../Keycloak";
import axiosInstance from '../keycloak/interceptor';
import Cookies from 'js-cookie';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {clients: [], message: null, keycloak: null, authenticated: false};
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
            //,
            //responseType: 'blob'
          };
        
        // axiosInstance.get('http://localhost:8081/hardwarecomponents', config, {params: {currencyParam: "EUR"}})
        axiosInstance.get('http://localhost:8081/products', config)
        .then(response => this.setState({message: response.data}))
        // .then(response => response.json)
        // .then(data => this.setState({clients: data}));
        console.log("this.state.message (componentDidMount): ",this.state.message)
    }

    render() {
        
        const {clients, isLoading} = this.state;
        console.log(this.state.message)
    
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
            <div>check console</div>
        );
    }
}
export default Products;
