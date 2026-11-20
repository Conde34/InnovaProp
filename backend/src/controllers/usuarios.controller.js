import * as usuariosService from "../services/usuarios.service.js";

export async function getAll(req, res, next) {
  try {
    const usuarios = await usuariosService.findAll();
    return res.status(200).json(usuarios);
  } catch (error) {
    return next(error);
  }
}

export async function update(req, res, next) {
  try {
    const usuario = await usuariosService.update(
      req.params.id,
      req.validatedBody,
      req.user.id
    );
    return res.status(200).json({ message: "Usuario actualizado", usuario });
  } catch (error) {
    return next(error);
  }
}

export async function remove(req, res, next) {
  try {
    await usuariosService.remove(req.params.id, req.user.id);
    return res.status(200).json({ message: "Usuario dado de baja" });
  } catch (error) {
    return next(error);
  }
}
