import * as consultaModel from "../models/consulta.model.js";

export function create(datos) {
  return consultaModel.create({
    nombre: datos.nombre,
    email: datos.email,
    telefono: datos.telefono || null,
    motivo: datos.motivo,
    mensaje: datos.mensaje,
  });
}
