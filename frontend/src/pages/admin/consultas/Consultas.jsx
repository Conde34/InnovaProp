import { useEffect, useState } from "react";
import {
  ClipboardList,
  MessageSquareText,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  eliminarConsulta as eliminarConsultaApi,
  listarConsultas,
} from "../../../services/consultasService";
import "./Consultas.css";

function formatearFecha(fecha) {
  const fechaConsulta = new Date(fecha);
  if (Number.isNaN(fechaConsulta.getTime())) {
    return "Fecha no disponible";
  }

  return fechaConsulta.toLocaleString("es-AR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

const Consultas = () => {
  const [consultas, setConsultas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [errorAccion, setErrorAccion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [eliminandoId, setEliminandoId] = useState(null);

  useEffect(() => {
    let activo = true;

    listarConsultas()
      .then((lista) => {
        if (!Array.isArray(lista)) {
          throw new Error("La respuesta de consultas no tiene el formato esperado.");
        }
        if (activo) setConsultas(lista);
      })
      .catch((loadError) => {
        if (activo) {
          setError(loadError.message || "No se pudieron cargar las consultas.");
        }
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => {
      activo = false;
    };
  }, []);

  const borrarConsulta = async (consulta) => {
    if (!window.confirm(`¿Querés eliminar la consulta de ${consulta.nombre}?`)) {
      return;
    }

    setEliminandoId(String(consulta.id_consulta));
    setErrorAccion("");
    setMensaje("");
    try {
      const resultado = await eliminarConsultaApi(consulta.id_consulta);
      setConsultas((actuales) =>
        actuales.filter(
          (actual) =>
            String(actual.id_consulta) !== String(consulta.id_consulta),
        ),
      );
      setMensaje(resultado.message || "Consulta eliminada");
    } catch (deleteError) {
      setErrorAccion(
        deleteError.message || "No se pudo eliminar la consulta.",
      );
    } finally {
      setEliminandoId(null);
    }
  };

  const nuevas = consultas.filter((consulta) => consulta.estado === "Nueva").length;
  const gestionadas = consultas.length - nuevas;

  return (
    <main className="consultations-page">
      <div className="consultations-shell">
        <header className="consultations-heading">
          <div>
            <span className="consultations-eyebrow">
              INNOVAPROP <span>/</span> ADMINISTRACIÓN
            </span>
            <h1>Consultas</h1>
            <p>Revisá los mensajes que enviaron los clientes a la inmobiliaria.</p>
          </div>
          <Link className="consultations-link" to="/admin/dashboard">
            Volver al dashboard
          </Link>
        </header>

        <section className="consultations-stats" aria-label="Resumen de consultas">
          <article className="consultations-stat">
            <span className="consultations-stat-icon consultations-icon-orange">
              <MessageSquareText size={20} />
            </span>
            <div>
              <span>Total de consultas</span>
              <strong>{cargando ? "—" : consultas.length}</strong>
            </div>
          </article>
          <article className="consultations-stat">
            <span className="consultations-stat-icon consultations-icon-blue">
              <Sparkles size={20} />
            </span>
            <div>
              <span>Nuevas</span>
              <strong>{cargando ? "—" : nuevas}</strong>
            </div>
          </article>
          <article className="consultations-stat">
            <span className="consultations-stat-icon consultations-icon-green">
              <ClipboardList size={20} />
            </span>
            <div>
              <span>Gestionadas</span>
              <strong>{cargando ? "—" : gestionadas}</strong>
            </div>
          </article>
        </section>

        <section className="consultations-inbox" aria-labelledby="consultations-list-title">
          <div className="consultations-section-heading">
            <div>
              <h2 id="consultations-list-title">Bandeja de entrada</h2>
              <p>Las consultas más recientes aparecen primero.</p>
            </div>
            <span className="consultations-count">
              {cargando ? "Cargando..." : `${consultas.length} consultas`}
            </span>
          </div>

          {mensaje && (
            <p className="consultations-message is-success" role="status">
              {mensaje}
            </p>
          )}
          {errorAccion && (
            <p className="consultations-message is-error" role="alert">
              {errorAccion}
            </p>
          )}

          {error ? (
            <div className="consultations-message is-error" role="alert">
              {error}
            </div>
          ) : cargando ? (
            <p className="consultations-message" role="status">
              Cargando consultas...
            </p>
          ) : consultas.length ? (
            <div className="consultations-list">
              {consultas.map((consulta) => (
                <article className="consultation-card" key={consulta.id_consulta}>
                  <header className="consultation-card-heading">
                    <div>
                      <span className="consultation-id">
                        Consulta #{consulta.id_consulta}
                      </span>
                      <time dateTime={consulta.fecha}>
                        {formatearFecha(consulta.fecha)}
                      </time>
                    </div>
                    <div className="consultation-card-actions">
                      <span
                        className={`consultation-status consultation-status-${consulta.estado.toLowerCase()}`}
                      >
                        {consulta.estado}
                      </span>
                      <button
                        className="consultation-delete-button"
                        type="button"
                        aria-label={`Eliminar consulta de ${consulta.nombre}`}
                        disabled={eliminandoId === String(consulta.id_consulta)}
                        onClick={() => borrarConsulta(consulta)}
                      >
                        <Trash2 size={16} aria-hidden="true" />
                        {eliminandoId === String(consulta.id_consulta)
                          ? "Eliminando..."
                          : "Eliminar"}
                      </button>
                    </div>
                  </header>

                  <h3>{consulta.nombre}</h3>
                  <div className="consultation-contact">
                    <a href={`mailto:${consulta.email}`}>{consulta.email}</a>
                    {consulta.telefono && (
                      <a href={`tel:${consulta.telefono}`}>{consulta.telefono}</a>
                    )}
                  </div>

                  <p className="consultation-reason">{consulta.motivo}</p>
                  <p className="consultation-message-text">{consulta.mensaje}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="consultations-empty">
              <MessageSquareText size={25} aria-hidden="true" />
              <h3>Todavía no hay consultas</h3>
              <p>Cuando un cliente envíe un mensaje, aparecerá en esta bandeja.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Consultas;
