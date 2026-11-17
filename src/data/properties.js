export const getCasas = async () => {
  const response = await fetch("/data/propiedades.json");

  if (!response.ok) {
    throw new Error("No se pudieron cargar las propiedades");
  }

  const data = await response.json();

  if (!Array.isArray(data.casas)) {
    throw new Error("El archivo de propiedades no tiene el formato esperado");
  }

  return data.casas;
};
