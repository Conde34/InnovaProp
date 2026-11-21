import { ArrowLeft } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerPropiedad } from "../../../services/propiedadesService";
import "./DetallePropiedad.css";

const DetallePropiedad = () => {
  const { id } = useParams();
  const location = useLocation();
  const [propiedad, setPropiedad] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const rutaAnterior =
    typeof location.state?.from === "string" &&
    location.state.from.startsWith("/") &&
    !location.state.from.startsWith("//")
      ? location.state.from
      : "/propiedades";

  const botonVolver = (
    <Link className="property-detail-back" to={rutaAnterior}>
      <ArrowLeft size={17} />
      Volver atrás
    </Link>
  );

  useEffect(() => {
    let active = true;
    setCargando(true);
    setPropiedad(null);
    setError("");

    obtenerPropiedad(id)
      .then((resultado) => {
        if (active) setPropiedad(resultado);
      })
      .catch((loadError) => {
        if (!active) return;
        if (loadError.message === "Propiedad no encontrada") {
          setPropiedad(null);
          return;
        }
        setError(loadError.message || "No se pudo cargar la propiedad.");
      })
      .finally(() => {
        if (active) setCargando(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (cargando) {
    return (
      <main className="property-detail-page">
        <div className="property-detail-shell">
          {botonVolver}
          <p className="property-detail-feedback" role="status">
            Cargando propiedad...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="property-detail-page">
        <div className="property-detail-shell">
          {botonVolver}
          <p className="property-detail-feedback is-error" role="alert">
            {error}
          </p>
        </div>
      </main>
    );
  }

  if (!propiedad) {
    return (
      <main className="property-detail-page">
        <div className="property-detail-shell">
          {botonVolver}
          <p className="property-detail-feedback">
            No se encontró la propiedad solicitada.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="property-detail-page">
      <div className="property-detail-shell">
        {botonVolver}
        <section className="property-detail-card">
          <div className="property-detail-image-wrap">
            <img
              src={propiedad.imagen}
              alt={propiedad.titulo}
              className="property-detail-image"
            />
          </div>
          <div className="property-detail-content">
            <span className="property-detail-eyebrow">
              {propiedad.tipo} <span>·</span> {propiedad.operacion}
            </span>
            <h1>{propiedad.titulo}</h1>
            <p className="property-detail-location">{propiedad.ubicacion}</p>
            <p className="property-detail-price">
              {new Intl.NumberFormat("es-AR", {
                maximumFractionDigits: 0,
              }).format(Number(propiedad.precio))}
              <span>{propiedad.moneda}</span>
            </p>
            <p className="property-detail-description">{propiedad.descripcion}</p>
            <dl className="property-detail-specs">
              <div>
                <dt>Dirección</dt>
                <dd>{propiedad.direccion}</dd>
              </div>
              <div>
                <dt>Superficie</dt>
                <dd>{propiedad.superficie} m²</dd>
              </div>
              <div>
                <dt>Ambientes</dt>
                <dd>{propiedad.ambientes}</dd>
              </div>
              <div>
                <dt>Dormitorios</dt>
                <dd>{propiedad.dormitorios}</dd>
              </div>
              <div>
                <dt>Baños</dt>
                <dd>{propiedad.banos}</dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </main>
  );
};

export default DetallePropiedad;
