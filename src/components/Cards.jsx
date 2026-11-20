import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import "./Cards.css"; // Importamos el archivo de estilos

const Cards = ({
  id,
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
            loading="lazy"
          />
          <span className="card-image-caption">INNOVAPROP</span>
        </div>
      )}
      <Card.Body className="d-flex flex-column p-4">
        <div>
          <div className="card-property-tags">
            <span
              className={`property-operation-badge ${
                operacion === "Venta" ? "property-operation-sale" : "property-operation-rent"
              }`}
            >
              {operacion}
            </span>
            <span className="card-property-type">{tipo}</span>
          </div>

          <Card.Title className="card-property-title fw-bold text-white">
            {titulo}
          </Card.Title>

          <div className="card-property-location">
            <MapPin size={15} />
            <span>{ubicacion}</span>
          </div>

          {precio !== undefined && precio !== null && (
            <div className="card-property-price">
              <span>Precio</span>
              <strong>
                {new Intl.NumberFormat("es-AR", {
                  maximumFractionDigits: 0,
                }).format(Number(precio))}
                <small>{moneda}</small>
              </strong>
            </div>
          )}

          {descripcion && (
            <Card.Text className="custom-description">
              {descripcion}
            </Card.Text>
          )}
        </div>

        <Link
          to={`/propiedades/${id}`}
          className="btn fw-bold mt-auto text-center text-decoration-none custom-btn"
        >
          Ver propiedad <ArrowUpRight size={17} />
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Cards;
