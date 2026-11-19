import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiUser, FiLock, FiUserPlus, FiHome } from "react-icons/fi";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const nombreLimpio = nombre.trim();

    // 1. Validaciones básicas
    if (!nombreLimpio) {
      alert("Por favor ingresá un nombre de usuario.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 4) {
      alert("La contraseña debe tener al menos 4 caracteres.");
      return;
    }

    // 2. Traemos los usuarios ya registrados de forma segura
    let storedUsers = [];
    try {
      const data = JSON.parse(localStorage.getItem("registeredUsers"));
      if (Array.isArray(data)) storedUsers = data;
    } catch {
      storedUsers = [];
    }

    // 3. Verificamos únicamente que el nombre de usuario no exista
    const userExists =
      storedUsers.some(
        (u) => u.nombre && u.nombre.toLowerCase() === nombreLimpio.toLowerCase()
      ) ||
      nombreLimpio.toLowerCase() === "santi" ||
      nombreLimpio.toLowerCase() === "toto";

    if (userExists) {
      alert("Ese nombre de usuario ya está registrado.");
      return;
    }

    // 4. Creamos el nuevo usuario solo con nombre y contraseña (rol cliente)
    const newUser = {
      id: Date.now(),
      nombre: nombreLimpio,
      password: password,
      rol: "cliente",
    };

    // 5. Guardamos en el localStorage
    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    alert("¡Registro exitoso! Ahora podés iniciar sesión.");
    navigate("/login");
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
            <label htmlFor="nombre">Nombre de usuario</label>
            <div className="register-input-wrapper">
              <FiUser className="register-input-icon" size={18} />
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingresá tu nombre de usuario"
                autoComplete="username"
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