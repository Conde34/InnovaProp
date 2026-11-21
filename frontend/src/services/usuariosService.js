import { apiFetch } from "./api";

export function listarUsuarios() {
  return apiFetch("/api/usuarios");
}

export function actualizarUsuario(id, datos) {
  return apiFetch(`/api/usuarios/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(datos),
  });
}

export function eliminarUsuario(id) {
  return apiFetch(`/api/usuarios/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
