import { Button, Navbar, Nav, Container, Navdropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
const Header = () => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar bg="dark" expand="lg" sticky="top" className="shadow-sm">
                <Navbar.Brand href="#home" className="fw-bold text-primary fs-3 ms-3">
                    FoodieExpress
                </Navbar.Brand>
                <Container>

                    <Navbar.Toggle aria-controls="food-navbar-nav" />
                    <Navbar.Collapse id="food-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/home" className='text-white'>Home</Nav.Link>
                            <Nav.Link href="/orders" className='text-white'>Orders</Nav.Link>
                            
                        </Nav>
                        <Nav className="ms-auto">
                            <Button
                                variant="outline-light"
                                className="me-2"
                                onClick={() => navigate('/cart')}
                            >
                                🛒 Cart
                            </Button>
                            <Button variant="primary" className="me-2" onClick={() => navigate('/logout')}>
                                Logout
                            </Button>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


        </>
    )
}

export default Header;

