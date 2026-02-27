export default function RenameModal({ modal, onClose, onChange, onConfirm }) {
  if (!modal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-35 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[380px] shadow-lg"
      onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold mb-4">Renombrar nodo</h3>

        <input
          type="text"
          value={modal.value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
          className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0 mb-10"
        />

        <div className="flex justify-end mt-10 space-x-3 border-t-1 border-gray-300 pt-4 px-5 -ml-6 -mr-6 bg-blue-50/50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-white border-1 border-gray-800 text-gray-800 rounded-lg hover:bg-gray-200 transition cursor-pointer"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Rename
          </button>
        </div>
      </div>
    </div>
  );
}