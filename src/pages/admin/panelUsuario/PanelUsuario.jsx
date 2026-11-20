import { useState } from "react";
import {
  ArrowUpRight,
  Search,
  ShieldCheck,
  Trash2,
  UserRound,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./PanelUsuario.css";

const STORAGE_KEY = "registeredUsers";

const usuariosDePrueba = [
  {
    id: "demo-admin",
    nombre: "Santi",
    email: "",
    rol: "admin",
    esDemo: true,
  },
  {
    id: "demo-cliente",
    nombre: "Toto",
    email: "",
    rol: "cliente",
    esDemo: true,
  },
];

function leerUsuariosRegistrados() {
  try {
    const guardados = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(guardados)) return [];

    return guardados
      .filter((usuario) => usuario && typeof usuario.nombre === "string")
      .map((usuario, index) => ({
        id: usuario.id ?? `usuario-${index}`,
        nombre: usuario.nombre,
        email: typeof usuario.email === "string" ? usuario.email : "",
        rol: ["admin", "agente", "cliente"].includes(usuario.rol)
          ? usuario.rol
          : "cliente",
        esDemo: false,
      }));
  } catch {
    return [];
  }
}

const etiquetasRol = {
  admin: "Administrador",
  agente: "Agente",
  cliente: "Cliente",
};

const PanelUsuario = () => {
  const [usuariosRegistrados, setUsuariosRegistrados] = useState(
    leerUsuariosRegistrados,
  );
  const [busqueda, setBusqueda] = useState("");
  const [rolSeleccionado, setRolSeleccionado] = useState("todos");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const usuarios = [...usuariosDePrueba, ...usuariosRegistrados];
  const termino = busqueda.trim().toLocaleLowerCase("es");
  const usuariosVisibles = usuarios.filter((usuario) => {
    const coincideTexto =
      !termino ||
      `${usuario.nombre} ${usuario.email}`
        .toLocaleLowerCase("es")
        .includes(termino);
    const coincideRol =
      rolSeleccionado === "todos" || usuario.rol === rolSeleccionado;

    return coincideTexto && coincideRol;
  });

  const cantidadClientes = usuarios.filter(
    (usuario) => usuario.rol === "cliente",
  ).length;
  const cantidadAgentes = usuarios.filter(
    (usuario) => usuario.rol === "agente",
  ).length;

  const eliminarUsuario = (usuario) => {
    if (usuario.esDemo || usuario.rol !== "cliente") return;
    if (!window.confirm(`¿Querés eliminar la cuenta de ${usuario.nombre}?`)) {
      return;
    }

    const actualizados = usuariosRegistrados.filter(
      (registrado) => registrado.id !== usuario.id,
    );

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizados));
      setUsuariosRegistrados(actualizados);
      setError("");
      setMensaje(`Se eliminó la cuenta de ${usuario.nombre}.`);
    } catch {
      setMensaje("");
      setError("No se pudo actualizar la lista de usuarios guardada.");
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

        <section className="users-panel-list">
          <div className="users-list-heading">
            <div>
              <h2>Directorio de usuarios</h2>
              <p>Las cuentas de prueba y de administración están protegidas.</p>
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
          {error && (
            <p className="users-feedback users-feedback-error" role="alert">
              {error}
            </p>
          )}

          <div className="users-list-header" aria-hidden="true">
            <span>Usuario</span>
            <span>Rol</span>
            <span>Cuenta</span>
            <span>Acción</span>
          </div>

          {usuariosVisibles.length ? (
            <div className="users-list">
              {usuariosVisibles.map((usuario) => {
                const iniciales = usuario.nombre
                  .trim()
                  .split(/\s+/)
                  .slice(0, 2)
                  .map((parte) => parte[0])
                  .join("")
                  .toUpperCase();
                const esEliminable =
                  !usuario.esDemo && usuario.rol === "cliente";

                return (
                  <article className="users-list-row" key={usuario.id}>
                    <div className="users-identity">
                      <span className="users-avatar" aria-hidden="true">
                        {iniciales || "U"}
                      </span>
                      <div className="users-identity-copy">
                        <strong>{usuario.nombre}</strong>
                        <span>{usuario.email || "Sin correo registrado"}</span>
                      </div>
                    </div>
                    <span
                      className={`users-role-badge users-role-${usuario.rol}`}
                    >
                      {etiquetasRol[usuario.rol] || "Usuario"}
                    </span>
                    <span className="users-account-type">
                      {usuario.esDemo ? "Prueba" : "Registrada"}
                    </span>
                    {esEliminable ? (
                      <button
                        className="users-delete-button"
                        type="button"
                        onClick={() => eliminarUsuario(usuario)}
                        aria-label={`Eliminar cuenta de ${usuario.nombre}`}
                      >
                        <Trash2 size={16} />
                        <span>Eliminar</span>
                      </button>
                    ) : (
                      <span className="users-protected-label">
                        <ShieldCheck size={15} />
                        Protegida
                      </span>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="users-empty">
              <span className="users-empty-icon">
                <Search size={22} />
              </span>
              <strong>No encontramos usuarios</strong>
              <span>Probá con otro nombre, correo o rol.</span>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default PanelUsuario;
