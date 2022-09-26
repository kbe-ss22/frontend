import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import keycloak from "./Keycloak";
import { NavbarText } from 'reactstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const items = ["EUR", "MXN", "USD", "CAD", "YEN", "PND"];

function BasicExample() {

  const [selectedItem, setSelectedItem] = useState("");

  function logout() {
    //this.props.history.push('/');
    //this.props.keycloak.logout();
    keycloak.logout();
  }

  function setSelectedItemWrapper(item) {
    setSelectedItem(item)
    Cookies.set('currency', item)
    console.log("NavComponent: Cookies.get('currency'): ",Cookies.get('currency'))
    // component reload somehow
  }

return (
 
  <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand link="#home">KBESS22</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/HardwareComponents">Hardware Components</Nav.Link>
          <Nav.Link as={Link} to="/Products">Products</Nav.Link>
          <Nav.Link as={Link} to="/HelloAnon">Anon</Nav.Link>
          

          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Currency
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {items.map((item) => (
                <Dropdown.Item onClick={() => setSelectedItemWrapper(item)}>
                  {item}
                </Dropdown.Item>
                ))}
              {/* <Dropdown.Item href="#/action-1">EUR</Dropdown.Item>
              <Dropdown.Item href="#/action-2">MXN</Dropdown.Item>
              <Dropdown.Item href="#/action-2">USD</Dropdown.Item>
              <Dropdown.Item href="#/action-3">CAD</Dropdown.Item>
              <Dropdown.Item href="#/action-3">YEN</Dropdown.Item>
              <Dropdown.Item href="#/action-3">PND</Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
          <pre>selectedItem: {selectedItem}</pre>



          <Button variant="outline-primary" onClick={ () => logout() }>Logout</Button>{' '}
          
          
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
}

export default BasicExample;