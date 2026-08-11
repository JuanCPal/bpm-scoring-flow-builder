"use client";

import dynamic from "next/dynamic";

const FlowWithContainers = dynamic(() => import("@/components/shared/flow/FlowEditor"), {
  ssr: false, 
});

export default function Page() {
  return (
    <div className="w-full h-screen">
      <FlowWithContainers />
    </div>
  );
}