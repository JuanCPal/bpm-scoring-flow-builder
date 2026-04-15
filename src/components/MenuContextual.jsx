import { useState } from "react";
import { FaArrowRight, FaCopy, FaEdit, FaEye, FaInbox, FaOpencart, FaOpenid, FaPen, FaReact, FaRegEdit, FaRegFrownOpen, FaTrash, FaUserEdit } from "react-icons/fa";
import { HiArrowCircleRight, HiArrowNarrowRight, HiArrowRight, HiArrowSmLeft, HiChevronRight, HiClipboardCopy, HiCog, HiCube, HiDuplicate, HiOutlineArrowSmRight, HiOutlinePencil, HiPencil, HiPencilAlt, HiPlusCircle, HiStop, HiTrash } from "react-icons/hi";
import { MdEditAttributes, MdEditNote } from "react-icons/md";

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
  handleDuplicate,
  addNodeConnected
}) {

  const [openNewNode, setOpenNewNode] = useState(false)

  if (!contextMenu) return null;

  return (

    <div
      className="absolute bg-white dark:bg-slate-600 shadow-md border border-gray-300 dark:border-zinc-500 rounded-md z-50 select-none"
      style={{ top: contextMenu.y, left: contextMenu.x }}
    >
      {/* Cambiar nombre */}
      <div
        className="px-4 py-2 flex gap-2 text-sm hover:bg-gray-200 dark:hover:bg-slate-500 text-blue-900 dark:text-sky-200 border-b-1 border-b-slate-400 dark:border-b-zinc-400 cursor-pointer"
        title="Editar nombre del nodo"
        onClick={handleGroupRename}
        tabIndex={0}
      >
        <HiPencilAlt size={16} /> Cambiar nombre 
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
        <HiPencil className="text-zinc-600 dark:text-slate-200" size={18} /> Parametrizar
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
            <FaEye size={18} className="text-zinc-600" /> Ver detalles
          </div>

          {/* Agregar variable dentro */}
          <div
            className="px-4 py-2 text-sm hover:bg-gray-200 text-gray-900 cursor-pointer mb-1 border-b-gray-800"
            onClick={() => addVariableInside(contextMenu.nodeId)}
          >
            <FaInbox size={18} className="text-zinc-600" /> Agregar variable dentro
          </div>

        </>
      )}

      {/* 👉 Abrir modal canvas variables */}
      {contextMenu.nodeType === "Proceson" && (

        <div
          className="px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-slate-500 text-gray-900 dark:text-slate-200 cursor-pointer mb-1 border-b-1 border-b-slate-400 dark:border-b-zinc-400 flex gap-2"
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
          <HiArrowCircleRight size={18} className="text-zinc-600 dark:text-slate-200" /> Abrir flujo de variables
        </div>
      )}

      {/* añadir nodos*/}
      <div
        className="px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-slate-500 text-gray-900 dark:text-slate-200 cursor-pointer mb-1 border-b-1 border-b-slate-400 dark:border-b-zinc-400 flex gap-2"
        onMouseEnter={() => setOpenNewNode(true)}
        onMouseLeave={() => setOpenNewNode(false)}

      >
        <HiPlusCircle className="text-zinc-600 -ml-0.5 dark:text-slate-200" size={19} /> Agregar nodos <HiChevronRight size={18} className="text-zinc-600 dark:text-slate-200 absolute right-1.5" />
      </div>
      {openNewNode && (
        <div
          className="absolute bg-white dark:bg-slate-600 shadow-background border border-gray-300 dark:border-zinc-500 rounded-md z-[55] -right-40 -mt-11 shadow-md"
          onMouseEnter={() => setOpenNewNode(true)}
          onMouseLeave={() => setOpenNewNode(false)}
        >
          <div
            className="px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-slate-500 text-gray-900 dark:text-slate-200 cursor-pointer mb-1  flex gap-2"
            onClick={() => addNodeConnected(contextMenu.nodeId, "Proceson")}
          >
            <HiCog className="text-zinc-600 -ml-0.5 dark:text-slate-200" size={19} /> Agregar proceso
          </div>
          <div
            className="px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-slate-500 text-gray-900 dark:text-slate-200 cursor-pointer mb-1 flex gap-2"
            onClick={() => addNodeConnected(contextMenu.nodeId, "Or")}
          >
            <HiCube className="text-zinc-600 -ml-0.5 dark:text-slate-200" size={19} /> Agregar decision
          </div>
          <div
            className="px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-slate-500 text-gray-900 dark:text-slate-200 cursor-pointer mb-1 0 flex gap-2"
            onClick={() => addNodeConnected(contextMenu.nodeId, "Fin")}
          >
            <HiStop className="text-zinc-600 -ml-0.5 dark:text-slate-200" size={19} /> Agregar fin
          </div>
        </div>
      )}

      {/* duplicar */}
      <div
        className="px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-slate-500 text-gray-900 dark:text-slate-200 cursor-pointer mb-1 border-b-gray-800 dark:border-b-zinc-200 flex gap-2"
        onClick={handleDuplicate}
      >
        <HiDuplicate className="text-zinc-600 -ml-0.5 dark:text-slate-200" size={19} /> Duplicar
      </div>

      {/* Copiar */}
      <div
        className="px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-slate-500 text-gray-900 dark:text-slate-200 cursor-pointer mb-1 flex gap-2"
        onClick={handleDuplicate}
      >
        <HiClipboardCopy className="text-zinc-600 -ml-0.5 dark:text-slate-200" size={19} /> Copiar
      </div>

      {/* Eliminar */}
      <div
        className="px-4 py-2 text-sm hover:bg-red-50 dark:hover:bg-red-950/25 text-red-900 dark:text-red-200 cursor-pointer mb-1 border-b-gray-800 flex gap-2"
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();

          if (!contextMenu?.nodeId) return;
          deleteNode(contextMenu.nodeId);
          setContextMenu(null);
        }}
      >
        <HiTrash size={18} />Eliminar
      </div>
    </div>

  );
}