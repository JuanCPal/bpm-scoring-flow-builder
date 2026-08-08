
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
import ThemeToggle from "@/components/ui/theme/theme-toggle";
import * as Tooltip from "@radix-ui/react-tooltip";

export default function ToolBar({
  variant = "main",
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
  const isMain = variant === "main";

  // Bloque de acciones compartido entre el canvas principal y el subcanvas.
  const actions = (
    <>
      {/* Controles "ligeros" */}
      <div className="flex relative items-center gap-1 text-sm text-[var(--muted)] left-0">
        <button onClick={() => router.push('/')} className="hover:text-[var(--accent)] ml-2 border-none rounded-lg px-1.5 py-1 hover:bg-[var(--surface-muted)] cursor-pointer transition flex items-center gap-1">
          <AiFillHome size={16} className=""  />
          Inicio
        </button>
        <button onClick={() => console.log('Undo')} className="hover:text-[var(--accent)] transition flex items-center gap-1 cursor-pointer border-none rounded-lg px-1.5 py-1 hover:bg-[var(--surface-muted)]">
          <MdUndo size={16} />

        </button>
        <button onClick={() => console.log('Redo')} className="hover:text-[var(--accent)] transition flex items-center gap-1 cursor-pointer border-none rounded-lg px-1.5 py-1 hover:bg-[var(--surface-muted)]">
          <MdRedo size={16} />

        </button>
      </div>

      {/* Acciones fuertes */}
      <div className="flex items-center gap-3 text-[14px] mr-2">
        <button onClick={saveToLocalStorage} className="px-3 py-1 h-[30px] cursor-pointer bg-[var(--accent)] hover:opacity-90 text-[var(--accent-foreground)] rounded-md transition-all">Guardar</button>

        <button onClick={() => { setOpenMasOpciones(!OpenMasOpciones) }} className="px-3 py-1 h-[30px] cursor-pointer bg-transparent hover:bg-[var(--surface-muted)] text-[var(--accent)] border-1 border-[var(--accent)] rounded-md transition-all">Mas opciones</button>

        {OpenMasOpciones && (
          <div className="block bg-[var(--surface)] w-[115px] border-1 border-[var(--border)] text-[var(--muted)] rounded-b-md absolute top-[42px] right-6 pt-1">
            <div className="pl-6 py-0.5 w-full hover:bg-[var(--surface-muted)] hover:text-[var(--accent)] cursor-pointer border-b-1 border-[var(--border)]">
              <label htmlFor={`import-file-${variant}`} >
                Importar
                <input id={`import-file-${variant}`} type="file" accept="application/json" onChange={handleImportFlow} className="hidden" />
              </label>
            </div>

            <button onClick={DownloadFile} className="py-1 -pl-5 cursor-pointer w-full hover:text-[var(--accent)] hover:bg-[var(--surface-muted)] rounded">Descargar</button>
          </div>
        )}

      </div>
    </>
  );

  // El subcanvas no tiene barra completa ni editor de título: solo un
  // cluster de acciones flotante en la esquina.
  if (!isMain) {
    return (
      <div className="absolute flex items-center gap-6 -top-10 right-2 z-[9999]">
        {actions}
      </div>
    );
  }

  return (
    <>
    
      <div className="absolute top-0 left-0 right-0 h-14 bg-[var(--surface)] text-[var(--foreground)] border-[var(--border)] border-b-1 flex items-center justify-between px-4 z-[99]">
        {/* Título */}
        <Tooltip.Provider delayDuration={150}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <div className="flex items-center gap-2 cursor-text">
                  
                <MdCircle
                onClick={() => setEditar(true)} 
                className="text-[var(--foreground)]" />
                {editar ? (            
                  <input
                    autoFocus
                    value={arbol}
                    onChange={(e) => setChangeEdit(e.target.value)}
                    onBlur={() => setEditar(false)}
                    onKeyDown={(e) => e.key === 'Enter' && setEditar(false)}
                    className="w-64 text-sm font-medium bg-transparent border-b border-[var(--border)] text-[var(--foreground)] focus:outline-none"
                    placeholder="Nombre del árbol"
                  />
                  
                ) : (
                  <h1
                    onClick={() => setEditar(true)}
                    className="text-lg font-semibold text-[var(--muted)] cursor-pointer hover:underline"
                  >
                    {arbol}
                  </h1>
                )}
              </div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side="bottom"
                sideOffset={8}
                className="z-[99999] rounded-md border border-[var(--border)] bg-[var(--accent)] px-2 py-1 text-xs text-[var(--accent-foreground)] shadow"
              >
                Editar titulo del flujo
                <Tooltip.Arrow className="fill-[var(--accent)]" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>

        {/* Acciones */}
        <div className="flex items-center gap-6">
          <ThemeToggle />
          {actions}
        </div>
      </div>

    </>

  );
}
