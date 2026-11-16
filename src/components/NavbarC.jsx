import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import './NavbarC.css'

const NavbarC = () => {
  const user = useAuthStore((state) => state.user);

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
            {user?.rol === "admin" ? (
              <>
                <NavLink to="/admin/dashboard" className="nav-link">
                  Dashboard
                </NavLink>
                <NavLink to="/admin/panelPropiedades" className="nav-link">
                  Propiedades
                </NavLink>
                <NavLink to="/admin/panelUsuarios" className="nav-link">
                  Usuarios
                </NavLink>
              </>
            ) : (
              <>
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
                {/* <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink> */}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarC;
