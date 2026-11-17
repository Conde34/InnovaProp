import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiLogIn, FiHome } from "react-icons/fi";
import useAuthStore from "../../../store/useAuthStore";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const defaultAdmins = [
      { id: 1, nombre: "santi", password: "1234", rol: "admin" }
    ];
    const defaultClients = [
      { id: 2, nombre: "toto", password: "1234", rol: "cliente" }
    ];

    const allUsers = [...defaultAdmins, ...defaultClients, ...storedUsers];

    const foundUser = allUsers.find(
      (u) =>
        (u.nombre === user || u.email === user) &&
        (u.pass === pass || u.password === pass)
    );

    if (foundUser) {
      login(foundUser);

      if (foundUser.rol === "admin") {
        alert("Bienvenido administrador");
        navigate("/admin/dashboard");
      } else {
        alert("Bienvenido cliente");
        navigate("/propiedades");
      }
    } else {
      alert("Credenciales incorrectas");
      setUser("");
      setPass("");
    }
  };

  return (
    <section className="login-section">
      <div className="login-card">
        {/* Encabezado / Marca */}
        <div className="login-header">
          <div className="login-icon-badge">
            <FiHome size={28} />
          </div>
          <h1 className="login-title">
            Innova<span>PROP</span>
          </h1>
          <p className="login-subtitle">
            Ingresá a tu cuenta para gestionar propiedades y consultas.
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form-group">
            <label htmlFor="mail">Usuario</label>
            <div className="login-input-wrapper">
              <FiMail className="login-input-icon" size={18} />
              <input
                id="mail"
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Ingresá tu usuario"
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="login-form-group">
            <label htmlFor="pass">Contraseña</label>
            <div className="login-input-wrapper">
              <FiLock className="login-input-icon" size={18} />
              <input
                id="pass"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Ingresá tu contraseña"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <button type="submit" className="login-submit-btn">
            <FiLogIn size={18} />
            Iniciar sesión
          </button>
        </form>

        {/* Pie de tarjeta */}
        <div className="login-footer">
          <p>
            ¿Todavía no tenés cuenta?{" "}
            <Link to="/register" className="login-register-link">
              Registrate acá
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;