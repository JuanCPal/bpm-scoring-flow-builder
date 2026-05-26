import { projects, projectDetails } from "@/mocks/mock-data";

/**
 * Simula la obtención de proyectos.
 * Reemplazar por fetch/axios cuando exista una API real.
 */
export async function getProjects() {
  return Promise.resolve(projects);
}

/**
 * Simula la obtención de un proyecto por id.
 * Reemplazar por fetch/axios cuando exista una API real.
 */
export async function getProjectById(id) {
  const project = projectDetails[id] || null;
  return Promise.resolve(project);
}

/**
 * Placeholder para llamadas a la API.
 * Ejemplo:
 * const response = await fetch(`/api/projects/${id}`);
 * return response.json();
 */
export async function apiRequest(url, options) {
  // TODO: implementar API real
  return Promise.reject(new Error("API no configurada"));
}
