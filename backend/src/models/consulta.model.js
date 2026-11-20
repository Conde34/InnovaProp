import pool from "../config/db.js";

export async function create(datos) {
  const [resultado] = await pool.execute(
    "INSERT INTO consultas (nombre, email, telefono, motivo, mensaje) VALUES (?, ?, ?, ?, ?)",
    [datos.nombre, datos.email, datos.telefono, datos.motivo, datos.mensaje]
  );
  return resultado.insertId;
}
