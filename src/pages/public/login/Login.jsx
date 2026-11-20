import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiLogIn, FiHome } from "react-icons/fi";
import useAuthStore from "../../../store/useAuthStore";
import { apiFetch } from "../../../services/api";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user, token } = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password: pass }),
      });
      login(user, token);

      if (user.rol === "admin") {
        navigate("/admin/dashboard");
      } else if (user.rol === "agente") {
        navigate("/admin/panelPropiedades");
      } else {
        navigate("/propiedades");
      }
    } catch (error) {
      alert(error.message || "Credenciales inválidas");
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
            <label htmlFor="mail">Email</label>
            <div className="login-input-wrapper">
              <FiMail className="login-input-icon" size={18} />
              <input
                id="mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresá tu email"
                autoComplete="email"
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