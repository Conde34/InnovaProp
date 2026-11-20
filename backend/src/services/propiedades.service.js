import * as propiedadModel from "../models/propiedad.model.js";

function crearError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function validarId(id) {
  const idNumerico = Number(id);
  if (!/^\d+$/.test(id) || idNumerico < 1 || !Number.isSafeInteger(idNumerico)) {
    return null;
  }
  return idNumerico;
}

async function resolverRelaciones(datos) {
  const idTipo = await propiedadModel.findTipoIdByName(datos.tipo);
  if (!idTipo) {
    throw crearError(400, "Tipo de propiedad inválido");
  }

  const nombreZona = datos.ubicacion.replace(/, Tucumán$/, "");
  const idZona = await propiedadModel.findZonaIdByName(nombreZona);
  if (!idZona) {
    throw crearError(400, "Ubicación inválida");
  }

  return { id_tipo: idTipo, id_zona: idZona };
}

async function verificarPermiso(id, idUsuario, rol) {
  const idNumerico = validarId(id);
  if (idNumerico === null) {
    throw crearError(404, "Propiedad no encontrada");
  }

  const idAgente = await propiedadModel.findAgenteIdById(idNumerico);
  if (idAgente === null) {
    throw crearError(404, "Propiedad no encontrada");
  }

  if (rol === "admin") {
    return idNumerico;
  }
  if (rol !== "agente" || Number(idAgente) !== Number(idUsuario)) {
    throw crearError(403, "No tenés permiso para esta propiedad");
  }

  return idNumerico;
}

export async function create(datos, idAgente) {
  const relaciones = await resolverRelaciones(datos);
  return propiedadModel.create({
    ...datos,
    ...relaciones,
    id_agente: idAgente,
  });
}

export async function update(id, datos, idUsuario, rol) {
  const idNumerico = await verificarPermiso(id, idUsuario, rol);
  const relaciones = await resolverRelaciones(datos);
  const actualizada = await propiedadModel.update(idNumerico, {
    ...datos,
    ...relaciones,
  });

  if (!actualizada) {
    throw crearError(404, "Propiedad no encontrada");
  }
}

export async function remove(id, idUsuario, rol) {
  const idNumerico = await verificarPermiso(id, idUsuario, rol);
  const eliminada = await propiedadModel.deleteById(idNumerico);

  if (!eliminada) {
    throw crearError(404, "Propiedad no encontrada");
  }
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
  const idNumerico = validarId(id);
  if (idNumerico === null) {
    return null;
  }

  const fila = await propiedadModel.findById(idNumerico);
  return fila ? formatearPropiedad(fila) : null;
}
