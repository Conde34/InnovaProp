import * as favoritoModel from "../models/favorito.model.js";
import * as propiedadModel from "../models/propiedad.model.js";

function crearError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function validarId(id) {
  const idNumerico = Number(id);
  if (!/^\d+$/.test(id) || idNumerico < 1 || !Number.isSafeInteger(idNumerico)) {
    throw crearError(404, "Propiedad no encontrada");
  }
  return idNumerico;
}

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

export async function findAll(idUsuario) {
  const filas = await favoritoModel.findAllByUserId(idUsuario);
  return filas.map(formatearPropiedad);
}

export async function add(id, idUsuario) {
  const idPropiedad = validarId(id);
  const propiedad = await propiedadModel.findById(idPropiedad);
  if (!propiedad) {
    throw crearError(404, "Propiedad no encontrada");
  }

  try {
    await favoritoModel.create(idUsuario, idPropiedad);
  } catch (error) {
    if (error.code !== "ER_DUP_ENTRY") {
      throw error;
    }
  }
}

export async function remove(id, idUsuario) {
  const idPropiedad = validarId(id);
  const eliminado = await favoritoModel.deleteByUserAndProperty(
    idUsuario,
    idPropiedad
  );
  if (!eliminado) {
    throw crearError(404, "Favorito no encontrado");
  }
}
