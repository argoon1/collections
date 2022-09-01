import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigation } from "./useNavigation";

export function Navigation() {
  const { userExists, roles, userHasRole } = useNavigation();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/collections">Collections</Nav.Link>
            {userExists && (
              <Nav.Link href="/collections"> My collections</Nav.Link>
            )}
            {userHasRole("admin") && (
              <Nav.Link href="/admindashboard">Dashboard</Nav.Link>
            )}
          </Nav>
          <Nav>
            {userExists ? (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            ) : (
              <Nav.Link href="/register">Logout</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
