import React, { Component, useEffect } from 'react';
//import Keycloak from 'keycloak-js';
import UserInfo from './UserInfo';
import Logout from './Logout';
import keycloak from "./Keycloak";

class Secured extends Component {

  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false };
  }

  componentDidMount() {
    //const keycloak = Keycloak('/keycloak.json');
    console.log("Secured.js: componentDidMount() triggered")
    keycloak.init({onLoad: 'login-required', checkLoginIframe: 'false'}).then(authenticated => {
      this.setState({ keycloak: keycloak, authenticated: authenticated })
    })
  }

  render() {
    console.log("Secured.js: render() triggered", this.state)
    if(this.state.keycloak) {
      if(this.state.authenticated) 
      
      return (
        <div>
          <p>This is a Keycloak-secured component of your application. You shouldn't be able
          to see this unless you've authenticated with Keycloak.</p>
          <UserInfo keycloak={this.state.keycloak} />
          
          <Logout keycloak={this.state.keycloak} />
        </div>
      ); else return (<div>Unable to authenticate!</div>)
    }
    return (
      <div>Initializing Keycloak...</div>
    );
  }
}
export default Secured;