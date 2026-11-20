import bcrypt from "bcryptjs";
import * as usuarioModel from "../models/usuario.model.js";

function crearError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function validarId(id) {
  const idNumerico = Number(id);
  if (!/^\d+$/.test(id) || idNumerico < 1 || !Number.isSafeInteger(idNumerico)) {
    throw crearError(404, "Usuario no encontrado");
  }
  return idNumerico;
}

function formatearUsuario(usuario) {
  return {
    id_usuario: usuario.id_usuario,
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    email: usuario.email,
    telefono: usuario.telefono,
    rol: usuario.rol,
    activo: Boolean(usuario.activo),
    fecha_registro: usuario.fecha_registro,
  };
}

export async function findAll() {
  const usuarios = await usuarioModel.findAll();
  return usuarios.map(formatearUsuario);
}

export async function update(id, datos, idAdmin) {
  const idNumerico = validarId(id);
  const usuarioActual = await usuarioModel.findById(idNumerico);
  if (!usuarioActual) {
    throw crearError(404, "Usuario no encontrado");
  }

  if (idNumerico === Number(idAdmin)) {
    if (datos.activo === false) {
      throw crearError(400, "No podés dar de baja tu propia cuenta");
    }
    if (datos.rol !== undefined && datos.rol !== "admin") {
      throw crearError(400, "No podés quitarte tu propio rol de administrador");
    }
  }

  const { password, ...cambios } = datos;
  if (password !== undefined) {
    cambios.passwordHash = await bcrypt.hash(password, 10);
  }

  try {
    const usuarioActualizado = await usuarioModel.updateById(idNumerico, cambios);
    if (!usuarioActualizado) {
      throw crearError(404, "Usuario no encontrado");
    }
    return formatearUsuario(usuarioActualizado);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      throw crearError(409, "El email ya está registrado");
    }
    throw error;
  }
}

export async function remove(id, idAdmin) {
  const idNumerico = validarId(id);
  if (idNumerico === Number(idAdmin)) {
    throw crearError(400, "No podés dar de baja tu propia cuenta");
  }

  const usuarioActual = await usuarioModel.findById(idNumerico);
  if (!usuarioActual) {
    throw crearError(404, "Usuario no encontrado");
  }

  const usuarioInactivo = await usuarioModel.setInactiveById(idNumerico);
  if (!usuarioInactivo) {
    throw crearError(404, "Usuario no encontrado");
  }
}
