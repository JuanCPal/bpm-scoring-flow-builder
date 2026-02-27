'use client';

export default function StatusBar({ nodes, selectedNode  }) {

  console.log("nodes en statusBar: ", nodes)
  console.log("Selected en statusBar: ", selectedNode)
  return (
    <div className="fixed w-full h-[20px] text-white bottom-0 bg-blue-900 flex">
      <div className="flex text-[12px] mt-0.5 ml-15"><span className="mr-1" >Selected: </span> {selectedNode?.data?.label || "Ningun nodo seleccionado"}</div>
      <div className="flex text-[12px] mt-0.5 ml-15"><span className="mr-1" >X: </span> <pre>{selectedNode?.position?.x} </pre>  <span className="mx-3" >Y: </span><pre>{JSON.stringify(selectedNode?.position?.y, null, 1)}</pre></div>
    </div>
  );
}