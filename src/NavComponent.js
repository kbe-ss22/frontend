import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function BasicExample() {
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
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
}

export default BasicExample;