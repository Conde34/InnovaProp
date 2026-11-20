import pool from "../config/db.js";

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

export async function findAll(filtros = {}) {
  const condiciones = [];
  const valores = [];

  if (filtros.tipo) {
    condiciones.push("t.nombre = ?");
    valores.push(filtros.tipo);
  }
  if (filtros.operacion) {
    condiciones.push("p.operacion = ?");
    valores.push(filtros.operacion);
  }
  if (filtros.ubicacion) {
    condiciones.push("CONCAT(z.nombre, ', Tucumán') LIKE ?");
    valores.push(`%${filtros.ubicacion}%`);
  }
  if (filtros.moneda) {
    condiciones.push("p.moneda = ?");
    valores.push(filtros.moneda);
  }
  if (filtros.precioMin) {
    condiciones.push("p.precio >= ?");
    valores.push(Number(filtros.precioMin));
  }
  if (filtros.precioMax) {
    condiciones.push("p.precio <= ?");
    valores.push(Number(filtros.precioMax));
  }

  const where = condiciones.length ? `WHERE ${condiciones.join(" AND ")}` : "";
  const [filas] = await pool.execute(
    `${SELECT_PROPIEDADES} ${where} ORDER BY p.id_propiedad`,
    valores
  );
  return filas;
}

export async function findById(id) {
  const [filas] = await pool.execute(
    `${SELECT_PROPIEDADES} WHERE p.id_propiedad = ?`,
    [id]
  );
  return filas[0] || null;
}
