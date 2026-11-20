import { z } from "zod";

export const registerSchema = z
  .object({
    nombre: z.string().trim().min(2, "Ingresá un nombre válido."),
    apellido: z.string().trim().min(2, "Ingresá un apellido válido."),
    email: z.string().trim().email("Ingresá un email válido."),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
    telefono: z.string().trim().max(25).optional(),
  })
  .strict();

export const loginSchema = z
  .object({
    email: z.string().trim().email("Ingresá un email válido."),
    password: z.string().min(1, "Ingresá tu contraseña."),
  })
  .strict();
