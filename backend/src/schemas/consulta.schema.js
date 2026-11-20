import { z } from "zod";

const telefonoSchema = z
  .string()
  .trim()
  .optional()
  .refine(
    (telefono) => !telefono || /^[0-9+\-()\s]{8,20}$/.test(telefono),
    "Ingresá un teléfono válido."
  );

const consultaSchema = z
  .object({
    nombre: z.string().trim().min(2, "Ingresá tu nombre (mínimo 2 caracteres)."),
    email: z.string().trim().email("Ingresá un email válido."),
    telefono: telefonoSchema,
    motivo: z.string().trim().min(1, "Elegí el motivo de tu consulta."),
    mensaje: z.string().trim().min(10, "Contanos un poco más (mínimo 10 caracteres)."),
  })
  .strict();

export default consultaSchema;
