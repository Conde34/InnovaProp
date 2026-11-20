import * as propiedadModel from "../models/propiedad.model.js";

export async function create(datos, idAgente) {
  const idTipo = await propiedadModel.findTipoIdByName(datos.tipo);
  if (!idTipo) {
    const error = new Error("Tipo de propiedad inválido");
    error.status = 400;
    throw error;
  }

  const nombreZona = datos.ubicacion.replace(/, Tucumán$/, "");
  const idZona = await propiedadModel.findZonaIdByName(nombreZona);
  if (!idZona) {
    const error = new Error("Ubicación inválida");
    error.status = 400;
    throw error;
  }

  return propiedadModel.create({
    ...datos,
    id_tipo: idTipo,
    id_zona: idZona,
    id_agente: idAgente,
  });
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
