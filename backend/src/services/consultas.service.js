import * as consultaModel from "../models/consulta.model.js";

function crearError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function validarId(id) {
  const idNumerico = Number(id);
  if (!/^\d+$/.test(id) || idNumerico < 1 || !Number.isSafeInteger(idNumerico)) {
    throw crearError(404, "Consulta no encontrada");
  }
  return idNumerico;
}

export function findAll() {
  return consultaModel.findAll();
}

export async function remove(id) {
  const idNumerico = validarId(id);
  const eliminada = await consultaModel.deleteById(idNumerico);
  if (!eliminada) {
    throw crearError(404, "Consulta no encontrada");
  }
}

export function create(datos) {
  return consultaModel.create({
    nombre: datos.nombre,
    email: datos.email,
    telefono: datos.telefono || null,
    motivo: datos.motivo,
    mensaje: datos.mensaje,
  });
}
