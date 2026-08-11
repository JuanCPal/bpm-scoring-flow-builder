import { projects, projectDetails } from "@/mocks/mock-data";
import { buildStorageKey, loadFromLocalStorage, saveToLocalStorage } from "@/utils/storage";

const PROJECT_KEY_PREFIX = "Linea";
const NODE_FLOW_KEY_PREFIX = "Proceso";

function getProjectStorageKey(id) {
  return buildStorageKey(PROJECT_KEY_PREFIX, id);
}

function getNodeFlowStorageKey(nodeId) {
  return buildStorageKey(NODE_FLOW_KEY_PREFIX, nodeId);
}

function resolveProjectStorageKey(id) {
  if (!id || typeof window === "undefined") return null;

  if (localStorage.getItem(id) !== null) return id;

  const prefixed = getProjectStorageKey(id);
  if (localStorage.getItem(prefixed) !== null) return prefixed;

  const stripped = id.replace(new RegExp(`^${PROJECT_KEY_PREFIX}_?`, "i"), "");
  if (stripped && localStorage.getItem(stripped) !== null) return stripped;

  return prefixed;
}

function resolveNodeFlowStorageKey(nodeId) {
  if (!nodeId || typeof window === "undefined") return null;
  if (localStorage.getItem(nodeId) !== null) return nodeId;
  const pref = getNodeFlowStorageKey(nodeId);
  if (localStorage.getItem(pref) !== null) return pref;
  const stripped = nodeId.replace(new RegExp(`^${NODE_FLOW_KEY_PREFIX}_?`, "i"), "");
  if (stripped && localStorage.getItem(stripped) !== null) return stripped;
  return pref;
}

export async function getProjects() {
  if (typeof window !== "undefined") {
    const storedProjects = Object.keys(localStorage)
      .map((key) => {
        try {
          return loadFromLocalStorage(key);
        } catch (e) {
          return null;
        }
      })
      .filter((v) => v && (v.nodes !== undefined || v.id));

    if (storedProjects.length > 0) {
      return Promise.resolve(storedProjects);
    }
  }

  return Promise.resolve(projects);
}

export async function getProjectById(id) {
  if (!id) return null;

  if (typeof window !== "undefined") {
    const key = resolveProjectStorageKey(id);
    if (key) {
      const storedProject = loadFromLocalStorage(key);
      if (storedProject) return Promise.resolve(storedProject);
    }

    const fromStorage = Object.keys(localStorage)
      .map((k) => loadFromLocalStorage(k))
      .filter(Boolean)
      .find((p) => p.id === id || p.id === `Linea_${id}` || p.id === `${PROJECT_KEY_PREFIX}_${id}`);

    if (fromStorage) return Promise.resolve(fromStorage);
  }

  return Promise.resolve(projectDetails[id] || null);
}

export async function saveProject(project) {
  if (!project?.id) {
    return Promise.reject(new Error("Proyecto inválido"));
  }

  const payload = {
    ...project,
    savedAt: project.savedAt || new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    const key = resolveProjectStorageKey(project.id) || getProjectStorageKey(project.id);
    saveToLocalStorage(key, payload);
  }

  return Promise.resolve(payload);
}

export async function saveNodeFlow(nodeId, nodes, edges) {
  if (!nodeId) {
    return Promise.reject(new Error("NodeId inválido"));
  }

  const payload = {
    id: getNodeFlowStorageKey(nodeId),
    nodes,
    edges,
    savedAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    const key = resolveNodeFlowStorageKey(nodeId) || payload.id;
    saveToLocalStorage(key, payload);
  }

  return Promise.resolve(payload);
}

export async function loadNodeFlow(nodeId) {
  if (!nodeId) return { nodes: [], edges: [] };

  if (typeof window !== "undefined") {
    const key = resolveNodeFlowStorageKey(nodeId);
    const saved = key ? loadFromLocalStorage(key) : null;
    return Promise.resolve(saved || { nodes: [], edges: [] });
  }

  return Promise.resolve({ nodes: [], edges: [] });
}

export async function apiRequest(url, options) {
  return Promise.reject(new Error("API no configurada"));
}
