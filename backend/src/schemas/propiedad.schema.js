import { z } from "zod";

const propiedadSchema = z
  .object({
    titulo: z.string().trim().min(1).max(150),
    descripcion: z.string().trim().optional(),
    tipo: z.string().trim().min(1).max(40),
    ubicacion: z.string().trim().min(1).max(80),
    operacion: z.enum(["Venta", "Alquiler"]),
    precio: z.number().finite().min(0),
    moneda: z.enum(["USD", "ARS"]),
    direccion: z.string().trim().min(1).max(150),
    ambientes: z.number().int().min(0),
    dormitorios: z.number().int().min(0),
    banos: z.number().int().min(0),
    superficie: z.number().finite().min(0),
    imagen: z.string().url().max(500).optional(),
    estado: z.enum(["Disponible", "Reservada", "Vendida", "Alquilada"]),
    destacado: z.boolean(),
  })
  .strict();

export default propiedadSchema;
