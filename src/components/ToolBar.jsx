
import { useRouter } from "next/navigation";
import {
  FaEdit,
  FaSave,
  FaUndo,
  FaRedo,
  FaFileImport,
  FaFileExport,
  FaRegEdit,
  FaHome,
} from "react-icons/fa";

import { HiHome, HiOutlineHome } from "react-icons/hi";

import {
  MdSave,
  MdUndo,
  MdRedo,
  MdImportExport,
  MdImportContacts,
  MdFileDownload,
  MdFileUpload,
  MdHome,
  MdEditAttributes,
  MdEditNote,
  MdEdit,
  MdFolder,
  MdFolderOpen,
  MdFolderShared
} from "react-icons/md";
import { AiFillHome } from 'react-icons/ai';
import { useState } from "react";


export default function ToolBar({
  saveToLocalStorage,
  handleImportFlow,
  editar,
  arbol,
  setChangeEdit,
  DownloadFile,
  setEditar

}) {
  const [OpenMasOpciones, setOpenMasOpciones] = useState(false)
  const router = useRouter();

  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-12 bg-gray-200/50 border-gray-400 border-b-1 flex items-center justify-between px-4 z-[99]">
        {/* Título */}
        <div className="flex items-center gap-2">
          <MdEdit className="text-gray-500" />
          {editar ? (
            <input
              autoFocus
              value={arbol}
              onChange={(e) => setChangeEdit(e.target.value)}
              onBlur={() => setEditar(false)}
              onKeyDown={(e) => e.key === 'Enter' && setEditar(false)}
              className="w-64 text-sm font-medium bg-transparent border-b border-gray-400 text-gray-800 focus:outline-none"
              placeholder="Nombre del árbol"
            />
          ) : (
            <h1
              onClick={() => setEditar(true)}
              className="text-lg font-semibold text-gray-500 cursor-pointer hover:underline"
            >
              {arbol}
            </h1>
          )}
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-6">
          {/* Controles "ligeros" */}
          <div className="flex relative items-center gap-1 text-sm text-gray-600 left-0">
            <button onClick={() => router.push('/')} className="hover:text-blue-800 ml-2 border-none rounded-lg px-1.5 py-1 hover:bg-gray-200 cursor-pointer transition flex items-center gap-1">
              <AiFillHome size={16} className=""  />
              Inicio
            </button>
            <button onClick={() => console.log('Undo')} className="hover:text-blue-800 transition flex items-center gap-1 cursor-pointer border-none rounded-lg px-1.5 py-1 hover:bg-gray-200">
              <MdUndo size={16} />

            </button>
            <button onClick={() => console.log('Redo')} className="hover:text-blue-800 transition flex items-center gap-1 cursor-pointer border-none rounded-lg px-1.5 py-1 hover:bg-gray-200">
              <MdRedo size={16} />

            </button>
          </div>

          {/* Acciones fuertes */}
          <div className="flex items-center gap-3 text-[14px] mr-7">
            <button onClick={saveToLocalStorage} className="px-3 py-1 h-[28px] cursor-pointer bg-blue-900 hover:bg-blue-800 text-white rounded-full transition-all">Guardar</button>
            <button onClick={() => { setOpenMasOpciones(!OpenMasOpciones) }} className="px-3 py-1 h-[28px] cursor-pointer bg-white hover:bg-blue-50 text-gray-500 border-1 border-gray-500 hover:text-blue-800 hover:border-blue-800 rounded-full transition-all">Mas opciones ▼</button>
            {OpenMasOpciones && (
              <div className="block bg-white w-[130px] border-1 border-gray-400 text-gray-500 rounded-b-md absolute  top-10 right-11 pt-1">
                <div className="pl-9 py-1 w-full hover:bg-gray-100 hover:text-blue-800 cursor-pointer border-b-1 border-gray-200">
                  <label htmlFor="import-file" >
                    Importar
                    <input id="import-file" type="file" accept="application/json" onChange={handleImportFlow} className="hidden" />
                  </label>
                </div>

                <button onClick={DownloadFile} className="py-1 -pl-5 cursor-pointer w-full hover:text-blue-800 hover:bg-gray-100 rounded">Descargar</button>
              </div>
            )}

          </div>
        </div>
      </div>

    </>

  );
}