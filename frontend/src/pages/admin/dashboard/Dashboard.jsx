import { useEffect, useState } from "react";
import { ArrowUpRight, Building2, CircleDollarSign, MapPin, Plus, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { getCasas } from "../../../data/properties";
import "./Dashboard.css";

const Dashboard = () => {
  // Estado del catálogo y del resultado de la carga inicial.
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Lee las propiedades al entrar y evita actualizar el estado si se sale de la página.
  useEffect(() => {
    let active = true;

    getCasas()
      .then((data) => {
        if (active) setProperties(data);
      })
      .catch(() => {
        if (active) setError("No se pudieron cargar las propiedades.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Datos derivados del catálogo para alimentar los indicadores y listados.
  const availableCount = properties.filter(
    (property) => property.disponible,
  ).length;
  const unavailableCount = properties.length - availableCount;
  const availabilityPercent = properties.length
    ? Math.round((availableCount / properties.length) * 100)
    : 0;
  const featuredProperties = properties.filter(
    (property) => property.destacado,
  );
  const propertyTypes = [...new Set(properties.map((property) => property.tipo))];
  const typeCounts = propertyTypes
    .map((type) => ({
      name: type,
      count: properties.filter((property) => property.tipo === type).length,
    }))
    .sort((first, second) => second.count - first.count);
  const maxTypeCount = Math.max(...typeCounts.map(({ count }) => count), 1);

  // Configuración de las tarjetas de resumen mostradas en la parte superior.
  const metrics = [
    {
      label: "Propiedades",
      value: properties.length,
      detail: "En tu catálogo",
      icon: Building2,
      color: "blue",
    },
    {
      label: "Disponibles",
      value: availableCount,
      detail: "Listas para ofrecer",
      icon: CircleDollarSign,
      color: "green",
    },
    {
      label: "Destacadas",
      value: featuredProperties.length,
      detail: "Visibles en portada",
      icon: Star,
      color: "orange",
    },
    {
      label: "Tipos de inmueble",
      value: propertyTypes.length,
      detail: "En distintas categorías",
      icon: MapPin,
      color: "violet",
    },
  ];

  return (
    <main className="dashboard-page">
      <div className="dashboard-content">
        {/* Título de la página y acceso al panel de administración de propiedades. */}
        <header className="dashboard-heading">
          <div>
            <span className="dashboard-eyebrow">INNOVAPROP · ADMINISTRACIÓN</span>
            <h1>Dashboard</h1>
            <p>Un resumen sencillo de la actividad de tu inmobiliaria.</p>
          </div>
          <Link className="dashboard-add-button" to="/admin/panelPropiedades">
            <Plus size={18} />
            <span>Administrar propiedades</span>
          </Link>
        </header>

        {/* Si falla la carga, muestra el problema en lugar de datos vacíos. */}
        {error ? (
          <div className="dashboard-message dashboard-error" role="alert">
            {error}
          </div>
        ) : (
          <>
            {/* Indicadores principales del catálogo. */}
            <section className="dashboard-metrics" aria-label="Resumen">
              {metrics.map(({ label, value, detail, icon: Icon, color }) => (
                <article className="dashboard-card dashboard-metric" key={label}>
                  <div className={`dashboard-icon dashboard-icon-${color}`}>
                    <Icon size={20} />
                  </div>
                  <p>{label}</p>
                  <strong>{loading ? "—" : value}</strong>
                  <span>{detail}</span>
                </article>
              ))}
            </section>

            {/* Gráficos del inventario y de la disponibilidad del catálogo. */}
            <section className="dashboard-panels">
              <article className="dashboard-card dashboard-inventory">
                <div className="dashboard-panel-heading">
                  <div>
                    <h2>Inventario por tipo</h2>
                    <p>Cómo se distribuyen tus propiedades.</p>
                  </div>
                  <Building2 className="dashboard-panel-icon" size={20} />
                </div>

                {/* Compara la cantidad de inmuebles de cada tipo. */}
                {loading ? (
                  <p className="dashboard-empty">Cargando inventario...</p>
                ) : typeCounts.length ? (
                  <div
                    className="dashboard-chart"
                    role="img"
                    aria-label="Cantidad de propiedades por tipo"
                  >
                    {typeCounts.map(({ name, count }, index) => (
                      <div
                        className="dashboard-chart-column"
                        key={name}
                        title={`${name}: ${count} propiedades`}
                      >
                        <strong className="dashboard-chart-count">{count}</strong>
                        <div className="dashboard-chart-track">
                          <span
                            className={`dashboard-chart-bar dashboard-chart-bar-${index % 4}`}
                            style={{
                              height: `${(count / maxTypeCount) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="dashboard-chart-label">{name}</span>
                        <small>
                          {Math.round((count / properties.length) * 100)}%
                        </small>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="dashboard-empty">Todavía no hay propiedades.</p>
                )}
              </article>

              {/* El anillo muestra qué parte del catálogo está disponible. */}
              <article className="dashboard-card dashboard-availability">
                <div className="dashboard-panel-heading">
                  <div>
                    <h2>Disponibilidad</h2>
                    <p>Estado actual del catálogo.</p>
                  </div>
                </div>
                {loading ? (
                  <p className="dashboard-empty">Cargando disponibilidad...</p>
                ) : (
                  <>
                    <div className="dashboard-availability-chart">
                      <div
                        className="dashboard-donut"
                        role="img"
                        aria-label={`${availabilityPercent}% de las propiedades están disponibles`}
                        style={{
                          "--availability": `${availabilityPercent}%`,
                        }}
                      >
                        <div className="dashboard-donut-center">
                          <strong>{availabilityPercent}%</strong>
                          <span>disponibles</span>
                        </div>
                      </div>
                      <div className="dashboard-availability-legend">
                        <div>
                          <span className="dashboard-legend-dot dashboard-legend-available" />
                          <span>Disponibles</span>
                          <strong>{availableCount}</strong>
                        </div>
                        <div>
                          <span className="dashboard-legend-dot dashboard-legend-unavailable" />
                          <span>No disponibles</span>
                          <strong>{unavailableCount}</strong>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <Link
                  className="dashboard-text-link"
                  to="/admin/panelPropiedades"
                >
                  Ir al panel de propiedades <ArrowUpRight size={16} />
                </Link>
              </article>
            </section>

            {/* Muestra hasta cuatro propiedades marcadas como destacadas. */}
            <section className="dashboard-card dashboard-featured">
              <div className="dashboard-panel-heading">
                <div>
                  <h2>Propiedades destacadas</h2>
                  <p>Inmuebles seleccionados para tener mayor visibilidad.</p>
                </div>
                <Link
                  className="dashboard-text-link"
                  to="/admin/panelPropiedades"
                >
                  Ver todas <ArrowUpRight size={16} />
                </Link>
              </div>

              {/* Mientras carga, muestra un mensaje; si no hay destacadas, lo indica. */}
              {loading ? (
                <p className="dashboard-empty">Cargando propiedades...</p>
              ) : featuredProperties.length ? (
                <div className="dashboard-featured-list">
                  {featuredProperties.slice(0, 4).map((property) => (
                    <article
                      className="dashboard-property"
                      key={property.id}
                    >
                      <img
                        src={property.imagen}
                        alt=""
                        loading="lazy"
                      />
                      <div className="dashboard-property-info">
                        <h3>{property.titulo}</h3>
                        <span>
                          {property.tipo} · {property.ubicacion}
                        </span>
                      </div>
                      <span className="dashboard-property-operation">
                        {property.operacion}
                      </span>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="dashboard-empty">
                  Todavía no hay propiedades destacadas.
                </p>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
