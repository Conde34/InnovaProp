import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Consulta base: junta propiedades con su tipo, su zona y su foto principal.
// Los "AS" hacen que las columnas se llamen igual que en el JSON viejo,
// así el frontend no se entera del cambio.
const SELECT_PROPIEDADES = `
  SELECT
    p.id_propiedad AS id,
    p.titulo,
    t.nombre AS tipo,
    p.operacion,
    p.precio,
    p.moneda,
    CONCAT(z.nombre, ', Tucumán') AS ubicacion,
    p.direccion,
    p.ambientes,
    p.dormitorios,
    p.banos,
    p.superficie,
    i.url_imagen AS imagen,
    p.descripcion,
    p.estado,
    p.destacado
  FROM propiedades p
  JOIN tipos_propiedad t ON t.id_tipo = p.id_tipo
  JOIN zonas z ON z.id_zona = p.id_zona
  LEFT JOIN imagenes_propiedad i
    ON i.id_propiedad = p.id_propiedad AND i.es_principal = 1
`;

// MySQL devuelve true/false como 1/0: lo convertimos al formato del JSON viejo
function formatear(fila) {
  const { estado, destacado, ...resto } = fila;
  return {
    ...resto,
    disponible: estado === "Disponible",
    destacado: Boolean(destacado),
  };
}

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1"); // prueba que MySQL responde
    res.json({ ok: true, mensaje: "Backend y base de datos funcionando" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: "No se pudo conectar a la base de datos" });
  }
});

// Listado con filtros opcionales: /api/propiedades?tipo=Casa&precioMax=200000
app.get("/api/propiedades", async (req, res) => {
  const { tipo, operacion, ubicacion, moneda, precioMin, precioMax } = req.query;

  const condiciones = [];
  const valores = [];

  if (tipo) { condiciones.push("t.nombre = ?"); valores.push(tipo); }
  if (operacion) { condiciones.push("p.operacion = ?"); valores.push(operacion); }
  if (ubicacion) { condiciones.push("CONCAT(z.nombre, ', Tucumán') LIKE ?"); valores.push(`%${ubicacion}%`); }
  if (moneda) { condiciones.push("p.moneda = ?"); valores.push(moneda); }
  if (precioMin) { condiciones.push("p.precio >= ?"); valores.push(Number(precioMin)); }
  if (precioMax) { condiciones.push("p.precio <= ?"); valores.push(Number(precioMax)); }

  const where = condiciones.length ? "WHERE " + condiciones.join(" AND ") : "";

  try {
    // Los "?" los completa mysql2 con los valores, de forma segura
    const [filas] = await pool.query(`${SELECT_PROPIEDADES} ${where} ORDER BY p.id_propiedad`, valores);
    res.json(filas.map(formatear));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al leer las propiedades" });
  }
});

// Una propiedad por id: /api/propiedades/3
app.get("/api/propiedades/:id", async (req, res) => {
  const id = Number(req.params.id);

  // Si no es un número (ej: /abc), ni lo buscamos en la base
  if (Number.isNaN(id)) {
    return res.status(404).json({ error: "Propiedad no encontrada" });
  }

  try {
    const [filas] = await pool.query(`${SELECT_PROPIEDADES} WHERE p.id_propiedad = ?`, [id]);

    if (filas.length === 0) {
      return res.status(404).json({ error: "Propiedad no encontrada" });
    }

    res.json(formatear(filas[0]));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al leer la propiedad" });
  }
});

// Recibe una consulta del formulario de Contacto y la guarda en MySQL
const texto = (valor) => (typeof valor === "string" ? valor.trim() : "");

app.post("/api/consultas", async (req, res) => {
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

  try {
    const [resultado] = await pool.query(
      "INSERT INTO consultas (nombre, email, telefono, motivo, mensaje) VALUES (?, ?, ?, ?, ?)",
      [nombre, email, telefono || null, motivo, mensaje]
    );

    res.status(201).json({ mensaje: "Consulta recibida", id: resultado.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al guardar la consulta" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});