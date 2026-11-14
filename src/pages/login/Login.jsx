import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminUser = {
      id: 1,
      nombre: "santi",
      rol: "admin",
    };

    const clientUser = {
      id: 2,
      nombre: "cliente",
      rol: "cliente",
    };

    if (mail === "admin@admin.com" && pass === "1234") {
      login(adminUser);
      alert("Bienvenido administrador");
      navigate("/admin/dashboard");
      return;
    }

    if (mail === "cliente@cliente.com" && pass === "1234") {
      login(clientUser);
      alert("Bienvenido cliente");
      navigate("/propiedades");
      return;
    }

    alert("Credenciales incorrectas");
  };

  return (
    <div className="bg-gray-400 text-center">
      <br />
      <br />
      <form onSubmit={handleSubmit} className="bg-amber-200 w-[30%] text-center">
        <label htmlFor="">Correo</label>
        <input
          type="email"
          className="bg-blue-100"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <br />
        <label htmlFor="">Contraseña</label>
        <input
          type="password"
          className="bg-blue-100"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <br />
        <button type="submit" className="text-black bg-blue-400 border rounded">
          login
        </button>
      </form>
      <br />
      <br />
    </div>
  );
};

export default Login;
