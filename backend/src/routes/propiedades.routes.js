import { Router } from "express";
import { create, getAll, getById, remove, update } from "../controllers/propiedades.controller.js";
import { authenticateToken, requireRole } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import propiedadSchema from "../schemas/propiedad.schema.js";

const router = Router();

router.post(
  "/",
  authenticateToken,
  requireRole("admin", "agente"),
  validate(propiedadSchema),
  create
);
router.put(
  "/:id",
  authenticateToken,
  requireRole("admin", "agente"),
  validate(propiedadSchema),
  update
);
router.delete("/:id", authenticateToken, requireRole("admin", "agente"), remove);
router.get("/", getAll);
router.get("/:id", getById);

export default router;
