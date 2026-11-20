import pool from "../config/db.js";

export async function findByEmail(email) {
  const [filas] = await pool.execute(
    "SELECT id_usuario, nombre, apellido, email, password_hash, rol, activo FROM usuarios WHERE email = ? LIMIT 1",
    [email]
  );
  return filas[0] || null;
}

export async function findActiveById(id) {
  const [filas] = await pool.execute(
    "SELECT id_usuario, rol FROM usuarios WHERE id_usuario = ? AND activo = 1 LIMIT 1",
    [id]
  );
  return filas[0] || null;
}

export async function findPublicById(id) {
  const [filas] = await pool.execute(
    "SELECT id_usuario, nombre, apellido, email, rol FROM usuarios WHERE id_usuario = ? AND activo = 1 LIMIT 1",
    [id]
  );
  return filas[0] || null;
}

export async function create(datos) {
  const [resultado] = await pool.execute(
    "INSERT INTO usuarios (nombre, apellido, email, password_hash, telefono, rol) VALUES (?, ?, ?, ?, ?, 'cliente')",
    [datos.nombre, datos.apellido, datos.email, datos.passwordHash, datos.telefono || null]
  );
  return resultado.insertId;
}
