import { FaCircle, FaEllipsisH, FaHandPointDown, FaProjectDiagram } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

export default function ProjectCard({ title, project }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [projects, setProjects] = useState([]);

  const formattedDate = new Date(project.savedAt).toLocaleString('es-ES', {
  weekday: 'short',     // ej: "jue."
  day: '2-digit',       // ej: "04"
  month: 'long',        // ej: "septiembre"
  year: 'numeric',      // ej: "2025"
  hour: '2-digit',      // ej: "23"
  minute: '2-digit'     // ej: "35"
});
  console.log('savedAt:', project.savedAt); 

  return (
    <div
      className="mt-5 w-auto h-auto hover:shadow-gray-300 transition-all hover:shadow-2xs rounded-xl border border-gray-300 pt-1 px-1 hover:pb-3 pb-1 bg-blue-200 relative"
      // Evitar que clicks en el contenedor exterior cierren menus/modales si están abiertos
      onClick={() => {
        if (isOpen) setIsOpen(false);
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div
          className="flex text-gray-800 px-5 py-2 cursor-pointer items-center gap-3"
          // No propagamos para que el click en el header no cierre menús (cuando abrimos menú contextual)
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mr-3 text-blue-700 bg-white p-2.5 rounded-full text-lg">
            <FaProjectDiagram />
          </div>

          <div>
            <Link href={`/editor/${project?.id ?? ""}`}>
            <h3 className="text-base font-semibold hover:underline">{title || "Linea de iniciacion cliente Banco Union"}
            </h3>
            </Link>
            <p className="text-[12px] text-gray-600 mt-0.5">
              Última actualización: <span className="text-gray-700">{formattedDate || "20 de Octubre de 2025 a las 4:45 p.m"}</span>
            </p>
          </div>
        </div>

        {/* Menú contextual (botón) */}
        <div className="pr-4" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen((prev) => !prev);
            }}
            className="text-gray-600 hover:bg-white cursor-pointer p-2 rounded-full transition-colors"
            aria-label="Abrir opciones"
          >
            <FaEllipsisH />
          </button>

          {isOpen && (
            <div
              className="absolute right-6 top-12 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-md z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <Link href={`/editor/${project?.id ?? ""}`}>
                <div className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer rounded-t-md">Abrir</div>
              </Link>

              <div
                onClick={() => {
                  setIsModal(true);
                  setIsOpen(false);
                }}
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                Editar parámetros
              </div>

              <div className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer rounded-b-md">Descargar</div>
            </div>
          )}
        </div>
      </div>

      {/* Card body (contenido blanco interior) */}
      <div className="bg-white rounded-xl px-5 py-3 mt-2">
        <p className="text-gray-700 text-[15px] pb-1.5">
        </p>
        <p className="text-[12px] text-gray-600">Autores(s): User1, User2</p>
        <p className="text-[12px] text-gray-600 mt-1 flex">Estado: En proceso <span className="text-red-700 ml-1 mt-1 text-[8px]"> <FaCircle/></span></p>
      </div>

      {/* MODAL */}
      {isModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setIsModal(false)}
        >
          <div
            className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Editar flujo</h3>

            <form className="space-y-4">
              <label className="block">
                <span className="text-sm text-gray-700">Nombre de la línea</span>
                <input
                  type="text"
                  name="nombre"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-600 focus:ring-0"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-700">Descripción</span>
                <input
                  type="text"
                  name="proceso"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-700 focus:ring-0"
                />
              </label>
            </form>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsModal(false)}
                className="px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
              <button className="px-4 py-2 text-sm bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition">
                Guardar
              </button>
            </div>

            <button
              onClick={() => setIsModal(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Cerrar modal"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}