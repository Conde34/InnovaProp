import { apiFetch } from "./api";

export function listarFavoritos() {
  return apiFetch("/api/favoritos");
}

export function agregarFavorito(id) {
  return apiFetch(`/api/favoritos/${encodeURIComponent(id)}`, {
    method: "POST",
  });
}

export function quitarFavorito(id) {
  return apiFetch(`/api/favoritos/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
