import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Welcome from './Welcome';
import Secured from './Secured';
import './App.css';
import HardwareComponents from './components/HardwareComponents';
import Products from './components/Products';
import HelloAnon from './components/HelloAnon';
import keycloak from "./Keycloak";
import Logout from './Logout';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false };
  }

  componentDidMount() {
    console.log("Secured.js: componentDidMount() triggered")
    if(!keycloak.authenticated) {
      keycloak.init({onLoad: 'login-required', checkLoginIframe: 'false'})
    }
  }

  render() {

    console.log("this.state.keycloak: ",this.state.keycloak)
    return (
      <BrowserRouter>
        <div className="container">
          <ul>
            <li><Link to="/HardwareComponents">Hardware Components</Link></li>
            <li><Link to="/Products">Products</Link></li>
            <li><Link to="/HelloAnon">test message</Link></li>
            <li><Logout keycloak={keycloak} /></li>
          </ul>
          <Route path="/HardwareComponents" component={HardwareComponents} />
          <Route path="/HelloAnon" component={HelloAnon}/>
          <Route path="/Products" component={Products}/>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
