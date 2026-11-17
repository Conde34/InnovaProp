import express from "express";
import cors from "cors";
import fs from "node:fs";

const app = express();
const PORT = 3000;

app.use(cors()); // permite que el frontend (localhost:5173) le hable a este servidor
app.use(express.json()); // permite leer el JSON que llega en el body de los pedidos

// Se lee el archivo una sola vez, al arrancar el servidor
const datos = JSON.parse(fs.readFileSync("./data/propiedades.json", "utf-8"));
const propiedades = datos.casas;

// Las consultas se guardan en un archivo (provisorio, hasta tener base de datos)
const ARCHIVO_CONSULTAS = "./data/consultas.json";

const leerConsultas = () => {
  if (!fs.existsSync(ARCHIVO_CONSULTAS)) return [];
  return JSON.parse(fs.readFileSync(ARCHIVO_CONSULTAS, "utf-8"));
};

const guardarConsultas = (consultas) => {
  fs.writeFileSync(ARCHIVO_CONSULTAS, JSON.stringify(consultas, null, 2));
};

// Devuelve el texto sin espacios de los costados, o "" si no es texto
const texto = (valor) => (typeof valor === "string" ? valor.trim() : "");

app.get("/api/health", (req, res) => {
  res.json({ ok: true, mensaje: "Backend de InnovaProp funcionando" });
});

// Listado, con filtros opcionales
app.get("/api/propiedades", (req, res) => {
  const { tipo, operacion, ubicacion, moneda, precioMin, precioMax } = req.query;

  let resultado = propiedades;

  if (tipo) resultado = resultado.filter((p) => p.tipo.toLowerCase() === tipo.toLowerCase());
  if (operacion) resultado = resultado.filter((p) => p.operacion.toLowerCase() === operacion.toLowerCase());
  if (ubicacion) resultado = resultado.filter((p) => p.ubicacion.toLowerCase().includes(ubicacion.toLowerCase()));
  if (moneda) resultado = resultado.filter((p) => p.moneda.toLowerCase() === moneda.toLowerCase());
  if (precioMin) resultado = resultado.filter((p) => p.precio >= Number(precioMin));
  if (precioMax) resultado = resultado.filter((p) => p.precio <= Number(precioMax));

  res.json(resultado);
});

// Una propiedad por id
app.get("/api/propiedades/:id", (req, res) => {
  const id = Number(req.params.id); // llega como texto, lo paso a número
  const propiedad = propiedades.find((p) => p.id === id);

  if (!propiedad) {
    return res.status(404).json({ error: "Propiedad no encontrada" });
  }

  res.json(propiedad);
});

// Recibe una consulta del formulario de Contacto
app.post("/api/consultas", (req, res) => {
  const nombre = texto(req.body?.nombre);
  const email = texto(req.body?.email);
  const telefono = texto(req.body?.telefono);
  const motivo = texto(req.body?.motivo);
  const mensaje = texto(req.body?.mensaje);

  const errores = {};
  if (nombre.length < 2) errores.nombre = "Ingresá tu nombre (mínimo 2 caracteres).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errores.email = "Ingresá un email válido.";
  if (telefono && !/^[0-9+\-()\s]{8,20}$/.test(telefono)) errores.telefono = "Ingresá un teléfono válido.";
  if (!motivo) errores.motivo = "Elegí el motivo de tu consulta.";
  if (mensaje.length < 10) errores.mensaje = "Contanos un poco más (mínimo 10 caracteres).";

  if (Object.keys(errores).length > 0) {
    return res.status(400).json({ error: "Datos inválidos", errores });
  }

  const nueva = {
    id: Date.now(),
    nombre,
    email,
    telefono,
    motivo,
    mensaje,
    fecha: new Date().toISOString(),
  };

  const consultas = leerConsultas();
  consultas.push(nueva);
  guardarConsultas(consultas);

  res.status(201).json({ mensaje: "Consulta recibida", id: nueva.id });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});