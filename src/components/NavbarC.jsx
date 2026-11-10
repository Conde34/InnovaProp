import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import './NavbarC.css'

const NavbarC = () => {
  return (
    <Navbar expand="lg" className="navbar-custom" data-bs-theme="dark">
      <Container>
        {/* LOGO */}
        <Navbar.Brand href="/" className="navbar-logo">
          <span className="logo-title">Innova</span>
          <span className="logo-subtitle">PROP</span>
        </Navbar.Brand>

        {/* BOTÓN HAMBURGUESA */}
        <Navbar.Toggle aria-controls="menu-navbar" />

        {/* MENÚ */}
        <Navbar.Collapse id="menu-navbar">
          <Nav className="mx-auto">
            <Nav.Link to="/" className="navegador">
              Inicio
            </Nav.Link>

            <Nav.Link to="/propiedades" className="navegador">
              Propiedades
            </Nav.Link>

            <Nav.Link to="/nosotros" className="navegador">
              Sobre Nosotros
            </Nav.Link>

            <Nav.Link to="/contacto" className="navegador">
              Contacto
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarC;
