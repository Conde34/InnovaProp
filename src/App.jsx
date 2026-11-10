// import Contacto from './pages/contacto/Contacto.jsx';
// import Dashboard from './pages/dashboard/Dashboard.jsx';
// import Detalle from './pages/detallePropiedad/DetallePropiedad.jsx';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/homePage/Home.jsx';
// import PanelPropiedades from './pages/panelPropiedades/PanelPropiedades.jsx';
// import PanelUsuario from './pages/panelUsuario/PanelUsuario.jsx';
// import Propiedades from './pages/propiedades/Propiedades.jsx';
// import SobreNosotros from './pages/sobreNosotros/SobreNosotros.jsx';
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <>
    <BrowserRouter>
      {/* <Contacto />
      <Dashboard />
      <Detalle /> */}
      <Home />
      {/* <PanelPropiedades />
      <PanelUsuario />
      <Propiedades />
      <SobreNosotros /> */}
    </BrowserRouter>
    </>
  );
};

export default App;
