"use client";
import { useParams } from "next/navigation";
import { useData } from "@/hooks/useData";
import { getProjectById } from "@/lib/api-client";
import { FlowWrapper } from "@/components/shared/flow/FlowWrapper";

export default function ProjectPage() {
  const { id } = useParams();
  const { data: projectData = null, loading } = useData(() => getProjectById(id), [id], null);

  if (loading) return <p className="p-4">Cargando proyecto...</p>;
  if (!projectData) return <p>Proyecto no encontrado</p>;

  return (
    <div className="h-screen w-full">
      <h1 className="text-xl font-bold">{projectData.name}</h1>
      <FlowWrapper savedNodes={projectData.nodes} savedEdges={projectData.edges} savedId={projectData.id} />
    </div>
  );
}
