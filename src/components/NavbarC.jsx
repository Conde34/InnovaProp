import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import "./NavbarC.css";

const NavbarC = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
          {/* ENLACES CENTRADOS */}
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
              </>
            )}
          </Nav>

          {/* BOTONES DE AUTENTICACIÓN A LA DERECHA */}
          <Nav className="ms-auto align-items-lg-center gap-2 mt-2 mt-lg-0">
            {!user ? (
              <>
                <NavLink to="/login" className="btn-auth-outline">
                  Iniciar sesión
                </NavLink>
                <NavLink to="/register" className="btn-auth-solid">
                  Register
                </NavLink>
              </>
            ) : (
              <button onClick={handleLogout} className="btn-auth-solid">
                Cerrar sesión
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarC;