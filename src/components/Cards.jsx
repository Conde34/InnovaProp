import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./Cards.css"; // Importamos el archivo de estilos

const Cards = ({
  titulo,
  tipo,
  operacion,
  precio,
  moneda,
  ubicacion,
  descripcion,
  imagen,
}) => {
  return (
    <Card className="h-100 border-0 rounded-4 overflow-hidden shadow-lg custom-property-card">
      {imagen && (
        <div className="card-img-container">
          <Card.Img
            variant="top"
            className="card-img-zoom"
            src={imagen}
            alt={titulo}
          />
        </div>
      )}
      <Card.Body className="d-flex flex-column justify-content-between p-4">
        <div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="badge px-2 py-1 small fw-bold custom-badge">
              {operacion}
            </span>
            <span className="text-light small opacity-75">{tipo}</span>
          </div>

          <Card.Title className="fw-bold mb-2 text-white fs-5">
            {titulo}
          </Card.Title>

          {descripcion && (
            <Card.Text className="small mb-3 custom-description">
              {descripcion}
            </Card.Text>
          )}

          <div className="mb-3 small">
            <div className="d-flex align-items-center text-light opacity-87 mb-1">
              <span>📍 {ubicacion}</span>
            </div>
            <div className="fs-4 fw-bold mt-2 custom-price">
              {precio} {moneda}
            </div>
          </div>
        </div>

        <Link
          to={`/detallePropiedad`}
          className="btn fw-bold py-2 mt-2 text-uppercase text-center text-decoration-none custom-btn"
        >
          Ver Más
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Cards;
