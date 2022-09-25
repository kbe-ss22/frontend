import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import keycloak from "../Keycloak";
import axiosInstance from '../keycloak/interceptor';

class HelloAnon extends Component {
    constructor(props) {
        super(props);
        this.data = null;
        this.state = {message: null, json: null, errorMessage: null, keycloak: null, authenticated: false};
    }

    componentDidMount() {
        // keycloak.init({onLoad: 'login-required', checkLoginIframe: 'false'})
        // .then(authenticated => {
        //     this.setState({ keycloak: keycloak, authenticated: authenticated })
        //   })

        // var options = {  
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         'Origin': '',
        //         'Host': 'api.producthunt.com'
        //     },
        //     body: JSON.stringify({
        //         'client_id': '(API KEY)',
        //         'client_secret': '(API SECRET)',
        //         'grant_type': 'client_credentials'
        //     })
        // }
        
        // fetch('http://localhost:8081/anonymous/')
        // .then(response => response.json())
        // .then(data => this.setState({message: data}))
        // .catch(error => this.setState( {errorMessage: error }));
        // console.log(this.state.errorMessage)


        // var config = {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': keycloak.token ? keycloak.token: 'dummy_token',
        //         'Access-Control-Allow-Origin': '*'
        //     },
        //     responseType: 'blob'
        //   };

        console.log("keycloak: ",keycloak.authenticated)

        console.log("keycloak.token: ", keycloak.token)
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

        // axiosInstance.get('http://localhost:8081/anonymous',config)
        // .then(response => response.json())
        // .then(data => this.setState({message: data}))
        // .catch(error => this.setState( {errorMessage: error }));
        
        // console.log(this.state.errorMessage)
        // console.log("Message: ",this.state.message)
        console.log("keycloak.authenticated: ",keycloak.authenticated)
        axiosInstance.get('http://localhost:8081/anonymous',config)
        //.then((res) => res.json)
        //.then((response) => this.data = response)
        .then(response => this.setState({message: response.data}))
        if(this.state.message != null) {
            console.log(JSON.parse(this.state.message))
        } else {
            console.log("no json parsing because somehow httpget didnt work")
        }
        
        console.log(this.state.errorMessage)
        console.log("Message: ",this.state.message)
    }

    render() {
        // if(keycloak) {

            if(keycloak.authenticated) {

               return <div>Message from Server = {this.state.message}</div>
            
            //    return
            //     <div>
            //         <h1>How to display JSON data to table in React JS</h1>
            //         <tbody>
            //             <tr>
            //                 <th>User Id</th>
            //                 <th>Id</th>
            //                 <th>Title</th>
            //                 <th>Description</th>
            //             </tr>
            //             {this.data.map((item, i) => (
            //                 <tr key={i}>
            //                     <td>{item.id}</td>
            //                     <td>{item.name}</td>
            //                 </tr>
            //             ))}
            //         </tbody>
            //     </div>

            } else {
                return <div>Unable to authenticate!</div>
            }
        // }
        // return (
        //     <div>
        //         keycloak loading...
        //     </div>
        // );
    }
}
export default HelloAnon;