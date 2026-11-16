import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiFilm, FiMail, FiLock, FiLogIn } from "react-icons/fi";
import useAuthStore from "../../../store/useAuthStore";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminUser = {
      id: 1,
      nombre: "Santi",
      rol: "admin",
    };

    const clientUser = {
      id: 2,
      nombre: "Toto",
      rol: "cliente",
    };

    if (user === "Santi" && pass === "1234") {
      login(adminUser);
      alert("Bienvenido administrador");
      navigate("/admin/dashboard");
      return;
    }else{
      alert("Credenciales incorrectas");
      e.target.reset()
      setUser('')
      setPass('')
    }

    if (user === "Toto" && pass === "1234") {
      login(clientUser);
      alert("Bienvenido cliente");
      navigate("/propiedades");
      return;
    }else{
      alert("Credenciales incorrectas");
      e.target.reset()
      setUser('')
      setPass('')
    }

  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <main className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden px-4 py-12">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -left-32 -top-20 h-80 w-80 rounded-full bg-indigo-600/20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />

        {/* Login card */}
        <div className="relative w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/90 p-7 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500 shadow-lg shadow-indigo-500/30">
              <FiFilm size={32} />
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight">
              CINE<span className="text-indigo-400">VERSE</span>
            </h1>

            <p className="mt-3 text-sm text-slate-400">
              Iniciá sesión y entrá a tu universo de películas.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="mail"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Usuario o correo electrónico
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
                <FiMail className="shrink-0 text-slate-500" size={19} />

                <input
                  id="mail"
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="Ingresá tu usuario"
                  autoComplete="username"
                  required
                  className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="pass"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Contraseña
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
                <FiLock className="shrink-0 text-slate-500" size={19} />

                <input
                  id="pass"
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Ingresá tu contraseña"
                  autoComplete="current-password"
                  required
                  className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/20 transition duration-200 hover:bg-indigo-400 hover:shadow-indigo-500/30 active:scale-[0.98]"
            >
              <FiLogIn size={19} />
              Iniciar sesión
            </button>
          </form>

          <div className="mt-7 border-t border-slate-800 pt-5 text-center">
            <p className="text-xs text-slate-500">
              Tu próxima película favorita te está esperando.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
