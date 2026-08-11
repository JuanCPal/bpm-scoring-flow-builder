import { ReactFlowProvider } from "reactflow";
import FlowWithContainers from "@/components/shared/flow/FlowEditor";
import { useEffect, useState } from "react";
import { getProjectById } from "@/lib/api-client";

export function FlowWrapper({ projectId, savedEdges: initialEdges = [], savedNodes: initialNodes = [], savedId }) {
  const id = projectId || savedId;
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [idState, setIdState] = useState(id);

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!id) return;
      const p = await getProjectById(id);
      if (!mounted) return;
      if (p) {
        setNodes(p.nodes || []);
        setEdges(p.edges || []);
        setIdState(p.id || id);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <ReactFlowProvider>
      <FlowWithContainers savedNodes={nodes} savedEdges={edges} savedId={idState} />
    </ReactFlowProvider>
  );
}
