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

export async function findTipoIdByName(nombre) {
  const [filas] = await pool.execute(
    "SELECT id_tipo FROM tipos_propiedad WHERE nombre = ?",
    [nombre]
  );
  return filas[0]?.id_tipo || null;
}

export async function findZonaIdByName(nombre) {
  const [filas] = await pool.execute(
    "SELECT id_zona FROM zonas WHERE nombre = ?",
    [nombre]
  );
  return filas[0]?.id_zona || null;
}

export async function create(datos) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [resultado] = await connection.execute(
      `INSERT INTO propiedades
        (titulo, descripcion, id_tipo, id_zona, operacion, precio, moneda, direccion,
         ambientes, dormitorios, banos, superficie, estado, destacado, id_agente)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        datos.titulo,
        datos.descripcion || null,
        datos.id_tipo,
        datos.id_zona,
        datos.operacion,
        datos.precio,
        datos.moneda,
        datos.direccion,
        datos.ambientes,
        datos.dormitorios,
        datos.banos,
        datos.superficie,
        datos.estado,
        datos.destacado,
        datos.id_agente,
      ]
    );

    if (datos.imagen) {
      await connection.execute(
        "INSERT INTO imagenes_propiedad (id_propiedad, url_imagen, es_principal) VALUES (?, ?, ?)",
        [resultado.insertId, datos.imagen, true]
      );
    }

    await connection.commit();
    return resultado.insertId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

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
