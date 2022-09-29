import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HardwareComponents from './components/HardwareComponents';
import Products from './components/Products';
import Home from './components/Home';
import keycloak from "./auth/Keycloak";
import NavComponent from './nav/NavComponent';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false };
  }

  componentDidMount() {
    if(!keycloak.authenticated) {
      keycloak.init({onLoad: 'login-required', checkLoginIframe: 'false'})
    }
  }

  render() {
    return (
      <BrowserRouter>
        <NavComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/HardwareComponents" element={<HardwareComponents />} />
          <Route path="/Products" element={<Products />} />
        </Routes>
      </BrowserRouter>
    )
  }
}
export default App;
