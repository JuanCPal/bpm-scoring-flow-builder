'use client';

import Tippy from "@tippyjs/react";
import { useState } from "react";
import { HiCheck } from "react-icons/hi";
import { HiExclamationTriangle, HiMiniCheckCircle } from "react-icons/hi2";

export default function StatusBar({ nodes, selectedNode }) {
  const [details, setDetails] = useState(false);

  console.log("nodes en statusBar: ", nodes)
  console.log("Selected en statusBar: ", selectedNode)
  return (

    <div className="fixed w-full h-[20px] text-white bottom-0 bg-blue-900 flex">
      <div className="flex text-[12px] mt-0.5 ml-15"><span className="mr-1" >Selected: </span> {selectedNode?.data?.label || "Ningun nodo seleccionado"}</div>
      <div className="flex text-[12px] mt-0.5 ml-15"><span className="mr-1" >X: </span> <pre>{selectedNode?.position?.x} </pre>  <span className="mx-3" >Y: </span><pre>{JSON.stringify(selectedNode?.position?.y, null, 1)}</pre></div>
      <Tippy
        placement="top"
        content="♦ Informacion de la alerta lorem ipsum y mas texto y mas texto y mas texto y unapalabralarga"
      >
        <div className="flex gap-1 absolute right-30 cursor-pointer" ><div className="pt-0.5">
          {/*<HiExclamationTriangle color="yellow" />*/} <HiMiniCheckCircle /> </div>  <div className="text-[14px]">{/*El flujo no tiene Inicio*/} Todo correcto</div></div>
      </Tippy>
    </div>
  );
}