import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useContext } from 'react';
import mediContext from '../context/mediplus/mediContext';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function Navigation (){
    //const a = useContext(mediContext)
    return <>
    <Navbar bg="success" data-bs-theme="dark">
        <Container>
            <Navbar.Brand href="">MediPlus</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link href="/users">Users</Nav.Link>
            <Nav.Link href='/patients'>Patients</Nav.Link>
            <Nav.Link href='/medicines'>Medicines</Nav.Link>
            <DropdownButton id="dropdown-basic-button"style={{marginLeft:900}} title={a.Users.name}>
                <Dropdown.Item >Logout</Dropdown.Item>
            </DropdownButton>
            </Nav>
        </Container>
    </Navbar>
</>
}

export default Navigation;