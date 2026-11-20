import * as consultasService from "../services/consultas.service.js";

export async function create(req, res, next) {
  try {
    const id = await consultasService.create(req.validatedBody);
    return res.status(201).json({ mensaje: "Consulta recibida", id });
  } catch (error) {
    return next(error);
  }
}
