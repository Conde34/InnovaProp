import * as propiedadModel from "../models/propiedad.model.js";

function formatearPropiedad(fila) {
  return {
    id: fila.id,
    titulo: fila.titulo,
    tipo: fila.tipo,
    operacion: fila.operacion,
    precio: fila.precio,
    moneda: fila.moneda,
    ubicacion: fila.ubicacion,
    direccion: fila.direccion,
    ambientes: fila.ambientes,
    dormitorios: fila.dormitorios,
    banos: fila.banos,
    superficie: fila.superficie,
    imagen: fila.imagen,
    descripcion: fila.descripcion,
    disponible: fila.estado === "Disponible",
    destacado: Boolean(fila.destacado),
  };
}

export async function findAll(filtros) {
  const filas = await propiedadModel.findAll(filtros);
  return filas.map(formatearPropiedad);
}

export async function findById(id) {
  const idNumerico = Number(id);
  if (!/^\d+$/.test(id) || idNumerico < 1 || !Number.isSafeInteger(idNumerico)) {
    return null;
  }

  const fila = await propiedadModel.findById(idNumerico);
  return fila ? formatearPropiedad(fila) : null;
}
