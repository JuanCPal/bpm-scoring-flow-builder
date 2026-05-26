export default function RenameModal({ modal, onClose, onChange, onConfirm }) {
  if (!modal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-35 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-700 p-6 rounded-lg w-[380px] shadow-lg"
      onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold mb-4">Renombrar nodo</h3>

        <input
          type="text"
          value={modal.value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-zinc-400 dark:bg-slate-600 px-2 py-1 font-extralight focus:outline-none focus:border-blue-500 focus:ring-0 mb-10"
        />

        <div className="flex justify-end mt-10 space-x-3 border-t-1 border-gray-300 dark:border-zinc-500 pt-4 px-5 -ml-6 -mr-6 bg-blue-50/50 dark:bg-slate-700">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-sm bg-white dark:bg-transparent border-1 border-gray-800 dark:border-blue-200 text-gray-800 dark:text-blue-200 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-300 dark:hover:text-slate-700 transition cursor-pointer"
          >
            Cancelar
          </button>
          
          <button
            onClick={onConfirm}
            className="px-4 py-1.5 font-sans text-sm bg-blue-300 text-slate-800 rounded-lg hover:bg-blue-400 transition cursor-pointer"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
