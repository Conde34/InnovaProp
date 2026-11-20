import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Building2,
  House,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import Cards from "../../../components/Cards";
import useAuthStore from "../../../store/useAuthStore";
import {
  agregarFavorito,
  listarFavoritos,
  quitarFavorito,
} from "../../../services/favoritosService";
import { listarPropiedades } from "../../../services/propiedadesService";
import "./Propiedades.css";

const PROPIEDADES_POR_PAGINA = 6;

const Propiedades = () => {
  const user = useAuthStore((state) => state.user);
  const [propiedades, setPropiedades] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const [operacionSeleccionada, setOperacionSeleccionada] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favoritosIds, setFavoritosIds] = useState([]);
  const [favoritosCargando, setFavoritosCargando] = useState(false);
  const [favoritoEnProceso, setFavoritoEnProceso] = useState([]);
  const [errorFavoritos, setErrorFavoritos] = useState("");

  useEffect(() => {
    let active = true;

    listarPropiedades()
      .then((casas) => {
        if (!active) return;
        setPropiedades(casas);
      })
      .catch((loadError) => {
        console.error(loadError);
        if (active) setError("No se pudieron cargar las propiedades.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    if (user?.rol !== "cliente") {
      setFavoritosIds([]);
      setFavoritosCargando(false);
      setErrorFavoritos("");
      return () => {
        active = false;
      };
    }

    setFavoritosCargando(true);
    listarFavoritos()
      .then((favoritos) => {
        if (!Array.isArray(favoritos)) {
          throw new Error("La respuesta de favoritos no tiene el formato esperado.");
        }
        if (active) setFavoritosIds(favoritos.map((favorito) => String(favorito.id)));
      })
      .catch((favoriteError) => {
        if (active) {
          setErrorFavoritos(
            favoriteError.message || "No se pudieron cargar tus favoritos.",
          );
        }
      })
      .finally(() => {
        if (active) setFavoritosCargando(false);
      });

    return () => {
      active = false;
    };
  }, [user?.rol]);

  const tipos = [...new Set(propiedades.map((propiedad) => propiedad.tipo))]
    .filter(Boolean)
    .sort((primero, segundo) => primero.localeCompare(segundo, "es"));

  const termino = busqueda.trim().toLocaleLowerCase("es");
  const propiedadesFiltradas = propiedades.filter((propiedad) => {
    const textoPropiedad = [
      propiedad.titulo,
      propiedad.tipo,
      propiedad.ubicacion,
      propiedad.descripcion,
    ]
      .filter(Boolean)
      .join(" ")
      .toLocaleLowerCase("es");

    return (
      (!termino || textoPropiedad.includes(termino)) &&
      (!tipoSeleccionado || propiedad.tipo === tipoSeleccionado) &&
      (!operacionSeleccionada ||
        propiedad.operacion === operacionSeleccionada)
    );
  });

  const totalPaginas = Math.ceil(
    propiedadesFiltradas.length / PROPIEDADES_POR_PAGINA,
  );
  const paginasMostradas = Math.max(totalPaginas, 1);
  const propiedadesVisibles = propiedadesFiltradas.slice(
    (paginaActual - 1) * PROPIEDADES_POR_PAGINA,
    paginaActual * PROPIEDADES_POR_PAGINA,
  );
  const ventasCount = propiedades.filter(
    (propiedad) => propiedad.operacion === "Venta",
  ).length;
  const alquileresCount = propiedades.filter(
    (propiedad) => propiedad.operacion === "Alquiler",
  ).length;
  const hayFiltros = Boolean(
    busqueda || tipoSeleccionado || operacionSeleccionada,
  );

  const limpiarFiltros = () => {
    setBusqueda("");
    setTipoSeleccionado("");
    setOperacionSeleccionada("");
    setPaginaActual(1);
  };

  const alternarFavorito = async (id) => {
    const idTexto = String(id);
    const yaEsFavorito = favoritosIds.includes(idTexto);
    setFavoritoEnProceso((actuales) => [...actuales, idTexto]);
    setErrorFavoritos("");

    try {
      if (yaEsFavorito) {
        await quitarFavorito(id);
        setFavoritosIds((actuales) => actuales.filter((actual) => actual !== idTexto));
      } else {
        await agregarFavorito(id);
        setFavoritosIds((actuales) =>
          actuales.includes(idTexto) ? actuales : [...actuales, idTexto],
        );
      }
    } catch (favoriteError) {
      setErrorFavoritos(
        favoriteError.message || "No se pudo actualizar tu lista de favoritos.",
      );
    } finally {
      setFavoritoEnProceso((actuales) =>
        actuales.filter((actual) => actual !== idTexto),
      );
    }
  };

  return (
    <main className="properties-page">
      <div className="properties-shell">
        <section className="properties-hero">
          <div className="properties-hero-copy">
            <span className="properties-eyebrow">
              <Sparkles size={14} />
              INNOVAPROP <span>/</span> PROPIEDADES
            </span>
            <h1>
              Encontrá el lugar
              <span>que se siente como tuyo.</span>
            </h1>
            <p>
              Casas, departamentos y espacios únicos en Tucumán. Explorá con
              calma; tu próximo capítulo puede empezar acá.
            </p>
            <div className="properties-hero-actions">
              <a className="properties-primary-link" href="#catalogo">
                Explorar propiedades <ArrowDown size={17} />
              </a>
              <Link className="properties-secondary-link" to="/contacto">
                Hablemos de lo que buscás
              </Link>
            </div>
          </div>

          <aside className="properties-hero-card">
            <div className="properties-hero-card-icon">
              <House size={22} />
            </div>
            <span className="properties-hero-card-label">TU PRÓXIMO HOGAR</span>
            <h2>Un buen lugar cambia todo.</h2>
            <p>
              Te acompañamos para encontrar una propiedad que encaje con tu
              vida y tus planes.
            </p>
            <div className="properties-hero-card-location">
              <MapPin size={16} />
              Tucumán, Argentina
            </div>
          </aside>

          <div className="properties-hero-decoration" aria-hidden="true" />
        </section>

        <section className="properties-summary" aria-label="Resumen del catálogo">
          <div className="properties-summary-item">
            <span className="properties-summary-icon">
              <Building2 size={18} />
            </span>
            <div>
              <strong>{loading ? "—" : propiedades.length}</strong>
              <span>propiedades en catálogo</span>
            </div>
          </div>
          <div className="properties-summary-divider" />
          <div className="properties-summary-item">
            <span className="properties-summary-dot properties-dot-sale" />
            <div>
              <strong>{loading ? "—" : ventasCount}</strong>
              <span>en venta</span>
            </div>
          </div>
          <div className="properties-summary-divider" />
          <div className="properties-summary-item">
            <span className="properties-summary-dot properties-dot-rent" />
            <div>
              <strong>{loading ? "—" : alquileresCount}</strong>
              <span>en alquiler</span>
            </div>
          </div>
        </section>

        <section className="properties-catalog" id="catalogo">
          <header className="properties-section-heading">
            <div>
              <span className="properties-section-kicker">ENCONTRÁ TU LUGAR</span>
              <h2>Propiedades para vos</h2>
              <p>Elegí los filtros y descubrí opciones que van con tus planes.</p>
            </div>
            <span className="properties-result-count">
              {loading ? "Cargando..." : `${propiedadesFiltradas.length} opciones`}
            </span>
          </header>

          <div className="properties-filters">
            <label className="properties-search">
              <Search size={19} aria-hidden="true" />
              <input
                type="search"
                placeholder="Buscar por nombre o ubicación"
                value={busqueda}
                onChange={(event) => {
                  setBusqueda(event.target.value);
                  setPaginaActual(1);
                }}
                aria-label="Buscar propiedades por nombre o ubicación"
              />
            </label>

            <label className="properties-select">
              <span>Tipo</span>
              <select
                value={tipoSeleccionado}
                onChange={(event) => {
                  setTipoSeleccionado(event.target.value);
                  setPaginaActual(1);
                }}
                aria-label="Filtrar por tipo de propiedad"
              >
                <option value="">Todos los tipos</option>
                {tipos.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </label>

            <label className="properties-select">
              <span>Operación</span>
              <select
                value={operacionSeleccionada}
                onChange={(event) => {
                  setOperacionSeleccionada(event.target.value);
                  setPaginaActual(1);
                }}
                aria-label="Filtrar por operación"
              >
                <option value="">Venta y alquiler</option>
                <option value="Venta">Venta</option>
                <option value="Alquiler">Alquiler</option>
              </select>
            </label>

            {hayFiltros && (
              <button
                className="properties-clear-filters"
                type="button"
                onClick={limpiarFiltros}
              >
                Limpiar
              </button>
            )}
          </div>

          {errorFavoritos && (
            <div className="properties-feedback properties-error" role="alert">
              {errorFavoritos}
            </div>
          )}

          {error ? (
            <div className="properties-feedback properties-error" role="alert">
              <span>{error}</span>
              <Link to="/contacto">Contactar con nosotros</Link>
            </div>
          ) : loading ? (
            <div className="properties-feedback" role="status">
              <span className="properties-loader" />
              <span>Estamos preparando las propiedades para vos...</span>
            </div>
          ) : propiedadesVisibles.length > 0 ? (
            <>
              <div className="properties-grid">
                {propiedadesVisibles.map((propiedad) => (
                  <div
                    className="properties-grid-item"
                    key={propiedad.id}
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
                      favorito={favoritosIds.includes(String(propiedad.id))}
                      favoritoEnProceso={
                        favoritosCargando ||
                        favoritoEnProceso.includes(String(propiedad.id))
                      }
                      onAlternarFavorito={
                        user?.rol === "cliente"
                          ? () => alternarFavorito(propiedad.id)
                          : undefined
                      }
                    />
                  </div>
                ))}
              </div>

              {totalPaginas > 1 && (
                <nav className="pagination-container" aria-label="Paginación">
                  <button
                    className="pagination-btn"
                    type="button"
                    onClick={() => setPaginaActual(paginaActual - 1)}
                    disabled={paginaActual === 1}
                  >
                    <ArrowLeft size={17} />
                    Anterior
                  </button>
                  <span className="pagination-info">
                    Página <strong>{paginaActual}</strong> de {paginasMostradas}
                  </span>
                  <button
                    className="pagination-btn"
                    type="button"
                    onClick={() => setPaginaActual(paginaActual + 1)}
                    disabled={paginaActual === totalPaginas}
                  >
                    Siguiente
                    <ArrowRight size={17} />
                  </button>
                </nav>
              )}
            </>
          ) : (
            <div className="properties-empty">
              <span className="properties-empty-icon">
                <Search size={25} />
              </span>
              <h3>No encontramos propiedades con esos filtros</h3>
              <p>Probá con otra búsqueda o quitá alguno de los filtros.</p>
              {hayFiltros && (
                <button
                  className="properties-primary-link"
                  type="button"
                  onClick={limpiarFiltros}
                >
                  Ver todas las propiedades
                </button>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Propiedades;
