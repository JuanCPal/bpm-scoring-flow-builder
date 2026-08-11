/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} name
 * @property {string} savedAt
 * @property {Array<FlowNode>} nodes
 * @property {Array<FlowEdge>} edges
 */

/**
 * @typedef {Object} FlowNode
 * @property {string} id
 * @property {string} type
 * @property {Object} data
 * @property {Object} position
 */

/**
 * @typedef {Object} FlowEdge
 * @property {string} id
 * @property {string} source
 * @property {string} target
 * @property {Object} [data]
 */

// Aquí pueden añadirse helpers de validación o normalización de proyectos.

export const projectShape = {
  id: "string",
  name: "string",
  savedAt: "string",
  nodes: [],
  edges: [],
};
