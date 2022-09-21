import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Welcome from './Welcome';
import Secured from './Secured';
import './App.css';
import HardwareComponents from './components/HardwareComponents';
import HelloAnon from './components/HelloAnon';


class App extends Component {

 

  render() {

    
    return (
      <BrowserRouter>
        <div className="container">
          <ul>
            <li><Link to="/">public component</Link></li>
            <li><Link to="/secured">secured component</Link></li>
            <li><Link to="/HardwareComponents">hardwarecomponents</Link></li>
            <li><Link to="/HelloAnon">helloanon</Link></li>
          </ul>
          <Route exact path="/" component={Welcome} />
          <Route path="/secured" component={Secured} />
          <Route path="/HelloAnon" component={HelloAnon}/>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
// import React from "react";
// import { ReactKeycloakProvider } from "@react-keycloak/web";
// import keycloak from "./Keycloak";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Nav from "./components/Nav";
// import WelcomePage from "./pages/Homepage";
// import SecuredPage from "./pages/Securedpage";
// import PrivateRoute from "./helpers/PrivateRoute";

// function App() {
//  return (
//    <div>
//      <ReactKeycloakProvider authClient={keycloak}>
//        <Nav />
//        <BrowserRouter>
//          <Routes>
//            <Route exact path="/" element={<WelcomePage />} />
//            <Route
//              path="/secured"
//              element={
//                <PrivateRoute>
//                  <SecuredPage />
//                </PrivateRoute>
//              }
//            />
//          </Routes>
//        </BrowserRouter>
//      </ReactKeycloakProvider>
//    </div>
//  );
// }

// export default App;