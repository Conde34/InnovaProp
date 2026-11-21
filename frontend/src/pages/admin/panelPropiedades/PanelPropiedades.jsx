import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Building2,
  CircleDollarSign,
  House,
  KeyRound,
  MapPin,
  Pencil,
  Plus,
  Save,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  actualizarCasa,
  crearCasa,
  eliminarCasa,
  getCasas,
} from "../../../data/properties";
import {
  actualizarPropiedad,
  crearPropiedad,
  eliminarPropiedad,
} from "../../../services/propiedadesService";
import "./PanelPropiedades.css";

const IMAGEN_PREDETERMINADA =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c";

const FORMULARIO_VACIO = {
  titulo: "",
  tipo: "Casa",
  operacion: "Venta",
  estado: "Disponible",
  precio: "",
  moneda: "USD",
  ubicacion: "Yerba Buena, Tucumán",
  direccion: "",
  ambientes: "0",
  dormitorios: "0",
  banos: "0",
  superficie: "",
  imagen: "",
  descripcion: "",
  destacado: false,
};

const TIPOS = ["Casa", "Departamento", "Terreno", "Local"];
const UBICACIONES = [
  "Yerba Buena, Tucumán",
  "San Miguel de Tucumán",
  "Tafí Viejo, Tucumán",
  "Barrio Norte, Tucumán",
  "Banda del Río Salí, Tucumán",
  "El Manantial, Tucumán",
  "Lules, Tucumán",
];

function formatearPrecio(precio, moneda) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: moneda || "USD",
    maximumFractionDigits: 0,
  }).format(Number(precio) || 0);
}

function crearFormulario(property) {
  if (!property) return { ...FORMULARIO_VACIO };

  return {
    ...FORMULARIO_VACIO,
    ...property,
    estado: property.estado ?? (property.disponible === false ? "Reservada" : "Disponible"),
    precio: String(property.precio ?? ""),
    ambientes: String(property.ambientes ?? 0),
    dormitorios: String(property.dormitorios ?? 0),
    banos: String(property.banos ?? 0),
    superficie: String(property.superficie ?? ""),
  };
}

