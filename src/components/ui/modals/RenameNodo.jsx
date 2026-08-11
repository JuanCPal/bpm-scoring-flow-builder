export default function RenameModal({ modal, onClose, onChange, onConfirm }) {
  if (!modal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[color:var(--neutral-800)]/75 z-50">
      <div
        className="w-[380px] rounded-lg bg-[var(--surface)] p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-4 text-lg font-semibold text-[var(--foreground)]">Renombrar nodo</h3>

        <input
          type="text"
          value={modal.value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
          className="mb-10 mt-1 block w-full rounded-md border border-[var(--border)] bg-[var(--surface-muted)] px-2 py-1 font-extralight text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-0"
        />

        <div className="-ml-6 -mr-6 mt-10 flex justify-end space-x-3 border-t border-[var(--border)] bg-[var(--surface-muted)] px-5 pt-4">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-sm text-[var(--foreground)] transition hover:bg-[var(--surface-muted)]"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="cursor-pointer rounded-lg bg-[var(--accent)] px-4 py-1.5 font-sans text-sm text-[var(--accent-foreground)] transition hover:opacity-90"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
