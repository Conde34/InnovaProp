import * as consultasService from "../services/consultas.service.js";

export async function getAll(req, res, next) {
  try {
    const consultas = await consultasService.findAll();
    return res.status(200).json(consultas);
  } catch (error) {
    return next(error);
  }
}

export async function remove(req, res, next) {
  try {
    await consultasService.remove(req.params.id);
    return res.status(200).json({ message: "Consulta eliminada" });
  } catch (error) {
    return next(error);
  }
}

export async function create(req, res, next) {
  try {
    const id = await consultasService.create(req.validatedBody);
    return res.status(201).json({ mensaje: "Consulta recibida", id });
  } catch (error) {
    return next(error);
  }
}