const PanelPropiedades = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [formulario, setFormulario] = useState(FORMULARIO_VACIO);
  const [propiedadEditada, setPropiedadEditada] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    getCasas()
      .then((casas) => {
        if (activo) setPropiedades(casas);
      })
      .catch((loadError) => {
        if (activo) setError(loadError.message || "No se pudieron cargar las propiedades.");
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => {
      activo = false;
    };
  }, []);

  const termino = busqueda.trim().toLocaleLowerCase("es");
  const propiedadesVisibles = useMemo(
    () =>
      propiedades.filter((property) =>
        [
          property.titulo,
          property.tipo,
          property.operacion,
          property.ubicacion,
          property.direccion,
        ]
          .filter(Boolean)
          .join(" ")
          .toLocaleLowerCase("es")
          .includes(termino),
      ),
    [propiedades, termino],
  );

  const cantidadVenta = propiedades.filter(
    (property) => property.operacion === "Venta",
  ).length;
  const cantidadAlquiler = propiedades.filter(
    (property) => property.operacion === "Alquiler",
  ).length;

  const limpiarFormulario = () => {
    setFormulario({ ...FORMULARIO_VACIO });
    setPropiedadEditada(null);
    setMostrarFormulario(false);
  };

  const abrirFormulario = (property = null) => {
    setError("");
    setMensaje("");
    setPropiedadEditada(property?.id ?? null);
    setFormulario(crearFormulario(property));
    setMostrarFormulario(true);
  };

  const manejarCambio = (event) => {
    const { name, value, checked, type } = event.target;
    setFormulario((actual) => ({
      ...actual,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const guardarPropiedad = async (event) => {
    event.preventDefault();
    setGuardando(true);
    setError("");
    setMensaje("");

    const datos = {
      ...formulario,
      titulo: formulario.titulo.trim(),
      direccion: formulario.direccion.trim(),
      descripcion: formulario.descripcion.trim(),
      precio: Number(formulario.precio),
      ambientes: Number(formulario.ambientes) || 0,
      dormitorios: Number(formulario.dormitorios) || 0,
      banos: Number(formulario.banos) || 0,
      superficie: Number(formulario.superficie) || 0,
      imagen: formulario.imagen.trim() || IMAGEN_PREDETERMINADA,
      estado: formulario.estado,
      disponible: formulario.estado === "Disponible",
    };

    try {
      const datosApi = { ...datos };
      delete datosApi.id;
      delete datosApi.disponible;

      let actualizadas;
      if (propiedadEditada === null) {
        const creada = await crearPropiedad(datosApi);
        const nuevaPropiedad = { ...datos, id: creada.id };
        try {
          actualizadas = await crearCasa(nuevaPropiedad, propiedades);
        } catch (cacheError) {
          setPropiedades((actuales) => [...actuales, nuevaPropiedad]);
          setMensaje("La propiedad se guardó en la base de datos.");
          setError(`No se pudo actualizar el caché local: ${cacheError.message}`);
          limpiarFormulario();
          return;
        }
      } else {
        await actualizarPropiedad(propiedadEditada, datosApi);
        try {
          actualizadas = await actualizarCasa(propiedadEditada, datos);
        } catch (cacheError) {
          const propiedadActualizada = { ...datos, id: propiedadEditada };
          setPropiedades((actuales) =>
            actuales.map((property) =>
              String(property.id) === String(propiedadEditada)
                ? propiedadActualizada
                : property,
            ),
          );
          setMensaje("La propiedad se actualizó en la base de datos.");
          setError(`No se pudo actualizar el caché local: ${cacheError.message}`);
          limpiarFormulario();
          return;
        }
      }

      setPropiedades(actualizadas);
      setMensaje(
        propiedadEditada === null
          ? "La propiedad se agregó correctamente."
          : "Los cambios se guardaron correctamente.",
      );
      limpiarFormulario();
    } catch (saveError) {
      setError(saveError.message || "No se pudo guardar la propiedad.");
    } finally {
      setGuardando(false);
    }
  };

  const borrarPropiedad = async (property) => {
    if (!window.confirm(`¿Querés eliminar “${property.titulo}”?`)) return;

    setError("");
    setMensaje("");
    try {
      const resultado = await eliminarPropiedad(property.id);
      let actualizadas;
      try {
        actualizadas = await eliminarCasa(property.id);
      } catch (cacheError) {
        setPropiedades((actuales) =>
          actuales.filter((actual) => String(actual.id) !== String(property.id)),
        );
        if (propiedadEditada === property.id) limpiarFormulario();
        setMensaje(resultado.message || "La propiedad se eliminó de la base de datos.");
        setError(`No se pudo actualizar el caché local: ${cacheError.message}`);
        return;
      }

      setPropiedades(actualizadas);
      if (propiedadEditada === property.id) limpiarFormulario();
      setMensaje(resultado.message || "La propiedad se eliminó correctamente.");
    } catch (deleteError) {
      setError(deleteError.message || "No se pudo eliminar la propiedad.");
    }
  };

  return (
    <main className="properties-admin-page">
      <div className="properties-admin-shell">
        <header className="properties-admin-heading">
          <div>
            <span className="properties-admin-eyebrow">
              INNOVAPROP <span>/</span> ADMINISTRACIÓN
            </span>
            <h1>Propiedades</h1>
            <p>Administrá el catálogo inmobiliario desde un solo lugar.</p>
          </div>
          <Link className="properties-admin-link" to="/admin/panelUsuarios">
            Panel de usuarios <ArrowUpRight size={17} />
          </Link>
        </header>

        <section className="properties-admin-stats" aria-label="Resumen de propiedades">
          <article className="properties-admin-stat">
            <span className="properties-admin-stat-icon properties-stat-orange">
              <Building2 size={20} />
            </span>
            <div>
              <span>En catálogo</span>
              <strong>{cargando ? "—" : propiedades.length}</strong>
            </div>
          </article>
          <article className="properties-admin-stat">
            <span className="properties-admin-stat-icon properties-stat-blue">
              <CircleDollarSign size={20} />
            </span>
            <div>
              <span>En venta</span>
              <strong>{cargando ? "—" : cantidadVenta}</strong>
            </div>
          </article>
          <article className="properties-admin-stat">
            <span className="properties-admin-stat-icon properties-stat-green">
              <KeyRound size={20} />
            </span>
            <div>
              <span>En alquiler</span>
              <strong>{cargando ? "—" : cantidadAlquiler}</strong>
            </div>
          </article>
        </section>

        <section
          className={`properties-admin-inventory${propiedadEditada !== null ? " is-editing" : ""}`}
        >
          <div className="properties-admin-section-heading">
            <div>
              <h2>Inventario</h2>
              <p>Creá, editá o quitá publicaciones del catálogo.</p>
            </div>
            <button
              className="properties-admin-add"
              type="button"
              onClick={() =>
                mostrarFormulario ? limpiarFormulario() : abrirFormulario()
              }
            >
              {mostrarFormulario ? <X size={17} /> : <Plus size={18} />}
              {mostrarFormulario ? "Cerrar" : "Nueva propiedad"}
            </button>
          </div>

          {mensaje && (
            <p className="properties-admin-feedback is-success" role="status">
              {mensaje}
            </p>
          )}
          {error && (
            <p className="properties-admin-feedback is-error" role="alert">
              {error}
            </p>
          )}

          {mostrarFormulario && propiedadEditada !== null && (
            <button
              className="properties-admin-edit-backdrop"
              type="button"
              onClick={limpiarFormulario}
              disabled={guardando}
              aria-label="Cerrar formulario de edición"
            />
          )}

          {mostrarFormulario && (
            <form
              className={`properties-admin-form${propiedadEditada !== null ? " is-editing" : ""}`}
              onSubmit={guardarPropiedad}
              role={propiedadEditada !== null ? "dialog" : undefined}
              aria-modal={propiedadEditada !== null ? "true" : undefined}
              aria-labelledby={propiedadEditada !== null ? "properties-admin-form-title" : undefined}
            >
              <div className="properties-admin-form-heading">
                <div>
                  <span>{propiedadEditada === null ? "NUEVA PUBLICACIÓN" : "EDITAR PUBLICACIÓN"}</span>
                  <h3 id="properties-admin-form-title">
                    {propiedadEditada === null ? "Datos de la propiedad" : "Modificar propiedad"}
                  </h3>
                </div>
                <button
                  className="properties-admin-icon-button"
                  type="button"
                  onClick={limpiarFormulario}
                  aria-label="Cerrar formulario"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="properties-admin-form-grid">
                <label className="properties-admin-field properties-admin-field-wide">
                  <span>Nombre de la propiedad</span>
                  <input
                    name="titulo"
                    value={formulario.titulo}
                    onChange={manejarCambio}
                    maxLength={150}
                    placeholder="Ej. Casa moderna en zona norte"
                    required
                  />
                </label>

                <label className="properties-admin-field">
                  <span>Tipo</span>
                  <select name="tipo" value={formulario.tipo} onChange={manejarCambio}>
                    {TIPOS.map((tipo) => <option key={tipo}>{tipo}</option>)}
                  </select>
                </label>

                <label className="properties-admin-field">
                  <span>Operación</span>
                  <select
                    name="operacion"
                    value={formulario.operacion}
                    onChange={manejarCambio}
                  >
                    <option value="Venta">Venta</option>
                    <option value="Alquiler">Alquiler</option>
                  </select>
                </label>

                <label className="properties-admin-field">
                  <span>Estado</span>
                  <select
                    name="estado"
                    value={formulario.estado}
                    onChange={manejarCambio}
                  >
                    <option value="Disponible">Disponible</option>
                    <option value="Reservada">Reservada</option>
                    <option value="Vendida">Vendida</option>
                    <option value="Alquilada">Alquilada</option>
                  </select>
                </label>

                <label className="properties-admin-field">
                  <span>Precio</span>
                  <input
                    name="precio"
                    type="number"
                    min="0"
                    step="1"
                    value={formulario.precio}
                    onChange={manejarCambio}
                    placeholder="125000"
                    required
                  />
                </label>

                <label className="properties-admin-field">
                  <span>Moneda</span>
                  <select name="moneda" value={formulario.moneda} onChange={manejarCambio}>
                    <option value="USD">USD</option>
                    <option value="ARS">ARS</option>
                  </select>
                </label>

                <label className="properties-admin-field">
                  <span>Ubicación</span>
                  <select
                    name="ubicacion"
                    value={formulario.ubicacion}
                    onChange={manejarCambio}
                  >
                    {UBICACIONES.map((ubicacion) => (
                      <option key={ubicacion} value={ubicacion}>{ubicacion}</option>
                    ))}
                  </select>
                </label>

                <label className="properties-admin-field">
                  <span>Dirección</span>
                  <input
                    name="direccion"
                    value={formulario.direccion}
                    onChange={manejarCambio}
                    maxLength={150}
                    placeholder="Calle y altura"
                    required
                  />
                </label>

                <label className="properties-admin-field properties-admin-field-wide">
                  <span>URL de imagen <small>(opcional)</small></span>
                  <input
                    name="imagen"
                    type="url"
                    value={formulario.imagen}
                    onChange={manejarCambio}
                    placeholder="https://..."
                  />
                </label>

                <label className="properties-admin-field properties-admin-field-wide">
                  <span>Descripción</span>
                  <textarea
                    name="descripcion"
                    value={formulario.descripcion}
                    onChange={manejarCambio}
                    rows="3"
                    maxLength={1000}
                    placeholder="Contá brevemente qué hace especial a esta propiedad."
                  />
                </label>

                <div className="properties-admin-number-fields properties-admin-field-wide">
                  <label className="properties-admin-field">
                    <span>Ambientes</span>
                    <input
                      name="ambientes"
                      type="number"
                      min="0"
                      value={formulario.ambientes}
                      onChange={manejarCambio}
                    />
                  </label>
                  <label className="properties-admin-field">
                    <span>Dormitorios</span>
                    <input
                      name="dormitorios"
                      type="number"
                      min="0"
                      value={formulario.dormitorios}
                      onChange={manejarCambio}
                    />
                  </label>
                  <label className="properties-admin-field">
                    <span>Baños</span>
                    <input
                      name="banos"
                      type="number"
                      min="0"
                      value={formulario.banos}
                      onChange={manejarCambio}
                    />
                  </label>
                  <label className="properties-admin-field">
                    <span>Superficie (m²)</span>
                    <input
                      name="superficie"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formulario.superficie}
                      onChange={manejarCambio}
                    />
                  </label>
                </div>

                <label className="properties-admin-checkbox properties-admin-field-wide">
                  <input
                    name="destacado"
                    type="checkbox"
                    checked={Boolean(formulario.destacado)}
                    onChange={manejarCambio}
                  />
                  <span>
                    <Sparkles size={16} />
                    Marcar como propiedad destacada
                  </span>
                </label>
              </div>

              <div className="properties-admin-form-actions">
                <button
                  className="properties-admin-cancel"
                  type="button"
                  onClick={limpiarFormulario}
                  disabled={guardando}
                >
                  Cancelar
                </button>
                <button
                  className="properties-admin-save"
                  type="submit"
                  disabled={guardando}
                >
                  <Save size={16} />
                  {guardando
                    ? "Guardando..."
                    : propiedadEditada === null
                      ? "Guardar propiedad"
                      : "Guardar cambios"}
                </button>
              </div>
            </form>
          )}

          <div className="properties-admin-toolbar">
            <label className="properties-admin-search">
              <Search size={18} aria-hidden="true" />
              <input
                type="search"
                value={busqueda}
                onChange={(event) => setBusqueda(event.target.value)}
                placeholder="Buscar por nombre, tipo o ubicación"
                aria-label="Buscar propiedades"
              />
            </label>
            <span className="properties-admin-count">
              {propiedadesVisibles.length}{" "}
              {propiedadesVisibles.length === 1 ? "propiedad" : "propiedades"}
            </span>
          </div>

          {cargando ? (
            <div className="properties-admin-empty" role="status">
              <span className="properties-admin-loader" />
              Cargando propiedades...
            </div>
          ) : propiedadesVisibles.length ? (
            <div className="properties-admin-grid">
              {propiedadesVisibles.map((property) => (
                <article className="properties-admin-card" key={property.id}>
                  <div className="properties-admin-image">
                    <img
                      src={property.imagen || IMAGEN_PREDETERMINADA}
                      alt=""
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = IMAGEN_PREDETERMINADA;
                      }}
                    />
                    <span className="properties-admin-operation">
                      {property.operacion}
                    </span>
                    {property.destacado && (
                      <span className="properties-admin-featured">
                        <Sparkles size={13} /> Destacada
                      </span>
                    )}
                  </div>
                  <div className="properties-admin-card-body">
                    <span className="properties-admin-type">
                      <House size={14} /> {property.tipo}
                    </span>
                    <h3>{property.titulo}</h3>
                    <p className="properties-admin-location">
                      <MapPin size={15} />
                      <span>{property.ubicacion}</span>
                    </p>
                    <strong className="properties-admin-price">
                      {formatearPrecio(property.precio, property.moneda)}
                    </strong>
                    <div className="properties-admin-card-actions">
                      <button
                        className="properties-admin-edit"
                        type="button"
                        onClick={() => abrirFormulario(property)}
                      >
                        <Pencil size={15} /> Editar
                      </button>
                      <button
                        className="properties-admin-delete"
                        type="button"
                        onClick={() => borrarPropiedad(property)}
                        aria-label={`Eliminar ${property.titulo}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="properties-admin-empty">
              <span className="properties-admin-empty-icon"><Building2 size={22} /></span>
              <strong>
                {propiedades.length ? "No encontramos propiedades" : "Todavía no hay propiedades"}
              </strong>
              <span>
                {propiedades.length
                  ? "Probá con otro término de búsqueda."
                  : "Agregá la primera publicación para empezar el catálogo."}
              </span>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default PanelPropiedades;
