import useAuthStore from "../store/useAuthStore";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function apiFetch(ruta, opciones = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...opciones.headers,
  };
  const token = useAuthStore.getState().token;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${ruta}`, { ...opciones, headers });
  if (response.status === 401) {
    useAuthStore.getState().logout();
  }

  const resultado = response.status === 204 ? null : await response.json();
  if (!response.ok) {
    throw new Error(resultado?.message || "No se pudo completar la solicitud.");
  }

  return resultado;
}
