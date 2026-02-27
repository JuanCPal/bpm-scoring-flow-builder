"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import FlowWrapper from "@/components/FlowWrapper"; // tu editor de nodos

export default function ProjectPage() {
  const { id } = useParams();
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    if (id) {
      const storedProjects = JSON.parse(localStorage.getItem("Linea ")) || [];
      const found = storedProjects.find(p => p.id === id);
      setProjectData(found);
    }
  }, [id]);

  if (!projectData) return <p>Proyecto no encontrado</p>;

  return (
    <div className="h-screen w-full">
      <h1 className="text-xl font-bold">{projectData.name}</h1>
      <FlowWrapper savedNodes={projectData.nodes} savedEdges={projectData.edges} />
    </div>
  );
}
