const STORAGE_KEY = "propiedades";

function readStoredProperties() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === null) return null;

  let properties;
  try {
    properties = JSON.parse(saved);
  } catch {
    throw new Error("La lista guardada de propiedades no tiene un formato válido.");
  }

  if (!Array.isArray(properties)) {
    throw new Error("La lista guardada de propiedades no tiene un formato válido.");
  }

  return properties;
}

function saveProperties(properties) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
  } catch {
    throw new Error("No se pudieron guardar los cambios de propiedades.");
  }

  return properties;
}

export const getCasas = async () => {
  const storedProperties = readStoredProperties();
  if (storedProperties) return storedProperties;

  const response = await fetch("/data/propiedades.json");
  if (!response.ok) {
    throw new Error("No se pudieron cargar las propiedades");
  }

  const data = await response.json();
  if (!Array.isArray(data.casas)) {
    throw new Error("El archivo de propiedades no tiene el formato esperado");
  }

  return saveProperties(data.casas);
};

export const crearCasa = async (property) => {
  const properties = await getCasas();
  const nextId =
    properties.reduce(
      (highestId, item) => Math.max(highestId, Number(item.id) || 0),
      0,
    ) + 1;

  return saveProperties([...properties, { ...property, id: nextId }]);
};

export const actualizarCasa = async (id, changes) => {
  const properties = await getCasas();
  const exists = properties.some((property) => String(property.id) === String(id));
  if (!exists) throw new Error("No se encontró la propiedad que querés editar.");

  return saveProperties(
    properties.map((property) =>
      String(property.id) === String(id)
        ? { ...property, ...changes, id: property.id }
        : property,
    ),
  );
};

export const eliminarCasa = async (id) => {
  const properties = await getCasas();
  const updatedProperties = properties.filter(
    (property) => String(property.id) !== String(id),
  );
  if (updatedProperties.length === properties.length) {
    throw new Error("No se encontró la propiedad que querés eliminar.");
  }

  return saveProperties(updatedProperties);
};
