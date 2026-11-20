import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiUser, FiLock, FiUserPlus, FiHome } from "react-icons/fi";
import { apiFetch } from "../../../services/api";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    try {
      await apiFetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          email: email.trim(),
          password,
        }),
      });
      alert("¡Registro exitoso! Ahora podés iniciar sesión.");
      navigate("/login");
    } catch (error) {
      alert(error.message || "No se pudo completar el registro.");
    }
  };

  return (
    <section className="register-section">
      <div className="register-card">
        {/* Encabezado / Marca */}
        <div className="register-header">
          <div className="register-icon-badge">
            <FiHome size={28} />
          </div>
          <h1 className="register-title">
            Innova<span>PROP</span>
          </h1>
          <p className="register-subtitle">
            Creá tu cuenta para explorar propiedades y guardar tus favoritas.
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-form-group">
            <label htmlFor="nombre">Nombre</label>
            <div className="register-input-wrapper">
              <FiUser className="register-input-icon" size={18} />
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingresá tu nombre"
                autoComplete="given-name"
                required
              />
            </div>
          </div>

          <div className="register-form-group">
            <label htmlFor="apellido">Apellido</label>
            <div className="register-input-wrapper">
              <FiUser className="register-input-icon" size={18} />
              <input
                id="apellido"
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Ingresá tu apellido"
                autoComplete="family-name"
                required
              />
            </div>
          </div>

          <div className="register-form-group">
            <label htmlFor="email">Email</label>
            <div className="register-input-wrapper">
              <FiUser className="register-input-icon" size={18} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresá tu email"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="register-form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="register-input-wrapper">
              <FiLock className="register-input-icon" size={18} />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Creá una contraseña"
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          <div className="register-form-group">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <div className="register-input-wrapper">
              <FiLock className="register-input-icon" size={18} />
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repetí tu contraseña"
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          <button type="submit" className="register-submit-btn">
            <FiUserPlus size={18} />
            Crear cuenta
          </button>
        </form>

        {/* Pie de tarjeta */}
        <div className="register-footer">
          <p>
            ¿Ya tenés una cuenta?{" "}
            <Link to="/login" className="register-login-link">
              Iniciá sesión acá
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;