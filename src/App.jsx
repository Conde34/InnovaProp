import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/homePage/Home.jsx";
import SobreNosotros from "./pages/sobreNosotros/SobreNosotros.jsx";
import Contacto from "./pages/contacto/Contacto.jsx";
import DetallePropiedad from "./pages/detallePropiedad/DetallePropiedad.jsx";
import PanelPropiedades from "./pages/panelPropiedades/PanelPropiedades.jsx";
import PanelUsuario from "./pages/panelUsuario/PanelUsuario.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Propiedades from "./pages/propiedades/Propiedades.jsx";
import NavbarC from "../src/components/NavbarC.jsx";
import Footer from "../src/components/Footer.jsx";
import NotFound from "./components/NotFound.jsx";
import Unauthorized from "./components/Unauthorized.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import AdminRoute from "./router/AdminRoute.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavbarC />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/propiedades" element={<Propiedades />} />
          <Route path="/propiedades/:id" element={<DetallePropiedad />} />
          <Route path="/sobreNosotros" element={<SobreNosotros />} />
          <Route path="/contacto" element={<Contacto />} />

          {/* Rutas de admin */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/panelPropiedades" element={<PanelPropiedades />} />
            <Route path="/admin/panelUsuarios" element={<PanelUsuario />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;