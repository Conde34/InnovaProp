import { Router } from "express";
import { getAll, remove, update } from "../controllers/usuarios.controller.js";
import { authenticateToken, requireRole } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import usuarioUpdateSchema from "../schemas/usuario.schema.js";

const router = Router();

router.get("/", authenticateToken, requireRole("admin"), getAll);
router.put(
  "/:id",
  authenticateToken,
  requireRole("admin"),
  validate(usuarioUpdateSchema),
  update
);
router.delete("/:id", authenticateToken, requireRole("admin"), remove);

export default router;
