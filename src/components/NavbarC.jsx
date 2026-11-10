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
            <NavLink to="/" className="nav-link">
              Inicio
            </NavLink>

            <NavLink to="/propiedades" className="nav-link">
              Propiedades
            </NavLink>

            <NavLink to="/sobreNosotros" className="nav-link">
              Sobre Nosotros
            </NavLink>

            <NavLink to="/contacto" className="nav-link">
              Contacto
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarC;
