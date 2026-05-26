import { ReactFlowProvider } from "reactflow";
import FlowWithContainers from "@/components/shared/flow/FlowEditor";

export function FlowWrapper({ projectId, savedEdges, savedNodes, savedId }) {

  if (typeof window !== "undefined") {
    const savedData = JSON.parse(localStorage.getItem(projectId));
    if (savedData) {
      savedNodes = savedData.nodes || [];
      savedEdges = savedData.edges || [];
      savedId = savedData.id || [];
    }
  }
  
  console.log("idNombre en wrapper", savedId)

  return (
    <ReactFlowProvider>
      <FlowWithContainers savedNodes={savedNodes} savedEdges={savedEdges} savedId={savedId} />
    </ReactFlowProvider>
  );
}
