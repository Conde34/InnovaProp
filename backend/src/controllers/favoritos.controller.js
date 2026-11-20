import * as favoritosService from "../services/favoritos.service.js";

export async function getAll(req, res, next) {
  try {
    const favoritos = await favoritosService.findAll(req.user.id);
    return res.status(200).json(favoritos);
  } catch (error) {
    return next(error);
  }
}

export async function add(req, res, next) {
  try {
    await favoritosService.add(req.params.id, req.user.id);
    return res.status(201).json({ message: "Propiedad agregada a favoritos" });
  } catch (error) {
    return next(error);
  }
}

export async function remove(req, res, next) {
  try {
    await favoritosService.remove(req.params.id, req.user.id);
    return res.status(200).json({ message: "Propiedad quitada de favoritos" });
  } catch (error) {
    return next(error);
  }
}
