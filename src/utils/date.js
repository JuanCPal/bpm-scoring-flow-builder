/**
 * Formatea una fecha ISO a un string legible en español.
 * @param {string} isoDate
 * @returns {string}
 */
export function formatDate(isoDate) {
  try {
    const date = new Date(isoDate);
    return date.toLocaleString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return isoDate;
  }
}
