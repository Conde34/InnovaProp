import { Router } from "express";
import { create } from "../controllers/consultas.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import consultaSchema from "../schemas/consulta.schema.js";

const router = Router();

router.post("/", validate(consultaSchema), create);

export default router;
