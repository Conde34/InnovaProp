const API_URL = "http://localhost:3000/api";

export const getPropiedades = async (filtros = {}) => {
  const params = new URLSearchParams(filtros);
  const respuesta = await fetch(`${API_URL}/propiedades?${params}`);
  if (!respuesta.ok) throw new Error("No se pudieron cargar las propiedades");
  return respuesta.json();
};

export const getPropiedadPorId = async (id) => {
  const respuesta = await fetch(`${API_URL}/propiedades/${id}`);
  if (!respuesta.ok) throw new Error("Propiedad no encontrada");
  return respuesta.json();
};