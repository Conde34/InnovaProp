import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Pencil,
  Save,
  Search,
  ShieldCheck,
  Trash2,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  actualizarUsuario,
  eliminarUsuario,
  listarUsuarios,
} from "../../../services/usuariosService";
import "./PanelUsuario.css";

const etiquetasRol = {
  admin: "Administrador",
  agente: "Agente",
  cliente: "Cliente",
};

const FORMULARIO_VACIO = {
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  rol: "cliente",
  activo: true,
  password: "",
};

const PanelUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [rolSeleccionado, setRolSeleccionado] = useState("todos");
  const [usuarioEditado, setUsuarioEditado] = useState(null);
  const [formulario, setFormulario] = useState({ ...FORMULARIO_VACIO });
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    listarUsuarios()
      .then((lista) => {
        if (!Array.isArray(lista)) {
          throw new Error("La respuesta de usuarios no tiene el formato esperado.");
        }
        if (activo) {
          setUsuarios(lista.map((usuario) => ({
            ...usuario,
            activo: Boolean(usuario.activo),
          })));
        }
      })
      .catch((loadError) => {
        if (activo) setError(loadError.message || "No se pudieron cargar los usuarios.");
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => {
      activo = false;
    };
  }, []);

  const termino = busqueda.trim().toLocaleLowerCase("es");
  const usuariosVisibles = useMemo(
    () =>
      usuarios.filter((usuario) => {
        const coincideTexto =
          !termino ||
          `${usuario.nombre} ${usuario.apellido} ${usuario.email}`
            .toLocaleLowerCase("es")
            .includes(termino);
        const coincideRol =
          rolSeleccionado === "todos" || usuario.rol === rolSeleccionado;

        return coincideTexto && coincideRol;
      }),
    [usuarios, termino, rolSeleccionado],
  );

  const cantidadClientes = usuarios.filter(
    (usuario) => usuario.rol === "cliente",
  ).length;
  const cantidadAgentes = usuarios.filter(
    (usuario) => usuario.rol === "agente",
  ).length;

  const abrirEdicion = (usuario) => {
    setError("");
    setMensaje("");
    setUsuarioEditado(usuario.id_usuario);
    setFormulario({
      nombre: usuario.nombre || "",
      apellido: usuario.apellido || "",
      email: usuario.email || "",
      telefono: usuario.telefono ?? "",
      rol: usuario.rol,
      activo: Boolean(usuario.activo),
      password: "",
    });
  };

  const cerrarEdicion = () => {
    setUsuarioEditado(null);
    setFormulario({ ...FORMULARIO_VACIO });
    setError("");
  };

  const manejarCambio = (event) => {
    const { name, value } = event.target;
    setFormulario((actual) => ({
      ...actual,
      [name]: name === "activo" ? value === "true" : value,
    }));
  };

  const guardarUsuario = async (event) => {
    event.preventDefault();
    setGuardando(true);
    setError("");
    setMensaje("");

    const datos = {
      nombre: formulario.nombre.trim(),
      apellido: formulario.apellido.trim(),
      email: formulario.email.trim(),
      telefono: formulario.telefono.trim() || null,
      rol: formulario.rol,
      activo: formulario.activo,
    };
    if (formulario.password !== "") datos.password = formulario.password;

    try {
      const resultado = await actualizarUsuario(usuarioEditado, datos);
      const usuarioActualizado = {
        ...resultado.usuario,
        activo: Boolean(resultado.usuario.activo),
      };
      setUsuarios((actuales) =>
        actuales.map((usuario) =>
          usuario.id_usuario === usuarioEditado ? usuarioActualizado : usuario,
        ),
      );
      setMensaje(resultado.message);
      cerrarEdicion();
    } catch (saveError) {
      setError(saveError.message || "No se pudo actualizar el usuario.");
    } finally {
      setGuardando(false);
    }
  };

  const darDeBajaUsuario = async (usuario) => {
    if (!window.confirm(`¿Querés dar de baja la cuenta de ${usuario.nombre} ${usuario.apellido}?`)) {
      return;
    }

    setError("");
    setMensaje("");
    try {
      const resultado = await eliminarUsuario(usuario.id_usuario);
      setUsuarios((actuales) =>
        actuales.map((actual) =>
          actual.id_usuario === usuario.id_usuario
            ? { ...actual, activo: false }
            : actual,
        ),
      );
      setMensaje(resultado.message);
    } catch (deleteError) {
      setError(deleteError.message || "No se pudo dar de baja al usuario.");
    }
  };

  return (
    <main className="users-panel-page">
      <div className="users-panel-shell">
        <header className="users-panel-heading">
          <div>
            <span className="users-panel-eyebrow">
              INNOVAPROP <span>/</span> ADMINISTRACIÓN
            </span>
            <h1>Usuarios</h1>
            <p>Consultá y organizá las cuentas registradas en la plataforma.</p>
          </div>
          <Link className="users-panel-link" to="/admin/panelPropiedades">
            Panel de propiedades <ArrowUpRight size={17} />
          </Link>
        </header>

        <section className="users-panel-stats" aria-label="Resumen de usuarios">
          <article className="users-stat-card">
            <span className="users-stat-icon users-stat-icon-orange">
              <UsersRound size={20} />
            </span>
            <div>
              <span>Usuarios</span>
              <strong>{usuarios.length}</strong>
            </div>
          </article>
          <article className="users-stat-card">
            <span className="users-stat-icon users-stat-icon-blue">
              <UserRound size={20} />
            </span>
            <div>
              <span>Clientes</span>
              <strong>{cantidadClientes}</strong>
            </div>
          </article>
          <article className="users-stat-card">
            <span className="users-stat-icon users-stat-icon-green">
              <ShieldCheck size={20} />
            </span>
            <div>
              <span>Agentes</span>
              <strong>{cantidadAgentes}</strong>
            </div>
          </article>
        </section>

        <section
          className={`users-panel-list${usuarioEditado !== null ? " is-editing" : ""}`}
        >
          <div className="users-list-heading">
            <div>
              <h2>Directorio de usuarios</h2>
              <p>Administrá roles y estados de las cuentas registradas.</p>
            </div>
            <span className="users-list-count">
              {usuariosVisibles.length}{" "}
              {usuariosVisibles.length === 1 ? "cuenta" : "cuentas"}
            </span>
          </div>

          <div className="users-toolbar">
            <label className="users-search">
              <Search size={18} aria-hidden="true" />
              <input
                type="search"
                value={busqueda}
                onChange={(event) => {
                  setBusqueda(event.target.value);
                  setMensaje("");
                  setError("");
                }}
                placeholder="Buscar por nombre o correo"
                aria-label="Buscar usuarios por nombre o correo"
              />
            </label>

            <label className="users-role-filter">
              <span>Rol</span>
              <select
                value={rolSeleccionado}
                onChange={(event) => {
                  setRolSeleccionado(event.target.value);
                  setMensaje("");
                  setError("");
                }}
                aria-label="Filtrar usuarios por rol"
              >
                <option value="todos">Todos los roles</option>
                <option value="cliente">Clientes</option>
                <option value="agente">Agentes</option>
                <option value="admin">Administradores</option>
              </select>
            </label>
          </div>

          {mensaje && (
            <p className="users-feedback users-feedback-success" role="status">
              {mensaje}
            </p>
          )}
          {error && usuarioEditado === null && (
            <p className="users-feedback users-feedback-error" role="alert">
              {error}
            </p>
          )}

          {usuarioEditado !== null && (
            <button
              className="users-edit-backdrop"
              type="button"
              onClick={cerrarEdicion}
              disabled={guardando}
              aria-label="Cerrar edición de usuario"
            />
          )}

          {usuarioEditado !== null && (
            <form
              className="users-edit-dialog"
              onSubmit={guardarUsuario}
              role="dialog"
              aria-modal="true"
              aria-labelledby="users-edit-title"
            >
              <div className="users-edit-heading">
                <div>
                  <span>ADMINISTRACIÓN</span>
                  <h3 id="users-edit-title">Editar usuario</h3>
                </div>
                <button
                  className="users-edit-close"
                  type="button"
                  onClick={cerrarEdicion}
                  disabled={guardando}
                  aria-label="Cerrar formulario"
                >
                  <X size={18} />
                </button>
              </div>

              {error && (
                <p className="users-feedback users-feedback-error" role="alert">
                  {error}
                </p>
              )}

              <div className="users-edit-grid">
                <label className="users-edit-field">
                  <span>Nombre</span>
                  <input
                    name="nombre"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    maxLength={60}
                    required
                  />
                </label>
                <label className="users-edit-field">
                  <span>Apellido</span>
                  <input
                    name="apellido"
                    value={formulario.apellido}
                    onChange={manejarCambio}
                    maxLength={60}
                    required
                  />
                </label>
                <label className="users-edit-field users-edit-field-wide">
                  <span>Email</span>
                  <input
                    name="email"
                    type="email"
                    value={formulario.email}
                    onChange={manejarCambio}
                    maxLength={120}
                    required
                  />
                </label>
                <label className="users-edit-field">
                  <span>Teléfono</span>
                  <input
                    name="telefono"
                    type="tel"
                    value={formulario.telefono}
                    onChange={manejarCambio}
                    maxLength={25}
                  />
                </label>
                <label className="users-edit-field">
                  <span>Rol</span>
                  <select name="rol" value={formulario.rol} onChange={manejarCambio}>
                    <option value="cliente">Cliente</option>
                    <option value="agente">Agente</option>
                    <option value="admin">Administrador</option>
                  </select>
                </label>
                <label className="users-edit-field">
                  <span>Estado de la cuenta</span>
                  <select
                    name="activo"
                    value={String(formulario.activo)}
                    onChange={manejarCambio}
                  >
                    <option value="true">Activa</option>
                    <option value="false">Inactiva</option>
                  </select>
                </label>
                <label className="users-edit-field users-edit-field-wide">
                  <span>Nueva contraseña (opcional)</span>
                  <input
                    name="password"
                    type="password"
                    value={formulario.password}
                    onChange={manejarCambio}
                    autoComplete="new-password"
                    minLength={8}
                  />
                  <small>Dejar vacío para no cambiarla.</small>
                </label>
              </div>

              <div className="users-edit-actions">
                <button
                  className="users-edit-cancel"
                  type="button"
                  onClick={cerrarEdicion}
                  disabled={guardando}
                >
                  Cancelar
                </button>
                <button className="users-edit-save" type="submit" disabled={guardando}>
                  <Save size={16} />
                  {guardando ? "Guardando..." : "Guardar cambios"}
                </button>
              </div>
            </form>
          )}

          <div className="users-list-header" aria-hidden="true">
            <span>Usuario</span>
            <span>Rol</span>
            <span>Cuenta</span>
            <span>Acciones</span>
          </div>

          {cargando ? (
            <div className="users-empty" role="status">
              Cargando usuarios...
            </div>
          ) : usuariosVisibles.length ? (
            <div className="users-list">
              {usuariosVisibles.map((usuario) => {
                const nombreCompleto = `${usuario.nombre} ${usuario.apellido}`.trim();
                const iniciales = nombreCompleto
                  .trim()
                  .split(/\s+/)
                  .slice(0, 2)
                  .map((parte) => parte[0])
                  .join("")
                  .toUpperCase();

                return (
                  <article className="users-list-row" key={usuario.id_usuario}>
                    <div className="users-identity">
                      <span className="users-avatar" aria-hidden="true">
                        {iniciales || "U"}
                      </span>
                      <div className="users-identity-copy">
                        <strong>{nombreCompleto}</strong>
                        <span>{usuario.email}</span>
                      </div>
                    </div>
                    <span
                      className={`users-role-badge users-role-${usuario.rol}`}
                    >
                      {etiquetasRol[usuario.rol] || "Usuario"}
                    </span>
                    <span
                      className={`users-account-type${usuario.activo ? "" : " is-inactive"}`}
                    >
                      {usuario.activo ? "Activa" : "Inactiva"}
                    </span>
                    <div className="users-row-actions">
                      <button
                        className="users-edit-button"
                        type="button"
                        onClick={() => abrirEdicion(usuario)}
                        aria-label={`Editar usuario ${nombreCompleto}`}
                      >
                        <Pencil size={15} />
                        <span>Editar</span>
                      </button>
                      <button
                        className="users-delete-button"
                        type="button"
                        onClick={() => darDeBajaUsuario(usuario)}
                        disabled={!usuario.activo}
                        aria-label={`Dar de baja a ${nombreCompleto}`}
                      >
                        <Trash2 size={15} />
                        <span>{usuario.activo ? "Dar de baja" : "Inactiva"}</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : usuarios.length ? (
            <div className="users-empty">
              <span className="users-empty-icon">
                <Search size={22} />
              </span>
              <strong>No encontramos usuarios</strong>
              <span>Probá con otro nombre, correo o rol.</span>
            </div>
          ) : (
            <div className="users-empty">
              <span className="users-empty-icon">
                <Search size={22} />
              </span>
              <strong>No hay usuarios registrados</strong>
              <span>Cuando se registren, aparecerán acá.</span>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default PanelUsuario;
