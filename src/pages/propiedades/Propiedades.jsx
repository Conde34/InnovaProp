import Cards from "../../components/Cards";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { casas } from "../../data/properties";
import "./Propiedades.css"

const Propiedades = () => {
  const [propiedades, setPropiedades] = useState([]);

  useEffect(() => {
    localStorage.setItem("propiedades", JSON.stringify(casas));
    setPropiedades(casas);
  }, []);


    // Estados para la paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const propiedadesPorPagina = 6; // 6 tarjetas por página


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
                id={propiedad.id}
                titulo={propiedad.titulo}
                tipo={propiedad.tipo}
                operacion={propiedad.operacion}
                precio={propiedad.precio}
                moneda={propiedad.moneda}
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

export default Propiedades;
