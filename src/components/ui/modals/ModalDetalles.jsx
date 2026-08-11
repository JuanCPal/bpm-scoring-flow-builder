import { FaTimes, FaSearch, FaArrowLeft } from "react-icons/fa";

export function ModalProceso({
  selectedNode,
  setSelectedProceso,
  setSelectedVariable,
  handleEditVariable,
  handleEditProceso,
  arbol,
  searchTerm,
  setSearchTerm,
  nodes,
}) {
  if (!selectedNode) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[color:var(--foreground)]/40 backdrop-blur-xs z-50">
      <div
        className={`rounded-lg bg-[var(--surface)] px-6 pb-5 shadow-2xl relative ${
          selectedNode.type === "Variable"
            ? "w-[1100px] max-h-[98%] overflow-y-auto"
            : "w-[600px] max-h-[80vh] overflow-y-auto"
        } max-w-full`}
      >
        {/* Header */}
        <div
          className={`fixed -ml-6 rounded-t-lg border-b border-[var(--border)] bg-[var(--surface-muted)] px-3 pb-1 pt-3 ${
            selectedNode.type === "Variable" ? "w-[1100px]" : "w-[600px]"
          }`}
        >
          <div className="flex items-center">
            <h2 className="text-[16px] font-bold text-[var(--foreground)]">
              {selectedNode.data?.proceso || selectedNode.data?.label}
            </h2>
            <button
              onClick={() =>
                selectedNode?.type === "Variable"
                  ? handleEditVariable()
                  : handleEditProceso()
              }
              className="absolute right-14 -mt-1.5 cursor-pointer rounded-lg bg-[var(--accent)] px-3 py-1 text-[14px] text-[var(--accent-foreground)] transition hover:opacity-90"
            >
              Guardar
            </button>
            <p
              className="absolute right-6 cursor-pointer text-[var(--muted)] transition hover:text-[var(--foreground)]"
              onClick={() => setSelectedProceso(null)}
            >
              <FaTimes />
            </p>
          </div>
        </div>

        {/* Contenido */}
        <div className="mt-15 space-y-4">
          {/* Breadcrumbs */}
          <nav className="mb-4 flex text-sm text-[var(--muted)]">
            <span className="cursor-pointer transition hover:text-[var(--accent)]">{arbol}</span>
            <span className="mx-2">/</span>
            <span className="font-medium text-[var(--foreground)]">
              {selectedNode.data?.proceso || selectedNode.data?.label}
            </span>
          </nav>

          {/* Buscador */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
            <input
              type="text"
              placeholder="Buscar variable..."
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] py-2 pl-10 pr-3 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <h3 className="text-lg font-semibold mb-2">Variables:</h3>

          {selectedNode.data.children && selectedNode.data.children.length > 0 ? (
            <ul className="space-y-2">
              {selectedNode.data.children
                .filter((childId) => {
                  const variableNode = nodes.find((n) => n.id === childId);
                  const label = variableNode?.data?.label?.toLowerCase() || "";
                  const desc =
                    variableNode?.data?.parametros?.descripcionVar?.toLowerCase() ||
                    "";
                  return (
                    label.includes(searchTerm.toLowerCase()) ||
                    desc.includes(searchTerm.toLowerCase())
                  );
                })
                .map((childId) => {
                  const variableNode = nodes.find((n) => n.id === childId);
                  return (
                    <li
                      key={childId}
                      className="flex items-center justify-between rounded-lg border border-[var(--border)] p-3 shadow-sm transition hover:bg-[var(--surface-muted)]"
                    >
                      <div>
                        <p className="font-medium text-[var(--foreground)]">
                          {variableNode?.data?.label || childId}
                        </p>
                        <p className="text-sm text-[var(--muted)]">
                          {variableNode?.data?.parametros?.descripcionVar ||
                            "Sin descripción"}
                        </p>
                      </div>
                      <button
                        className="rounded-lg px-3 py-1 text-sm text-[var(--accent)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--accent)]"
                        onClick={() => {
                          setSelectedVariable(true);
                          setSelectedProceso(false);
                        }}
                      >
                        Ver detalles
                      </button>
                    </li>
                  );
                })}
            </ul>
          ) : (
            <p>No hay variables asociadas.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function ModalVariable({
  selectedNode,
  VariableNode,
  setSelectedVariable,
  setSelectedProceso,
  arbol,
}) {
  if (!selectedNode) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[color:var(--foreground)]/40 backdrop-blur-xs z-50">
      <div
        className={`rounded-lg bg-[var(--surface)] px-6 pb-5 shadow-2xl relative ${
          selectedNode.type === "Variable"
            ? "w-[1100px] max-h-[98%] overflow-y-auto"
            : "w-[1100px]"
        } max-w-full`}
      >
        {/* Header */}
        <div
          className={`fixed -ml-6 rounded-t-lg border-b border-[var(--border)] bg-[var(--surface-muted)] px-3 pb-1 pt-3 backdrop-blur-lg ${
            selectedNode.type === "Variable" ? "w-[1100px]" : "w-[400px]"
          }`}
        >
          <div className="flex">
            <p
              className="ml-2 mr-3 mt-1 cursor-pointer text-[var(--muted)] transition hover:text-[var(--foreground)]"
              onClick={() => {
                setSelectedVariable(false);
                setSelectedProceso(true);
              }}
            >
              <FaArrowLeft />
            </p>
            <h2 className="text-[18px] font-bold text-[var(--foreground)]">
              <span>
                {selectedNode.data?.proceso ||
                  selectedNode.data?.variable ||
                  selectedNode.data?.label}
              </span>
            </h2>

            <p
              className="absolute right-6 cursor-pointer text-[var(--muted)] transition hover:text-[var(--foreground)]"
              onClick={() => setSelectedVariable(false)}
            >
              <FaTimes />
            </p>
          </div>
        </div>

        {/* Contenido */}
        <div className="mt-15 space-y-4">
          <nav className="flex text-sm text-[var(--muted)]">
            <span className="cursor-pointer transition hover:text-[var(--accent)]">{arbol}</span>
            <span className="mx-2">/</span>
            <span className="cursor-pointer transition hover:text-[var(--accent)]">
              {selectedNode.data?.proceso || selectedNode.data?.label}
            </span>
            <span className="mx-2">/</span>
            <span className="font-medium text-[var(--foreground)]">
              {selectedNode?.data?.variable || "Variable"}
            </span>
          </nav>

          <div className="space-y-4 mt-5">
            <div>
              <span className="text-sm font-medium text-[var(--foreground)]">Orden:</span>
              <p className="mt-1 text-base text-[var(--foreground)]">
                {VariableNode?.data?.nombre || "N/A"}
              </p>
            </div>

            <div>
              <span className="text-sm font-medium text-[var(--foreground)]">
                Nombre del proceso:
              </span>
              <p className="mt-1 text-base text-[var(--foreground)]">
                {VariableNode?.data?.nombre || "N/A"}
              </p>
            </div>

            <div>
              <span className="text-sm font-medium text-[var(--foreground)]">Descripción:</span>
              <p className="mt-1 whitespace-pre-wrap text-base text-[var(--foreground)]">
                {selectedNode.data?.parametros?.descripcionVar || "Sin descripción"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
