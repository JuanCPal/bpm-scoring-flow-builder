import { useState } from "react";
import { FaArrowRight, FaCopy, FaEdit, FaEye, FaInbox, FaOpencart, FaOpenid, FaPen, FaReact, FaRegEdit, FaRegFrownOpen, FaTrash, FaUserEdit } from "react-icons/fa";

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
  setOpenBaseModal,
  handleDuplicate
}) {
    

  if (!contextMenu) return null;

  return (
    <div
      className="absolute bg-white dark:bg-slate-600 shadow-background border border-gray-300 dark:border-zinc-500 rounded-md z-50"
      style={{ top: contextMenu.y, left: contextMenu.x }}
    >
      {/* Cambiar nombre */}
      <div
        className="px-4 py-2 flex gap-2 text-sm hover:bg-gray-200 dark:hover:bg-slate-500 text-blue-900 dark:text-sky-200 cursor-pointer"
        title="Editar nombre del nodo"
        onClick={handleGroupRename}
      >
        <FaEdit /> Cambiar nombre
      </div>

      {/* Editar parámetros */}
      <div
        className="px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-slate-500 text-gray-900 dark:text-slate-200 cursor-pointer mb-1 border-b-gray-800 dark:border-b-zinc-200 flex gap-2"
        onClick={handleDuplicate}
      >
        <FaCopy className="text-[17px] text-zinc-500" size={18}/> duplicar
      </div>

            {/* Editar parámetros */}
      <div
        className="px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-slate-500 text-gray-900 dark:text-slate-200 cursor-pointer mb-1 border-b-gray-800 dark:border-b-zinc-200 flex gap-2"
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
        <FaPen/> Parametrizar 
      </div>

      {/* Opciones específicas si es un Proceso */}
{contextMenu.nodeType === "Proceso" && (
  <>
    {/* Ver detalles */}
    <div
      className="px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-slate-500 text-gray-900 dark:text-gray-200 cursor-pointer mb-1 border-b-gray-800 flex gap-2"
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
     <FaEye /> Ver detalles
    </div>

    {/* Agregar variable dentro */}
    <div
      className="px-4 py-2 text-sm hover:bg-gray-200 text-gray-900 cursor-pointer mb-1 border-b-gray-800"
      onClick={() => addVariableInside(contextMenu.nodeId)}
    >
     <FaInbox /> Agregar variable dentro
    </div>

  </>
)}

{/* 👉 Abrir modal canvas variables */}
{contextMenu.nodeType === "Proceson" && (
    
<div
  className="px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-slate-500 text-gray-900 dark:text-slate-200 cursor-pointer mb-1 border-b-gray-800 flex gap-2"
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
  <FaArrowRight /> Abrir flujo de variables
</div>
)}


      {/* Eliminar */}
<div
  className="px-4 py-2 text-sm hover:bg-red-50 dark:hover:bg-red-950/25 text-red-900 dark:text-red-200 cursor-pointer mb-1 border-b-gray-800 flex gap-2"
  onMouseDown={(e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!contextMenu?.nodeId) return;
    deleteNode(contextMenu.nodeId);   // ✅ le pasas solo el id
    setContextMenu(null);
  }}
>
  <FaTrash />Eliminar
</div>
    </div>
  );
}