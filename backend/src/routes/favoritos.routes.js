import { Router } from "express";
import { add, getAll, remove } from "../controllers/favoritos.controller.js";
import { authenticateToken, requireRole } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authenticateToken, requireRole("cliente"), getAll);
router.post("/:id", authenticateToken, requireRole("cliente"), add);
router.delete("/:id", authenticateToken, requireRole("cliente"), remove);

export default router;
