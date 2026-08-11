/**
 * @typedef {Object} NodeData
 * @property {string} [nombre]
 * @property {string} [descripcion]
 * @property {string} [orden]
 * @property {string} [SiguientePaso]
 * @property {string} [ProcesoNegado]
 * @property {string} [CTLTiempos]
 */

/**
 * @typedef {Object} FlowNode
 * @property {string} id
 * @property {string} type
 * @property {NodeData} data
 * @property {Object} position
 */

export const nodeShape = {
  id: "string",
  type: "string",
  data: {},
  position: {},
};
