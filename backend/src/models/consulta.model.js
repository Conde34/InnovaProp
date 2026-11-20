import pool from "../config/db.js";

export async function findAll() {
  const [filas] = await pool.execute(
    `SELECT
       c.id_consulta,
       c.nombre,
       c.email,
       c.telefono,
       c.motivo,
       c.mensaje,
       c.estado,
       c.fecha
     FROM consultas c
     ORDER BY c.fecha DESC, c.id_consulta DESC`
  );
  return filas;
}

export async function deleteById(id) {
  const [resultado] = await pool.execute(
    "DELETE FROM consultas WHERE id_consulta = ?",
    [id]
  );
  return resultado.affectedRows === 1;
}

export async function create(datos) {
  const [resultado] = await pool.execute(
    "INSERT INTO consultas (nombre, email, telefono, motivo, mensaje) VALUES (?, ?, ?, ?, ?)",
    [datos.nombre, datos.email, datos.telefono, datos.motivo, datos.mensaje]
  );
  return resultado.insertId;
}
