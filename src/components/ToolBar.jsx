
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
  MdFolderShared,
  MdCircle
} from "react-icons/md";
import { AiFillHome } from 'react-icons/ai';
import { useState } from "react";
import ThemeToggle from "./theme-toggle";
import Tippy from "@tippyjs/react";

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
    
      <div className="absolute top-0 left-0 right-0 h-14 bg-white dark:bg-slate-800 dark:text-blue-50 border-slate-300 dark:border-zinc-500  border-b-1 flex items-center justify-between px-4 z-[99]">
        {/* Título */}
        <Tippy
        content="Editar titulo del flujo"
        placement="bottom"
        className="bg-blue-300 text-blue-900"
        >
        <div className="flex items-center gap-2 cursor-text">
                  
          <MdCircle
          onClick={() => setEditar(true)} 
          className="text-gray-900 dark:text-gray-50" />
          {editar ? (            
            <input
              autoFocus
              value={arbol}
              onChange={(e) => setChangeEdit(e.target.value)}
              onBlur={() => setEditar(false)}
              onKeyDown={(e) => e.key === 'Enter' && setEditar(false)}
              className="w-64 text-sm font-medium bg-transparent border-b border-gray-400 text-gray-800 dark:text-gray-200 focus:outline-none"
              placeholder="Nombre del árbol"
            />
            
          ) : (
            <h1
              onClick={() => setEditar(true)}
              className="text-lg font-semibold text-gray-500 dark:text-gray-200 cursor-pointer hover:underline"
            >
              {arbol}
            </h1>
          )}
        </div>
        </Tippy>

        {/* Acciones */}
        <div className="flex items-center gap-6">
          {/* <ThemeToggle/> */}

          {/* Controles "ligeros" */}
          <div className="flex relative items-center gap-1 text-sm text-gray-600 dark:text-zinc-300 left-0">
            <button onClick={() => router.push('/')} className="hover:text-blue-800  ml-2 border-none rounded-lg px-1.5 py-1 hover:bg-gray-200 dark:hover:bg-slate-600 dark:hover:text-slate-100 cursor-pointer transition flex items-center gap-1">
              <AiFillHome size={16} className=""  />
              Inicio
            </button>
            <button onClick={() => console.log('Undo')} className="hover:text-blue-800 dark:hover:bg-slate-600 transition flex items-center gap-1 cursor-pointer border-none rounded-lg px-1.5 py-1 hover:bg-gray-200 dark:hover:text-slate-100">
              <MdUndo size={16} />

            </button>
            <button onClick={() => console.log('Redo')} className="hover:text-blue-800 dark:hover:text-slate-100  transition flex items-center gap-1 cursor-pointer border-none rounded-lg px-1.5 py-1 hover:bg-gray-200 dark:hover:bg-slate-600">
              <MdRedo size={16} />

            </button>
          </div>

          {/* Acciones fuertes */}
          <div className="flex items-center gap-3 text-[14px] mr-2">
            <button onClick={saveToLocalStorage} className="px-3 py-1 h-[30px] cursor-pointer bg-blue-500 dark:bg-blue-400 hover:bg-blue-800 dark:hover:bg-slate-400 text-white dark:text-slate-800 rounded-md transition-all">Guardar</button>

            <button onClick={() => { setOpenMasOpciones(!OpenMasOpciones) }} className="px-3 py-1 h-[30px] cursor-pointer bg-transparent hover:bg-blue-200 dark:hover:bg-slate-300 text-blue-800 dark:text-blue-200 border-1 border-blue-800 dark:border-blue-200 hover:text-black hover:border-black rounded-md transition-all">Mas opciones</button>

            {OpenMasOpciones && (
              <div className="block bg-white dark:bg-slate-800 w-[115px] border-1 dark:border-zinc-300 border-gray-400 text-gray-500 dark:text-slate-200 rounded-b-md absolute top-[42px] right-6 pt-1">
                <div className="pl-6 py-0.5 w-full hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-blue-800 dark:hover:text-slate-200 cursor-pointer border-b-1 border-gray-200 dark:border-slate-400">
                  <label htmlFor="import-file" >
                    Importar
                    <input id="import-file" type="file" accept="application/json" onChange={handleImportFlow}className="hidden" />
                  </label>
                </div>

                <button onClick={DownloadFile} className="py-1 -pl-5 cursor-pointer w-full hover:text-blue-800 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 rounded">Descargar</button>
              </div>
            )}

          </div>
        </div>
      </div>

    </>

  );
}