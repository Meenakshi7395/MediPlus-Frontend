import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useContext } from 'react';
import mediContext from '../context/mediplus/mediContext';
import Dropdown from 'react-bootstrap/Dropdown';
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Navigation (){
    const navigate = useNavigate
   const {user,onLogout} = useContext(mediContext)
    return <>    
    <Navbar bg="success" data-bs-theme="dark">
        <Container>
            <Navbar.Brand href="">MediPlus</Navbar.Brand>
        
            {user==null ? <></> : <><Nav className="me-auto">
            <Nav.Link to="/users" >Users</Nav.Link>
            <Nav.Link to='/patients'>Patients</Nav.Link>
            <Nav.Link to='/medicines'>Medicines</Nav.Link>
            {/* <DropdownButton id="dropdown-basic-button" style={{marginLeft:900}}>
                <Dropdown.Item >Logout</Dropdown.Item>
            </DropdownButton> */}
            </Nav> 

            <Nav> 
                <NavDropdown title={user.name}>
                    <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
                </NavDropdown>
            </Nav></>
            }
        </Container>
    </Navbar>
</>
}

export default Navigation;