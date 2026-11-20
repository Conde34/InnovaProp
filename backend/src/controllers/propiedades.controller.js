import * as propiedadesService from "../services/propiedades.service.js";

export async function create(req, res, next) {
  try {
    const id = await propiedadesService.create(req.validatedBody, req.user.id);
    return res.status(201).json({ id });
  } catch (error) {
    return next(error);
  }
}

export async function update(req, res, next) {
  try {
    await propiedadesService.update(
      req.params.id,
      req.validatedBody,
      req.user.id,
      req.user.rol
    );
    return res.status(200).json({ message: "Propiedad actualizada" });
  } catch (error) {
    return next(error);
  }
}

export async function remove(req, res, next) {
  try {
    await propiedadesService.remove(req.params.id, req.user.id, req.user.rol);
    return res.status(200).json({ message: "Propiedad eliminada" });
  } catch (error) {
    return next(error);
  }
}

export async function getAll(req, res, next) {
  try {
    const propiedades = await propiedadesService.findAll(req.query);
    return res.status(200).json(propiedades);
  } catch (error) {
    return next(error);
  }
}

export async function getById(req, res, next) {
  try {
    const propiedad = await propiedadesService.findById(req.params.id);
    if (!propiedad) {
      return res.status(404).json({ message: "Propiedad no encontrada" });
    }

    return res.status(200).json(propiedad);
  } catch (error) {
    return next(error);
  }
}
