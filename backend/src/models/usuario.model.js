import pool from "../config/db.js";

const CAMPOS_PUBLICOS = `
  id_usuario,
  nombre,
  apellido,
  email,
  telefono,
  rol,
  activo,
  fecha_registro
`;

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

export async function findAll() {
  const [filas] = await pool.execute(
    `SELECT ${CAMPOS_PUBLICOS} FROM usuarios ORDER BY id_usuario`
  );
  return filas;
}

export async function findById(id) {
  const [filas] = await pool.execute(
    `SELECT ${CAMPOS_PUBLICOS} FROM usuarios WHERE id_usuario = ? LIMIT 1`,
    [id]
  );
  return filas[0] || null;
}

export async function updateById(id, datos) {
  const columnas = [
    ["nombre", "nombre"],
    ["apellido", "apellido"],
    ["email", "email"],
    ["telefono", "telefono"],
    ["rol", "rol"],
    ["activo", "activo"],
    ["passwordHash", "password_hash"],
  ];
  const cambios = columnas.filter(([campo]) => datos[campo] !== undefined);

  if (cambios.length) {
    const asignaciones = cambios.map(([, columna]) => `${columna} = ?`).join(", ");
    const valores = cambios.map(([campo]) => {
      const valor = datos[campo];
      return campo === "telefono" && valor === "" ? null : valor;
    });
    await pool.execute(
      `UPDATE usuarios SET ${asignaciones} WHERE id_usuario = ?`,
      [...valores, id]
    );
  }

  return findById(id);
}

export async function setInactiveById(id) {
  await pool.execute(
    "UPDATE usuarios SET activo = 0 WHERE id_usuario = ?",
    [id]
  );
  return findById(id);
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
