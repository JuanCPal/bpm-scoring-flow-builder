import { useState } from "react";
import { FaEdit } from "react-icons/fa";

export function ContextMenu({
  contextMenu,
  nodes,
  setSelectedNode,
  setFormPro,
  setFormVar,
  setIsOpenEdit,
  setSelectedProceso,
  setOpenVariables,
  setInternalFlow,
  setContextMenu,
  handleGroupRename,
  addVariableInside,
  loadNodeFlow,
  openBaseModal,
  deleteNode,
  setOpenBaseModal
}) {
    

  if (!contextMenu) return null;

  return (
    <div
      className="absolute bg-white shadow-background border border-gray-300 rounded-md z-50"
      style={{ top: contextMenu.y, left: contextMenu.x }}
    >
      {/* Cambiar nombre */}
      <div
        className="px-4 py-2 flex gap-2 text-sm hover:bg-gray-200 text-blue-900 cursor-pointer"
        title="Editar nombre del nodo"
        onClick={handleGroupRename}
      >
        <FaEdit /> Cambiar nombre
      </div>

      {/* Editar parámetros */}
      <div
        className="px-4 py-2 text-sm hover:bg-gray-200 text-gray-900 cursor-pointer mb-1 border-b-gray-800"
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();

          const nodeObj =
            nodes?.find((n) => n.id === contextMenu.nodeId) || contextMenu.node;
          if (!nodeObj) return;

          setSelectedNode(nodeObj);

          const tipo = String(nodeObj.type).toLowerCase();
          if (tipo === "proceso") {
            setFormPro({
              nombre: nodeObj.data?.parametros?.proceso || "",
              descripcion: nodeObj.data?.parametros?.descripcion || "",
            });
          } else if (tipo === "variable") {
            setFormVar({
              variable: nodeObj.data?.parametros?.variable || "",
              descripcionVar: nodeObj.data?.parametros?.descripcionVar || "",
            });
          }

          setIsOpenEdit(true);
          setContextMenu(null);
        }}
      >
        Editar parámetros
      </div>

      {/* Opciones específicas si es un Proceso */}
{contextMenu.nodeType === "Proceso" && (
  <>
    {/* Ver detalles */}
    <div
      className="px-4 py-2 text-sm hover:bg-gray-200 text-gray-900 cursor-pointer mb-1 border-b-gray-800"
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();

        const nodeObj =
          nodes?.find((n) => n.id === contextMenu.nodeId) ||
          contextMenu.node;
        if (!nodeObj) return;

        setSelectedNode(nodeObj);

        const tipo = String(nodeObj.type).toLowerCase();
        if (tipo === "proceso") {
          setFormPro({
            nombre: nodeObj.data?.parametros?.proceso || "",
            descripcion: nodeObj.data?.parametros?.descripcion || "",
          });
          setSelectedProceso(true); // abre modal de Proceso
        } else if (tipo === "variable") {
          setFormVar({
            variable: nodeObj.data?.parametros?.variable || "",
            descripcionVar: nodeObj.data?.parametros?.descripcionVar || "",
          });
          setSelectedVariables(true); // abre modal de Variable
        }

        setContextMenu(null);
      }}
    >
      Ver detalles
    </div>

    {/* Agregar variable dentro */}
    <div
      className="px-4 py-2 text-sm hover:bg-gray-200 text-gray-900 cursor-pointer mb-1 border-b-gray-800"
      onClick={() => addVariableInside(contextMenu.nodeId)}
    >
      Agregar variable dentro
    </div>

  </>
)}

{/* 👉 Abrir modal canvas variables */}
{contextMenu.nodeType === "Proceson" && (
    
<div
  className="px-4 py-2 text-sm hover:bg-gray-200 text-gray-900 cursor-pointer mb-1 border-b-gray-800"
  onMouseDown={(e) => {
    e.preventDefault();
    e.stopPropagation();

    const nodeObj =
      nodes?.find((n) => n.id === contextMenu.nodeId) || contextMenu.node;
    if (!nodeObj) return;

    setSelectedNode(nodeObj);

    setOpenBaseModal(true); // ✅ abre el modal vacío
    setContextMenu(null);
  }}
>
  Abrir flujo de variables
</div>
)}


      {/* Eliminar */}
<div
  className="px-4 py-2 text-sm hover:bg-red-50 text-red-900 cursor-pointer mb-1 border-b-gray-800"
  onMouseDown={(e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!contextMenu?.nodeId) return;
    deleteNode(contextMenu.nodeId);   // ✅ le pasas solo el id
    setContextMenu(null);
  }}
>
  Eliminar
</div>
    </div>
  );
}