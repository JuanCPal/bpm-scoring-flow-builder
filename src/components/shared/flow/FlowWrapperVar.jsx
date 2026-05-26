import { ReactFlowProvider } from "reactflow";
import { useEffect, useState } from "react";

import FlowEditorVariables from "@/components/shared/flow/FlowEditorVariables";
import { loadNodeFlow } from "@/lib/api-client";

export function FlowWrapperVar({ selectedNode, savedEdgesVar: initialEdges = [], savedNodesVar: initialNodes = [] }) {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!selectedNode) {
        setNodes(initialNodes);
        setEdges(initialEdges);
        return;
      }

      try {
        const saved = await loadNodeFlow(selectedNode);
        if (!mounted) return;
        if (saved) {
          setNodes(saved.nodes || []);
          setEdges(saved.edges || []);
        }
      } catch (error) {
        console.error("Error loading node flow:", error);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [selectedNode]);

  console.log("selectedNode en el wrapper:" + selectedNode);
  console.log("array de nodes en el wrapper:", nodes);

  return (
    <ReactFlowProvider>
      <FlowEditorVariables
        savedNodesVar={nodes}
        savedEdgesVar={edges}
        selectedNode={selectedNode}
      />
    </ReactFlowProvider>
  );
}
