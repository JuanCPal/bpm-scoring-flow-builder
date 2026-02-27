"use client";

import dynamic from "next/dynamic";

const FlowWithContainers = dynamic(() => import("@/components/FlowEditor"), {
  ssr: false, 
});

export default function Page() {
  return (
    <div className="w-full h-screen">
      <FlowWithContainers />
    </div>
  );
}