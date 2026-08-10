import { FaCircle, FaEllipsisH, FaProjectDiagram } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";
import { projectCardEditFields } from "@/mocks/mock-data";

export default function ProjectCard({ title, project }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [formData, setFormData] = useState({ producto: "", descripcion: "" });

  useEffect(() => {
    if (!isModal) return;

    setFormData({
      producto: project?.name || title || "",
      descripcion: project?.description || "",
    });
  }, [isModal, project, title]);

  const formattedDate = new Date(project.savedAt).toLocaleString('es-ES', {
  weekday: 'short',     // ej: "jue."
  day: '2-digit',       // ej: "04"
  month: 'long',        // ej: "septiembre"
  year: 'numeric',      // ej: "2025"
  hour: '2-digit',      // ej: "23"
  minute: '2-digit'     // ej: "35"
});
  const renderField = (field) => (
    <div key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
      <label className="block">
        <span className="text-sm text-gray-700 dark:text-zinc-300">{field.label}</span>
        {field.type === "textarea" ? (
          <textarea
            name={field.name}
            value={formData[field.name] || ""}
            onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
            placeholder={field.placeholder || ""}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-zinc-500 px-3 py-1.5 min-h-[96px] focus:outline-none focus:border-blue-300 focus:ring-0 font-extralight"
          />
        ) : (
          <input
            type={field.type || "text"}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
            placeholder={field.placeholder || ""}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-zinc-500 px-3 py-1.5 font-extralight focus:outline-none focus:border-blue-300 focus:ring-0"
          />
        )}
      </label>
    </div>
  );

  const handleSave = (e) => {
    e.preventDefault();
    setIsModal(false);
  };

  return (
    <div
      className="mt-5 w-auto h-auto hover:shadow-gray-300 transition-all hover:shadow-2xs rounded-xl border border-gray-300 dark:border-zinc-600 pt-1 px-1 hover:pb-3 pb-1 bg-blue-200 dark:bg-slate-800 relative"
      // Evitar que clicks en el contenedor exterior cierren menus/modales si están abiertos
      onClick={() => {
        if (isOpen) setIsOpen(false);
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div
          className="flex text-gray-800 dark:text-zinc-200 px-5 py-2 cursor-pointer items-center gap-3"
          // No propagamos para que el click en el header no cierre menús (cuando abrimos menú contextual)
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mr-3 text-blue-700 dark:text-blue-300 bg-white dark:bg-slate-900 p-2.5 rounded-full text-lg">
            <FaProjectDiagram />
          </div>

          <div>
            <Link href={`/editor/${project?.id ?? ""}`}>
            <h3 className="text-base font-semibold hover:underline">{title || "Linea de iniciacion cliente Banco Union"}
            </h3>
            </Link>
            <p className="text-[12px] text-gray-600 dark:text-zinc-300 mt-0.5">
              Última actualización: <span className="text-gray-700 dark:text-zinc-200">{formattedDate || "20 de Octubre de 2025 a las 4:45 p.m"}</span>
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
            className="text-gray-600 dark:text-zinc-300 hover:bg-white dark:hover:bg-slate-900 cursor-pointer p-2 rounded-full transition-colors"
            aria-label="Abrir opciones"
          >
            <FaEllipsisH />
          </button>

          {isOpen && (
            <div
              className="absolute right-6 top-12 mt-2 w-44 bg-white dark:bg-slate-800 border border-gray-200 dark:border-zinc-500 rounded-lg shadow-md z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <Link href={`/editor/${project?.id ?? ""}`}>
                <div className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer rounded-t-md">Abrir</div>
              </Link>

              <div
                onClick={() => {
                  setIsModal(true);
                  setIsOpen(false);
                }}
                className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
              >
                Editar parámetros
              </div>

              <div className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer rounded-b-md">Descargar</div>
            </div>
          )}
        </div>
      </div>

      {/* Card body (contenido blanco interior) */}
      <div className="bg-white dark:bg-slate-900 rounded-xl px-5 py-3 mt-2">
        <p className="text-gray-700 dark:text-zinc-400 text-[15px] pb-1.5">
        </p>
        <p className="text-[12px] text-gray-600 dark:text-zinc-300">Autores(s): User1, User2</p>
        <p className="text-[12px] text-gray-600 dark:text-zinc-400 mt-1 flex">Estado: En proceso <span className="text-red-700 ml-1 mt-1 text-[8px]"> <FaCircle/></span></p>
      </div>

      {/* MODAL */}
      {isModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setIsModal(false)}
        >
          <div
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl w-full max-w-5xl relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-zinc-200 mb-4">Editar flujo</h3>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSave}>
              {projectCardEditFields.map(renderField)}

              <div className="flex justify-end gap-3 mt-2 md:col-span-2">
                <button
                  type="button"
                  onClick={() => setIsModal(false)}
                  className="px-4 py-1.5 text-sm bg-gray-200 dark:bg-transparent border-1 dark:border-blue-300 text-gray-800 dark:text-blue-300 dark:hover:text-slate-800 rounded-lg hover:bg-gray-300 dark:hover:bg-blue-200 cursor-pointer transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-sm bg-blue-400 text-slate-900 rounded-lg hover:bg-blue-300 cursor-pointer transition"
                >
                  Guardar
                </button>
              </div>
            </form>

            <button
              onClick={() => setIsModal(false)}
              className="absolute top-3 right-4 text-gray-400 dark:text-zinc-300 hover:text-gray-600 dark:hover:text-zinc-400 cursor-pointer"
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
