import jwt from "jsonwebtoken";
import * as usuarioModel from "../models/usuario.model.js";

export async function authenticateToken(req, res, next) {
  const authorization = req.get("authorization") || "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    return res.status(401).json({ message: "Token requerido" });
  }

  let payload;
  try {
    payload = jwt.verify(match[1], process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }

  const id = Number(payload?.id);
  if (!Number.isSafeInteger(id) || id < 1) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }

  try {
    const usuario = await usuarioModel.findActiveById(id);
    if (!usuario) {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }

    req.user = { id: usuario.id_usuario, rol: usuario.rol };
    return next();
  } catch (error) {
    return next(error);
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.rol)) {
      return res.status(403).json({ message: "No tenés permisos para esta operación" });
    }

    return next();
  };
}
