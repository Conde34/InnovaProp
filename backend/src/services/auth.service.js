import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as usuarioModel from "../models/usuario.model.js";

function crearError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function formatearUsuario(usuario) {
  return {
    id: usuario.id_usuario,
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    email: usuario.email,
    rol: usuario.rol,
  };
}

export async function register(datos) {
  const passwordHash = await bcrypt.hash(datos.password, 10);
  try {
    const id = await usuarioModel.create({ ...datos, passwordHash });
    return { id };
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      throw crearError(409, "El email ya está registrado");
    }
    throw error;
  }
}

export async function login(datos) {
  const usuario = await usuarioModel.findByEmail(datos.email);
  if (
    !usuario ||
    !usuario.activo ||
    !(await bcrypt.compare(datos.password, usuario.password_hash))
  ) {
    throw crearError(401, "Credenciales inválidas");
  }

  const token = jwt.sign(
    { id: usuario.id_usuario, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "2h" }
  );
  return { token, user: formatearUsuario(usuario) };
}

export async function getMe(id) {
  const usuario = await usuarioModel.findPublicById(id);
  if (!usuario) {
    throw crearError(401, "Token inválido o expirado");
  }
  return formatearUsuario(usuario);
}
