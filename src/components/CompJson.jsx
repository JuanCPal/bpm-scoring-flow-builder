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
      <div className="flex absolute top-15 right-1 z-[9999]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`px-2 rounded-md py-[7px] mt-1 cursor-pointer mr-2 ${isOpen ? "bg-transparent text-black text-[20px]" : "bg-gray-800 text-blue-200" }`}
        >
          {isOpen ? <FaArrowRight className="-mr-1.5 -mt-0.5"  /> : <FaArrowLeft />}
        </button>
      </div>
      </Tippy>

      <div
        className={`bg-white border-gray-400 pt-2 ml-1 transition-transform duration-300 absolute z-[999] top-14 right-0 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        w-[350px] max-h-[90vh] min-h-[89vh] border-l-1 border-gray-300 overflow-hidden`}
      >

        <button
          onClick={() => {
            setActiveTab("info");
            setIsOpen(true);
          }}
          className={`px-3 py-0.5 ml-4 border-none rounded-l-md w-37 ${activeTab === "info" ? "bg-black text-blue-200" : "bg-blue-200 text-black"
            }`}
        >
          Data
        </button>
        <button
          onClick={() => {
            setActiveTab("details");
            setIsOpen(true);
          }}
          className={`px-3 py-0.5 mb-3 w-37 ${activeTab === "details" ? "bg-black text-blue-200" : "bg-blue-200 text-black"
            }`}
        >
          Details
        </button>

        {activeTab === "info" && (
          <>
            <h2 className="text-lg font-bold mb-2 ml-4 ">Edges JSON</h2>
            <pre className="text-sm bg-blue-50 p-2 ml-2 mr-4 h-[210px] rounded shadow overflow-y-scroll overflow-x-scroll">
              {JSON.stringify(edges, null, 2)}
            </pre>
            <h2 className="text-lg mt-3 font-bold mb-2 ml-4">Nodes JSON</h2>
            <pre className="text-sm bg-blue-50 p-2 ml-2 mr-4 h-[210px] rounded shadow overflow-y-scroll overflow-x-scroll">
              {JSON.stringify(nodes, null, 2)}
            </pre>
          </>
        )}

        {activeTab === "details" && (
          <>
            <h2 className="text-xl font-semibold underline text-gray-800 pb-2 ml-4">
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
  if (!node) return <p className="italic text-gray-600 mx-6">Selecciona un nodo para ver detalles.</p>;

  const data = node.data ?? {};
  const excludedKeys = ["label", "nombre", "width", "height", "children", "isDroppable"];
  const entries = Object.entries(data).filter(([key]) => !excludedKeys.includes(key));

  return (
    <div className="max-h-[60vh] overflow-auto space-y-4">
      {entries.length ? (
        entries.map(([key, value]) => (
          <div key={key} className="bg-blue-50 p-3 rounded-md">
            <p className="text-gray-600 text-[15px] mb-1">
              <b>Resumen: </b>:
            </p>
            {typeof value === "object" && value !== null ? (
              key === "parametros" ? (
                <div className=" ml-2 text-gray-600 text-[14px] mb-2">
                  {Object.entries(value).map(([paramKey, paramValue]) => (
                    <p key={paramKey}> 
                      <span className="font-[600] text-gray-800">{paramKey}: </span> {String(paramValue)}
                    </p>
                  ))}
                </div>
              ) : (
                <pre className="text-xs bg-gray-100 p-2 rounded">{JSON.stringify(value, null, 2)}</pre>
              )
            ) : (
              <p className="text-gray-800">{String(value)}</p>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 ml-4">No hay información relevante en este nodo.</p>
      )}
    </div>
  );
}