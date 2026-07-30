import Tippy from "@tippyjs/react";
import { useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { saveProject } from "@/lib/api-client";

export default function PanelJson({ nodes, edges, arbol, selectedNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const nameCounter = useRef(1);
  const getName = () => (nameCounter.current++).toString();

  const saveToLocalStorage = async () => {
    const data = {
      id: arbol,
      nodes,
      edges,
      savedAt: new Date().toISOString(),
    };

    try {
      await saveProject(data);
      alert(`Árbol ${data.id} guardado`);
    } catch (error) {
      console.error("Error guardando proyecto:", error);
      alert("No se pudo guardar el proyecto. Revisa la consola.");
    }
  };

  return (
    < >
    <Tippy
    content={isOpen ? "Ocultar panel" : "Mostrar detalles"}
    placement={isOpen ? "bottom" : "left"}
    >
      <div className={`flex absolute top-15 right-1 z-[9999] ${isOpen ? "right-[320px]" : ""}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`px-1.5 rounded-md py-[7px] mt-1 cursor-pointer mr-2 transition-all duration-300 ${isOpen ? "font-bold dark:font-normal text-[var(--accent-foreground)] bg-[var(--accent)] border-1 border-[var(--accent)] pr-6" : "bg-[var(--surface)] text-[var(--accent)] border-1 border-[var(--border)]" }`}
        >
          {isOpen ? <FaArrowRight className="-mr-1.5 -mt-0.5"  /> : <FaArrowLeft />}
        </button>
      </div>
    </Tippy>

      <div
        className={`bg-[var(--surface)] border-[var(--border)] shadow pt-2 ml-1 transition-transform duration-300 absolute z-[999] top-14 right-0 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        w-[360px] max-h-[90vh] min-h-[89vh] border-l-1 overflow-hidden`}
      >

       <button
          onClick={() => {
            setActiveTab("info");
            setIsOpen(true);
          }}
          className={`px-1.5 py-0.5 ml-[34px] cursor-pointer border-[var(--accent)] border-1 rounded-l-md w-38 ${activeTab === "info" ? "bg-[var(--accent)] text-[var(--accent-foreground)]" : "bg-transparent text-[var(--accent)]"
            }`}
        >
          JSON
        </button>
        <button
          onClick={() => {
            setActiveTab("details");
            setIsOpen(true);
          }}
          className={`px-1.5 py-0.5 mb-3 w-38 cursor-pointer border-[var(--accent)] border-1 rounded-r-md ${activeTab === "details" ? "bg-[var(--accent)] text-[var(--accent-foreground)]" : "bg-transparent text-[var(--accent)]"
            }`}
        >
          Propiedades
        </button>
      
        {activeTab === "info" && (
          <>
            <h2 className="text-lg font-bold mb-2 ml-4 ">Edges JSON</h2>
            <pre className="text-sm selection:bg-[var(--accent)] selection:text-[var(--accent-foreground)] bg-[var(--surface-muted)] text-[var(--foreground)] p-2 ml-2 mr-4 h-[210px] rounded shadow overflow-y-scroll overflow-x-scroll scrollbar scrollbar-thumb-[var(--accent)] scrollbar-track-[var(--surface)]">
              {JSON.stringify(edges, null, 2)}
            </pre>
            <h2 className="text-lg mt-3 font-bold mb-2 ml-4">Nodes JSON</h2>
            <pre className="text-sm selection:bg-[var(--accent)] selection:text-[var(--accent-foreground)] bg-[var(--surface-muted)] text-[var(--foreground)] p-2 ml-2 mr-4 h-[210px] rounded shadow overflow-y-scroll overflow-x-scroll">
              {JSON.stringify(nodes, null, 2)}
            </pre>
          </>
        )}

        {activeTab === "details" && (
          <>
            <h2 className="text-xl font-mono font-semibold text-[var(--foreground)] pb-2 ml-4">
              {selectedNode?.data?.nombre || selectedNode?.data?.label}
            </h2>
            <NodeDetails node={selectedNode} />
          </>
        )}
      </div>
    </>
  );
}

function NodeDetails({ node }) {
  if (!node)
    return (
      <p className="text-[var(--muted)] mx-6 mt-4">
        Selecciona un nodo para ver detalles.
      </p>
    );

  const data = node.data ?? {};
  const excludedKeys = ["label", "nombre", "width", "height", "children", "isDroppable"];
  const entries = Object.entries(data).filter(([key]) => !excludedKeys.includes(key));

  return (
    <div className="max-h-[60vh] overflow-auto space-y-6">
      {entries.length ? (
        entries.map(([key, value]) => (
          <div key={key} className="bg-[var(--surface)] border border-[var(--border)] shadow-sm rounded-md p-4">
            {/* Título de sección */}
            <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-3">
              {key.replace(/_/g, " ")}
            </h3>

            {/* Contenido */}
            {typeof value === "object" && value !== null ? (
              key === "parametros" ? (
                <div className="grid grid-cols-[135px_1fr] gap-x-4 gap-y-2">
                  {Object.entries(value).map(([paramKey, paramValue]) => (
                    <>
                      <div
                        key={paramKey + "-label"}
                        className="text-xs text-[var(--muted)] text-left font-medium truncate cursor-default"
                        title={paramKey}
                      >
                        {paramKey}:
                      </div>
                      <div
                        key={paramKey + "-value"}
                        className="text-[13px] text-[var(--foreground)]"
                      >
                        {String(paramValue)}
                      </div>
                    </>
                  ))}
                </div>
              ) : (
                <pre className="text-xs bg-[var(--surface-muted)] text-[var(--foreground)] border border-[var(--border)] p-2 rounded break-words">
                  {JSON.stringify(value, null, 2)}
                </pre>
              )
            ) : (
              <p className="text-sm text-[var(--foreground)] truncate">{String(value)}</p>
            )}
          </div>
        ))
      ) : (
        <p className="text-[var(--muted)] font-mono ml-4">No hay información en este nodo.</p>
      )}
    </div>
  );
}
