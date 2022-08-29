import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import useNavigation from "./useNavigation";

function Navigation() {
  const { userExists, roles } = useNavigation();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/collections">collections</Nav.Link>
            {userExists && (
              <Nav.Link href="/collections"> my collections</Nav.Link>
            )}
          </Nav>
          <Nav>
            {userExists ? (
              <>
                <Nav.Link href="/login">login</Nav.Link>
                <Nav.Link href="/register">register</Nav.Link>
              </>
            ) : (
              <Nav.Link href="/register">register</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
