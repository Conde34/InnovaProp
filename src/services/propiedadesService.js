import { apiFetch } from "./api";

export function crearPropiedad(datos) {
  return apiFetch("/api/propiedades", {
    method: "POST",
    body: JSON.stringify(datos),
  });
}
