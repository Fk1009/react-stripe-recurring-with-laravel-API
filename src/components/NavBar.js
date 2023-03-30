import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user-info'));
    const logout = ()=>{
        localStorage.clear();
        navigate('/register');
        
    }
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Stripe Recurring App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll >
             {
                localStorage.getItem('user-info') ? null:
                <>
                <Nav.Link href="#"> <Link to="/">Login</Link></Nav.Link>
                <Nav.Link href="#"><Link to="/register">Register</Link></Nav.Link>
                </>
             }
           
          </Nav>
          {
                localStorage.getItem('user-info') ?
          <Nav>
          <NavDropdown title={user && user.name} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              <NavDropdown.Item >Profile</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          : null }

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;