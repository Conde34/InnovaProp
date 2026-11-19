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

app.get("/api/health", (req, res) => {
  res.json({ ok: true, mensaje: "Backend de InnovaProp funcionando" });
});

// Listado completo
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

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});