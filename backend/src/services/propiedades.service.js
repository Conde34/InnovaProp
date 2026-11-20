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
  const filtrosValidados = {};
  const campos = ["tipo", "operacion", "ubicacion", "moneda", "precioMin", "precioMax"];

  for (const campo of campos) {
    const valor = filtros[campo];
    if (valor === undefined) {
      continue;
    }

    if (typeof valor !== "string") {
      const error = new Error(`${campo} debe ser un valor de texto`);
      error.status = 400;
      throw error;
    }

    if (campo === "precioMin" || campo === "precioMax") {
      const precio = Number(valor);
      if (valor.trim() === "" || !Number.isFinite(precio) || precio < 0) {
        const error = new Error(`${campo} debe ser un número válido`);
        error.status = 400;
        throw error;
      }
      filtrosValidados[campo] = precio;
    } else {
      filtrosValidados[campo] = valor;
    }
  }

  const filas = await propiedadModel.findAll(filtrosValidados);
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
