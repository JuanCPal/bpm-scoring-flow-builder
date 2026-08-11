'use client';

import * as Tooltip from "@radix-ui/react-tooltip";
import { HiMiniCheckCircle } from "react-icons/hi2";

export default function StatusBar({ nodes, selectedNode }) {
  console.log("nodes en statusBar: ", nodes)
  console.log("Selected en statusBar: ", selectedNode)
  return (

    <div className="fixed w-full h-[20px] text-[var(--accent-foreground)] bottom-0 bg-[var(--accent)] flex">
      <div className="flex text-[12px] mt-0.5 ml-15"><span className="mr-1" >Selected: </span> {selectedNode?.data?.label || "Ningun nodo seleccionado"}</div>
      <div className="flex text-[12px] mt-0.5 ml-15"><span className="mr-1" >X: </span> <pre>{selectedNode?.position?.x} </pre>  <span className="mx-3" >Y: </span><pre>{JSON.stringify(selectedNode?.position?.y, null, 1)}</pre></div>
      <Tooltip.Provider delayDuration={150}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <div className="flex gap-1 absolute right-30 cursor-pointer"><div className="pt-0.5">
              <HiMiniCheckCircle /></div><div className="text-[14px]">Todo correcto</div></div>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side="top"
              sideOffset={8}
              className="z-[99999] max-w-[280px] rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-xs text-[var(--foreground)] shadow"
            >
              ♦ Informacion de la alerta lorem ipsum y mas texto y mas texto y mas texto y unapalabralarga
              <Tooltip.Arrow className="fill-[var(--surface)]" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  );
}
