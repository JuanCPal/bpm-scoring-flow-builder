"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { FlowWrapper } from "@/components/shared/flow/FlowWrapper";
import { useData } from "@/hooks/useData";
import { getProjectById } from "@/lib/api-client";

export default function EditorPage() {
  const { id } = useParams();
  const { data: project = null, loading } = useData(() => getProjectById(id), [id]);

  if (loading) {
    return <p className="p-4">Cargando proyecto...</p>;
  }

  if (!project) {
    return <p className="p-4">Proyecto no encontrado</p>;
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