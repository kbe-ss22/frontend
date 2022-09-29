import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import keycloak from "../auth/Keycloak";
import React, { useState, useEffect } from 'react';

const items = ["EUR", "MXN", "USD", "CAD", "YEN", "PND"];

function BasicExample() {

  const [selectedItem, setSelectedItem] = useState("");

  function logout() {
    keycloak.logout();
  }

return (
 
  <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand as={Link} to="/">KBESS22</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/HardwareComponents">Hardware Components</Nav.Link>
          <Nav.Link as={Link} to="/Products">Products</Nav.Link>
          
          <Button variant="outline-primary" onClick={ () => logout() }>Logout</Button>{' '}
          
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
}

export default BasicExample;