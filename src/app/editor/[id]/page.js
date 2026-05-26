"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FlowWrapper } from "@/components/shared/flow/FlowWrapper";

export default function EditorPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!id) return;
    const savedData = JSON.parse(localStorage.getItem(id));
    if (savedData) {
      setProject(savedData);
    }
  }, [id]);

  if (!project) {
    return <p className="p-4">Cargando proyecto...</p>;
  }

  console.log("idNombre en urldinamica", project.id)
  console.log("Nodes en urldinamica", project.nodes)

  return (
    <div className="h-screen">
      <FlowWrapper
        savedNodes={project.nodes || []}
        savedEdges={project.edges || []}
        savedId={project.id || []}
      />
    </div>
  );
}