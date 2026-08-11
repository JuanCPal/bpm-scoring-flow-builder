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
    <div className="fixed inset-0 bg-[color:var(--foreground)]/40 backdrop-blur-xs flex items-center justify-center z-[999]">
      <div
        className="relative h-[100%] w-[100%] max-h-[100vh] max-w-full bg-[var(--surface)] px-6 pb-5 shadow-2xl"
      >
        {/* Header */}
        <div
          className="fixed -ml-6 w-[100%] rounded-t-lg border-b border-[var(--border)] bg-[var(--surface-muted)] px-3 pb-2 pt-4 backdrop-blur-lg"
        >
          <div className="flex items-center">
            <button
              type="button"
              className="ml-2 mr-3 -mt-1.5 cursor-pointer py-2.5 pr-3 text-[var(--muted)] transition hover:text-[var(--accent)]"
              onClick={() => setOpenBaseModal(false)}
            >
              <FaArrowLeft />
            </button>
            {/* Breadcrumbs de ejemplo */}
            <nav className="flex z-[9999]">
              <span className="cursor-pointer text-[17px] text-[var(--muted)] transition hover:text-[var(--accent)]" onClick={() => setOpenBaseModal(false)}>{arbol}</span>
              <span className="mx-2 -mt-1.5 text-[24px] text-[var(--border)]">/</span>
              <span className="text-[18px] font-bold text-[var(--foreground)]">{labelNode}</span>
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