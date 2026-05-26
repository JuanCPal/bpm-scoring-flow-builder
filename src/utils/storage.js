/**
 * Lee un valor JSON de localStorage con seguridad.
 * @param {string} key
 * @returns {any|null}
 */
export function loadFromLocalStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error(`Error parsing localStorage item ${key}:`, error);
    return null;
  }
}

/**
 * Guarda un valor en localStorage en formato JSON.
 * @param {string} key
 * @param {any} value
 */
export function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving localStorage item ${key}:`, error);
  }
}

/**
 * Devuelve una clave de almacenamiento consistente.
 * @param {string} prefix
 * @param {string} id
 * @returns {string}
 */
export function buildStorageKey(prefix, id) {
  return `${prefix}_${id}`;
}
