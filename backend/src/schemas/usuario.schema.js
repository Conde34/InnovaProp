import { z } from "zod";

const usuarioUpdateSchema = z
  .object({
    nombre: z.string().trim().min(2).max(60).optional(),
    apellido: z.string().trim().min(2).max(60).optional(),
    email: z.string().trim().email("Ingresá un email válido.").max(120).optional(),
    telefono: z.string().trim().max(25).nullable().optional(),
    rol: z.enum(["cliente", "agente", "admin"]).optional(),
    activo: z.boolean().optional(),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres.").optional(),
  })
  .strict();

export default usuarioUpdateSchema;
