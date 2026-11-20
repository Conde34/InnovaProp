import { apiFetch } from "./api";

export function listarConsultas() {
  return apiFetch("/api/consultas");
}

export function eliminarConsulta(id) {
  return apiFetch(`/api/consultas/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
