import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import keycloak from "../Keycloak";
import axiosInstance from '../keycloak/interceptor';

class HardwareComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {clients: [],keycloak: null, authenticated: false};
        //this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        // keycloak.init({onLoad: 'login-required', checkLoginIframe: 'false'}).then(authenticated => {
        //     this.setState({ keycloak: keycloak, authenticated: authenticated })
        //   })
        
        axiosInstance.get('http://localhost:8081/hardwarecomponents/')
        .then(response => response.json())
        .then(data => this.setState({clients: data}));
        console.log(this.state.clients)
    }

    render() {
        
        const {clients, isLoading} = this.state;
    
        if(this.state.keycloak) {

            if(this.state.authenticated) {

                if (isLoading) {
                    return <p>Loading...</p>;
                }
            
                // const clientList = clients.map(client => {
                //     return <tr key={client.id}>
                //         <td style={{whiteSpace: 'nowrap'}}>{client.name}</td>
                //         <td>{client.email}</td>
                //         <td>
                //             <ButtonGroup>
                //                 <Button size="sm" color="primary" tag={Link} to={"/clients/" + client.id}>Edit</Button>
                //                 <Button size="sm" color="danger" onClick={() => this.remove(client.id)}>Delete</Button>
                //             </ButtonGroup>
                //         </td>
                //     </tr>
                // });

            } else {
                return <div>Unable to authenticate!</div>
            }
        }
        return (
            <div>
                bla
                {/* <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/clients/new">Add Client</Button>
                    </div>
                    <h3>Clients</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Name</th>
                            <th width="30%">Email</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clients}
                        </tbody>
                    </Table>
                </Container> */}
            </div>
        );
    }
}
export default HardwareComponents;






//     render() {
//         const {clients, isLoading} = this.state;
    
//         if (isLoading) {
//             return <p>Loading...</p>;
//         }
    
//         const clientList = clients.map(client => {
//             return <tr key={client.id}>
//                 <td style={{whiteSpace: 'nowrap'}}>{client.name}</td>
//                 <td>{client.email}</td>
//                 <td>
//                     <ButtonGroup>
//                         <Button size="sm" color="primary" tag={Link} to={"/clients/" + client.id}>Edit</Button>
//                         <Button size="sm" color="danger" onClick={() => this.remove(client.id)}>Delete</Button>
//                     </ButtonGroup>
//                 </td>
//             </tr>
//         });
    
//         return (
//             <div>
//                 <AppNavbar/>
//                 <Container fluid>
//                     <div className="float-right">
//                         <Button color="success" tag={Link} to="/clients/new">Add Client</Button>
//                     </div>
//                     <h3>Clients</h3>
//                     <Table className="mt-4">
//                         <thead>
//                         <tr>
//                             <th width="30%">Name</th>
//                             <th width="30%">Email</th>
//                             <th width="40%">Actions</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {clientList}
//                         </tbody>
//                     </Table>
//                 </Container>
//             </div>
//         );
//     }
// }
// export default HardwareComponents;