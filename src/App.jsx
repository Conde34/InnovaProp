import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/homePage/Home.jsx';
import SobreNosotros from './pages/sobreNosotros/SobreNosotros.jsx';
import Contacto from './pages/contacto/Contacto.jsx';
import DetallePropiedad from './pages/detallePropiedad/DetallePropiedad.jsx';
import PanelPropiedades from './pages/panelPropiedades/PanelPropiedades.jsx';
import PanelUsuario from './pages/panelUsuario/PanelUsuario.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Propiedades from './pages/propiedades/Propiedades.jsx';

import NavbarC from '../src/components/NavbarC.jsx'
import Footer from '../src/components/Footer.jsx';

import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavbarC />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobreNosotros" element={<SobreNosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/detallePropiedad" element={<DetallePropiedad />} />
          <Route path="/panelPropiedades" element={<PanelPropiedades />} />
          <Route path="/panelUsuarios" element={<PanelUsuario />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/propiedades" element={<Propiedades />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
