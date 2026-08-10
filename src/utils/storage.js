/**
 * Lee un valor JSON de localStorage con seguridad.
 * @param {string} key
 * @returns {any|null}
 */
export function loadFromLocalStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const normalized = raw.trim();
    if (!normalized) return null;

    // Ignora valores planos (ej. "dark") que no son JSON serializado.
    const looksLikeJson =
      normalized.startsWith("{") ||
      normalized.startsWith("[") ||
      normalized.startsWith('"') ||
      /^-?\d/.test(normalized) ||
      normalized === "true" ||
      normalized === "false" ||
      normalized === "null";

    if (!looksLikeJson) return null;

    return JSON.parse(normalized);
  } catch (error) {
    if (!(error instanceof SyntaxError)) {
      console.error(`Error parsing localStorage item ${key}:`, error);
    }
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
