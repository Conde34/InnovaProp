import { getPropiedades } from "../../services/propiedadesService";
import { Container, Row, Col } from "react-bootstrap";
import Cards from "../../components/Cards";
import { useEffect, useState } from "react";
import "./Home.css"; // Importamos los estilos de la paginación

const Home = () => {
  const [propiedades, setPropiedades] = useState([]);

  // Estados para la paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const propiedadesPorPagina = 6; // 6 tarjetas por página

  useEffect(() => {
    getPropiedades()
      .then((datos) => {
        localStorage.setItem("propiedades", JSON.stringify(datos));
        setPropiedades(datos);
      })
      .catch((error) => console.error(error));
  }, []);

  // Lógica de Paginación
  const indiceUltimoItem = paginaActual * propiedadesPorPagina;
  const indicePrimerItem = indiceUltimoItem - propiedadesPorPagina;
  const propiedadesVisibles = propiedades.slice(
    indicePrimerItem,
    indiceUltimoItem,
  );
  const totalPaginas = Math.ceil(propiedades.length / propiedadesPorPagina);

  const siguientePagina = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };

  const paginaAnterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  return (
    <div className="my-5">
      <Container>
        {/* Grilla con separación g-4 */}
        <Row className="g-4">
          {propiedadesVisibles.map((propiedad) => (
            <Col
              sm={12}
              md={6}
              lg={4}
              key={propiedad.id}
              className="d-flex justify-content-center"
            >
              <Cards
                titulo={propiedad.titulo}
                tipo={propiedad.tipo}
                operacion={propiedad.operacion}
                ubicacion={propiedad.ubicacion}
                descripcion={propiedad.descripcion}
                imagen={propiedad.imagen}
              />
            </Col>
          ))}
        </Row>

        {/* Controles de Paginación con diseño CSS externo */}
        <div className="pagination-container">
          <button
            className="pagination-btn"
            onClick={paginaAnterior}
            disabled={paginaActual === 1}
          >
            Anterior
          </button>

          <span className="pagination-info">
            Página {paginaActual} de {totalPaginas}
          </span>

          <button
            className="pagination-btn"
            onClick={siguientePagina}
            disabled={paginaActual === totalPaginas}
          >
            Siguiente
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Home;