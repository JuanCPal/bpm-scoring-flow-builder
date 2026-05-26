import { FaArrowLeft, FaTimes } from "react-icons/fa";
import ReactFlow, { Background } from "reactflow";
import { FlowWrapper } from "@/components/shared/flow/FlowWrapper";
import { FlowWrapperVar } from "@/components/shared/flow/FlowWrapperVar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { loadNodeFlow } from "@/lib/api-client";

export function BaseModal({ selectedNode, setOpenBaseModal, arbol }) {
  const idNodo = selectedNode?.id;
  const labelNode = selectedNode?.data?.label;
  const [projectVar, setProjectVar] = useState({ nodes: [], edges: [] });

  useEffect(() => {
    if (!idNodo) return;

    let mounted = true;
    async function load() {
      try {
        const savedDataVar = await loadNodeFlow(idNodo);
        if (!mounted) return;
        if (savedDataVar) setProjectVar(savedDataVar);
      } catch (error) {
        console.error("Error al recuperar datos de node flow:", error);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [idNodo]);

  console.log("selectedNode en baseModal:" + idNodo);
  console.log("ProyectVar", projectVar);
  console.log("ProyectVar edges", projectVar.edges);

  /*
  if (!projectVar) {
    alert("error"+idNodo);
  }    
*/  

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-[999]">
      <div
        className={`bg-white dark:bg-slate-900 pb-5 shadow-2xl px-6 relative 
          w-[100%] h-[100%] max-h-[100vh] max-w-full`}
      >
        {/* Header */} 
        <div
          className={`fixed border-b-1 -ml-6 bg-white dark:bg-slate-800 backdrop-blur-lg 
             rounded-t-lg border-gray-300 dark:border-zinc-500 pt-4 pb-2 px-3 w-[100%]`}
        >
          <div className="flex items-center">
            <p
              className="ml-2 mr-3 -mt-1.5 text-gray-500 dark:text-slate-300 hover:text-gray-800 dark:hover:text-slate-200 cursor-pointer py-2.5 pr-3"
              onClick={() => setOpenBaseModal(false)}
            >
              <FaArrowLeft /> 
            </p>
            {/* Breadcrumbs de ejemplo */}
            <nav className="flex z-[9999]">
              <span className="cursor-pointer text-[17px] text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-slate-200" onClick={() => setOpenBaseModal(false)}>{arbol}</span>
              <span className="mx-2 text-[24px] text-gray-400 dark:textslate-500 -mt-1.5">/</span>
              <span className="text-[18px] text-blue-900 dark:text-slate-200 font-bold">{labelNode}</span>
            </nav>
          </div>
        </div>

        <div className="mt-13">

          {/* Gurrumino */}

          <FlowWrapperVar
            selectedNode={idNodo}
            savedEdgesVar={projectVar.edges}
            savedNodesVar={projectVar.nodes}
          />
        </div>
      </div>
    </div>
  );
}