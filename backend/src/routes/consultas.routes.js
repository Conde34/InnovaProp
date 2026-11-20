import { Router } from "express";
import { create, getAll, remove } from "../controllers/consultas.controller.js";
import { authenticateToken, requireRole } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import consultaSchema from "../schemas/consulta.schema.js";

const router = Router();

router.get("/", authenticateToken, requireRole("admin"), getAll);
router.delete("/:id", authenticateToken, requireRole("admin"), remove);
router.post("/", validate(consultaSchema), create);

export default router;
