// import React, {Component} from "react";
// import Keycloak from 'keycloak-js';

// class Secured extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { keycloak: null, authenticated: false};
//     }

//     componentdidMount() {
//         const keycloak = Keycloak('/keycloak.json');
//         keycloak.init( { onLoad: 'login-required'}).then(authenticeted => {
//             this.setState({ keycloak: keycloak, authenticeted: authenticeted})
//             if(authenticated) {
//                 window.accessToken = keycloak.token;
//             }
//         })
//     }

//     render() {
//         if(this.state.keycloak) {
//             if(this.state.authenticated) return (
//                 <div>
//                     <p>This is a Keycloak-secured Component of your application</p>
//                 </div>
//             ); else return (<div>Unable to authenticate!</div>)
//         }
//         return (
//             <div>Initializing Keycloak...</div>
//         );
//     }
// }
// export default Secured;
