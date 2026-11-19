import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCasas } from "../../../data/properties";

const DetallePropiedad = () => {
  const { id } = useParams();
  const [propiedad, setPropiedad] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCasas()
      .then((casas) => {
        setPropiedad(casas.find((casa) => String(casa.id) === id) || null);
      })
      .catch((error) => {
        console.error(error);
        setError("No se pudo cargar la propiedad.");
      })
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) {
    return <main className="container my-5"><p>Cargando propiedad...</p></main>;
  }

  if (error) {
    return <main className="container my-5"><p className="alert alert-danger" role="alert">{error}</p></main>;
  }

  if (!propiedad) {
    return (
      <main className="container my-5">
        <p className="alert alert-warning">No se encontró la propiedad solicitada.</p>
      </main>
    );
  }

  return (
    <main className="container my-5">
      <div className="row g-4 align-items-start">
        <div className="col-12 col-lg-7">
          <img
            src={propiedad.imagen}
            alt={propiedad.titulo}
            className="img-fluid rounded-4 w-100"
          />
        </div>
        <div className="col-12 col-lg-5">
          <p className="text-muted mb-2">ID de propiedad: {propiedad.id}</p>
          <h1 className="h2">{propiedad.titulo}</h1>
          <p className="mb-2">
            {propiedad.tipo} · {propiedad.operacion}
          </p>
          <p className="fs-4 fw-bold">
            {propiedad.precio} {propiedad.moneda}
          </p>
          <p>{propiedad.descripcion}</p>
          <hr />
          <dl className="row">
            <dt className="col-sm-5">Ubicación</dt>
            <dd className="col-sm-7">{propiedad.ubicacion}</dd>
            <dt className="col-sm-5">Dirección</dt>
            <dd className="col-sm-7">{propiedad.direccion}</dd>
            <dt className="col-sm-5">Superficie</dt>
            <dd className="col-sm-7">{propiedad.superficie} m²</dd>
            <dt className="col-sm-5">Ambientes</dt>
            <dd className="col-sm-7">{propiedad.ambientes}</dd>
            <dt className="col-sm-5">Dormitorios</dt>
            <dd className="col-sm-7">{propiedad.dormitorios}</dd>
            <dt className="col-sm-5">Baños</dt>
            <dd className="col-sm-7">{propiedad.banos}</dd>
          </dl>
        </div>
      </div>
    </main>
  );
};

export default DetallePropiedad;
