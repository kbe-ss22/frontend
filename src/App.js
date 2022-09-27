import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import HardwareComponents from './components/HardwareComponents';
import Products from './components/Products';
import HelloAnon from './components/HelloAnon';
import Home from './components/Home';
import keycloak from "./Keycloak";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavComponent from './NavComponent';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false };
  }

  componentDidMount() {
    if(!keycloak.authenticated) {
      keycloak.init({onLoad: 'login-required', checkLoginIframe: 'false'})
    } else {
      console.log("already authenticated")
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
          <Route path="/HelloAnon" element={<HelloAnon />} />
        </Routes>
      </BrowserRouter>
    )
  }
}
export default App;
