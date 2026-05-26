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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50">
      <div
        className={`bg-white pb-5 rounded-lg shadow-2xl px-6 relative ${
          selectedNode.type === "Variable"
            ? "w-[1100px] max-h-[98%] overflow-y-auto"
            : "w-[600px] max-h-[80vh] overflow-y-auto"
        } max-w-full`}
      >
        {/* Header */}
        <div
          className={`fixed border-b-1 -ml-6 bg-white pt-3 rounded-t-lg border-gray-300 pb-1 px-3 ${
            selectedNode.type === "Variable" ? "w-[1100px]" : "w-[600px]"
          }`}
        >
          <div className="flex items-center">
            <h2 className="text-[16px] text-blue-900 font-bold">
              {selectedNode.data?.proceso || selectedNode.data?.label}
            </h2>
            <button
              onClick={() =>
                selectedNode?.type === "Variable"
                  ? handleEditVariable()
                  : handleEditProceso()
              }
              className="absolute right-14 -mt-1.5 px-3 py-1 text-[14px] bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              Guardar
            </button>
            <p
              className="absolute right-6 text-gray-500 hover:text-gray-800 cursor-pointer"
              onClick={() => setSelectedProceso(null)}
            >
              <FaTimes />
            </p>
          </div>
        </div>

        {/* Contenido */}
        <div className="mt-15 space-y-4">
          {/* Breadcrumbs */}
          <nav className="flex text-sm text-gray-600 mb-4">
            <span className="cursor-pointer hover:text-blue-600">{arbol}</span>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">
              {selectedNode.data?.proceso || selectedNode.data?.label}
            </span>
          </nav>

          {/* Buscador */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar variable..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
                focus:outline-none focus:border-blue-500 text-sm text-gray-700 bg-gray-50"
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
                      className="p-3 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 flex justify-between items-center transition"
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          {variableNode?.data?.label || childId}
                        </p>
                        <p className="text-sm text-gray-500">
                          {variableNode?.data?.parametros?.descripcionVar ||
                            "Sin descripción"}
                        </p>
                      </div>
                      <button
                        className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50 transition"
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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50">
      <div
        className={`bg-white pb-5 rounded-lg shadow-2xl px-6 relative ${
          selectedNode.type === "Variable"
            ? "w-[1100px] max-h-[98%] overflow-y-auto"
            : "w-[1100px]"
        } max-w-full`}
      >
        {/* Header */}
        <div
          className={`fixed border-b-1 -ml-6 bg-blue-50/50 backdrop-blur-lg pt-3 rounded-t-lg border-gray-300 pb-1 px-3 ${
            selectedNode.type === "Variable" ? "w-[1100px]" : "w-[400px]"
          }`}
        >
          <div className="flex">
            <p
              className="ml-2 mr-3 mt-1 text-gray-500 hover:text-gray-800 cursor-pointer"
              onClick={() => {
                setSelectedVariable(false);
                setSelectedProceso(true);
              }}
            >
              <FaArrowLeft />
            </p>
            <h2 className="text-[18px] text-blue-900 font-bold">
              <span>
                {selectedNode.data?.proceso ||
                  selectedNode.data?.variable ||
                  selectedNode.data?.label}
              </span>
            </h2>

            <p
              className="absolute right-6 text-gray-500 hover:text-gray-800 cursor-pointer"
              onClick={() => setSelectedVariable(false)}
            >
              <FaTimes />
            </p>
          </div>
        </div>

        {/* Contenido */}
        <div className="mt-15 space-y-4">
          <nav className="flex text-sm text-gray-600">
            <span className="cursor-pointer hover:text-blue-600">{arbol}</span>
            <span className="mx-2">/</span>
            <span className="cursor-pointer hover:text-blue-600">
              {selectedNode.data?.proceso || selectedNode.data?.label}
            </span>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">
              {selectedNode?.data?.variable || "Variable"}
            </span>
          </nav>

          <div className="space-y-4 mt-5">
            <div>
              <span className="text-sm text-gray-700 font-medium">Orden:</span>
              <p className="text-base text-gray-900 mt-1">
                {VariableNode?.data?.nombre || "N/A"}
              </p>
            </div>

            <div>
              <span className="text-sm text-gray-700 font-medium">
                Nombre del proceso:
              </span>
              <p className="text-base text-gray-900 mt-1">
                {VariableNode?.data?.nombre || "N/A"}
              </p>
            </div>

            <div>
              <span className="text-sm text-gray-700 font-medium">Descripción:</span>
              <p className="text-base text-gray-900 mt-1 whitespace-pre-wrap">
                {selectedNode.data?.parametros?.descripcionVar || "Sin descripción"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
