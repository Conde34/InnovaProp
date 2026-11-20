import { apiFetch } from "./api";

export function listarPropiedades() {
  return apiFetch("/api/propiedades");
}

export function obtenerPropiedad(id) {
  return apiFetch(`/api/propiedades/${encodeURIComponent(id)}`);
}

export function crearPropiedad(datos) {
  return apiFetch("/api/propiedades", {
    method: "POST",
    body: JSON.stringify(datos),
  });
}

export function actualizarPropiedad(id, datos) {
  return apiFetch(`/api/propiedades/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(datos),
  });
}

export function eliminarPropiedad(id) {
  return apiFetch(`/api/propiedades/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
