import pool from "../config/db.js";

const SELECT_FAVORITOS = `
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
  FROM favoritos f
  JOIN propiedades p ON p.id_propiedad = f.id_propiedad
  JOIN tipos_propiedad t ON t.id_tipo = p.id_tipo
  JOIN zonas z ON z.id_zona = p.id_zona
  LEFT JOIN imagenes_propiedad i
    ON i.id_propiedad = p.id_propiedad AND i.es_principal = 1
`;

export async function findAllByUserId(idUsuario) {
  const [filas] = await pool.execute(
    `${SELECT_FAVORITOS}
     WHERE f.id_usuario = ?
     ORDER BY f.fecha_agregado DESC`,
    [idUsuario]
  );
  return filas;
}

export async function create(idUsuario, idPropiedad) {
  await pool.execute(
    "INSERT INTO favoritos (id_usuario, id_propiedad) VALUES (?, ?)",
    [idUsuario, idPropiedad]
  );
}

export async function deleteByUserAndProperty(idUsuario, idPropiedad) {
  const [resultado] = await pool.execute(
    "DELETE FROM favoritos WHERE id_usuario = ? AND id_propiedad = ?",
    [idUsuario, idPropiedad]
  );
  return resultado.affectedRows === 1;
}
