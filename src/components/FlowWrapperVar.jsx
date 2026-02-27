import { ReactFlowProvider } from "reactflow";

import FlowEditorVariables from "./FlowEditorVariables";

export function FlowWrapperVar({ selectedNode, savedEdgesVar, savedNodesVar }) {

  if (typeof window !== "undefined") {
    const savedDataVar = JSON.parse(localStorage.getItem(selectedNode));
    if (savedDataVar) {
      savedNodesVar = savedDataVar.nodes || [];
      savedEdgesVar = savedDataVar.edges || [];
    }
  }
  console.log("selectedNode en el wrapper:" + selectedNode)
  console.log("array de nodes en el wrapper:", savedNodesVar)


  return (
    <ReactFlowProvider>
      <FlowEditorVariables
        savedNodesVar={savedNodesVar}
        savedEdgesVar={savedEdgesVar}
        selectedNode={selectedNode}
      />
    </ReactFlowProvider>
  );
}