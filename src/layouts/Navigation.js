import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navigation (){
    return <>
    <Navbar bg="success" data-bs-theme="dark">
        <Container>
            <Navbar.Brand href="">MediPlus</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link href="/users">Users</Nav.Link>
            <Nav.Link href='/login'>Login</Nav.Link>
            </Nav>
        </Container>
    </Navbar>
</>
}

export default Navigation;