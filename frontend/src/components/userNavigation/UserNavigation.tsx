import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigation } from "./useUserNavigation";
import { Button } from "react-bootstrap";
import { useTheme } from "../../Context/themeProvider/ThemeProvider";
export function UserNavigation() {
  const { userExists, userHasRole, logout } = useNavigation();
  const { toogleTheme, theme } = useTheme();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            {userExists && (
              <>
                <Nav.Link href="/collections"> My collections</Nav.Link>
                <Nav.Link href="/addcollection">Add collection</Nav.Link>
              </>
            )}
            {userHasRole("admin") && (
              <Nav.Link href="/admindashboard">Dashboard</Nav.Link>
            )}
          </Nav>
          <Button onClick={toogleTheme}>
            switch to {theme === "dark" ? "light" : "dark"} mode
          </Button>
          <Nav>
            {userExists ? (
              <Button onClick={logout}>Logout</Button>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
