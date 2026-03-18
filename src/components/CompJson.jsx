import Tippy from "@tippyjs/react";
import { useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function PanelJson({ nodes, edges, arbol, selectedNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const nameCounter = useRef(1);
  const getName = () => (nameCounter.current++).toString();

  const saveToLocalStorage = () => {
    const data = {
      id: "Linea " + arbol,
      nodes,
      edges,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(data.id, JSON.stringify(data));
    alert(`Árbol ${data.id} guardado`);
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
          className={`px-1.5 rounded-md py-[7px] mt-1 cursor-pointer mr-2 transition-all duration-300 ${isOpen ? " dark:text-black font-bold dark:font-normal text-zinc-100 bg-blue-400 border-1 border-blue-400 pr-6" : "bg-gray-800 dark:bg-blue-400 text-blue-200 dark:text-zinc-800" }`}
        >
          {isOpen ? <FaArrowRight className="-mr-1.5 -mt-0.5"  /> : <FaArrowLeft />}
        </button>
      </div>
    </Tippy>

      <div
        className={`bg-white dark:bg-slate-800 border-zinc-500 pt-2 ml-1 transition-transform duration-300 absolute z-[999] top-14 right-0 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        w-[360px] max-h-[90vh] min-h-[89vh] border-l-1 border-gray-300 overflow-hidden`}
      >

       <button
          onClick={() => {
            setActiveTab("info");
            setIsOpen(true);
          }}
          className={`px-1.5 py-0.5 ml-[34px] cursor-pointer border-blue-400 border-1 rounded-l-md w-38 ${activeTab === "info" ? "bg-blue-400 text-slate-900" : "bg-transparent text-blue-400"
            }`}
        >
          JSON
        </button>
        <button
          onClick={() => {
            setActiveTab("details");
            setIsOpen(true);
          }}
          className={`px-1.5 py-0.5 mb-3 w-38 cursor-pointer border-blue-400 border-1 rounded-r-md ${activeTab === "details" ? "bg-blue-400 text-slate-900" : "bg-transparent text-blue-400"
            }`}
        >
          Propiedades
        </button>
       

        {activeTab === "info" && (
          <>
            <h2 className="text-lg font-bold mb-2 ml-4 ">Edges JSON</h2>
            <pre className="text-sm dark:selection:bg-slate-600/60 selection:bg-blue-300/60 dark:selection:text-blue-300 selection:text-slate-600 bg-blue-50 dark:bg-slate-800/60 dark:text-blue-200 text-slate-700 p-2 ml-2 mr-4 h-[210px] rounded shadow overflow-y-scroll overflow-x-scroll scrollbar scrollbar-thumb-blue-500 scrollbar-track-gray-800">
              {JSON.stringify(edges, null, 2)}
            </pre>
            <h2 className="text-lg mt-3 font-bold mb-2 ml-4">Nodes JSON</h2>
            <pre className="text-sm dark:selection:bg-slate-600/60 selection:bg-blue-300/60 dark:selection:text-blue-300 selection:text-slate-600 bg-blue-50 dark:bg-slate-800 dark:text-blue-200 text-slate-700 p-2 ml-2 mr-4 h-[210px] rounded shadow overflow-y-scroll overflow-x-scroll">
              {JSON.stringify(nodes, null, 2)}
            </pre>
          </>
        )}

        {activeTab === "details" && (
          <>
            <h2 className="text-xl font-mono font-semibold dark:text-zinc-400 text-gray-800 pb-2 ml-4">
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
      <p className=" text-gray-500 dark:text-zinc-400 mx-6 mt-4">
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
          <div key={key} className="bg-white dark:bg-slate-800 shadow-sm rounded-md p-4">
            {/* Título de sección */}
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-zinc-400 mb-3">
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
                        className="text-xs text-gray-500 dark:text-zinc-400 text-left font-medium truncate cursor-default"
                        title={paramKey}
                      >
                        {paramKey}:
                      </div>
                      <div
                        key={paramKey + "-value"}
                        className="text-[13px] text-gray-900 dark:text-gray-100"
                      >
                        {String(paramValue)}
                      </div>
                    </>
                  ))}
                </div>
              ) : (
                <pre className="text-xs bg-gray-100 dark:bg-zinc-700 p-2 rounded break-words">
                  {JSON.stringify(value, null, 2)}
                </pre>
              )
            ) : (
              <p className="text-sm text-gray-900 dark:text-gray-100 truncate">{String(value)}</p>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 font-mono ml-4">No hay información en este nodo.</p>
      )}
    </div>
  );
}