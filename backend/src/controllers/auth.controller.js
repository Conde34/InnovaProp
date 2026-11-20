import * as authService from "../services/auth.service.js";

export async function register(req, res, next) {
  try {
    const usuario = await authService.register(req.validatedBody);
    return res.status(201).json(usuario);
  } catch (error) {
    return next(error);
  }
}

export async function login(req, res, next) {
  try {
    const sesion = await authService.login(req.validatedBody);
    return res.status(200).json(sesion);
  } catch (error) {
    return next(error);
  }
}

export async function getMe(req, res, next) {
  try {
    const usuario = await authService.getMe(req.user.id);
    return res.status(200).json(usuario);
  } catch (error) {
    return next(error);
  }
}
