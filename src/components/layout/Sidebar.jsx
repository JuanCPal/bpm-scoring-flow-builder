import { useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { FaCog, FaPuzzlePiece, FaLayerGroup, FaPlay, FaStop, FaPlusCircle, FaCircle, FaTimesCircle, FaChevronDown, FaChevronUp, FaPlus, FaMinus } from "react-icons/fa";

// Posicionamiento propio de cada canvas donde vive el sidebar.
const VARIANT_STYLES = {
  main: { button: "left-3 top-16", panel: "left-3 top-[94px]" },
  sub: { button: "-left-3 top-3", panel: "-left-3 top-[42px]" },
};

export default function SidebarNodeMenu({
  variant = "main",
  sidebarOpen,
  setSidebarOpen,
  addProceso,
  addProceson,
  addVariable,
  addStart,
  addFin,
  addXor,
  addOr,
  addAnd
}) {
  const [mostrarActividades, setMostrarActividades] = useState(true);
  const [mostrarEventos, setMostrarEventos] = useState(true);
  const [mostrarGateway, setMostrarGateway] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const styles = VARIANT_STYLES[variant] ?? VARIANT_STYLES.main;

  // El canvas principal solo crea "Proceso"; el subcanvas de variables
  // crea "Grupo de variables" y "Variable".
  const activityItems = variant === "sub"
    ? [
        { name: "Grupo de variables", icon: <FaLayerGroup />, desc: "Crea un contenedor de variables", onClick: addProceso },
        { name: "Variable", icon: <FaPuzzlePiece />, desc: "Crea una variable", onClick: addVariable },
      ]
    : [
        { name: "Proceso", icon: <FaCog />, desc: "Crea un proceso generico", onClick: addProceson },
      ];

  return (
    <>
      {/* Botón para abrir/cerrar sidebar */}
      <Tooltip.Provider delayDuration={150}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              className={`absolute text-[15px] ${styles.button} z-60 px-2 py-[7px] rounded-md text-[var(--accent-foreground)] bg-[var(--accent)] cursor-pointer font-sans font-semibold transition-all`}
              onClick={() => setSidebarOpen((s) => !s)}
            >
              {sidebarOpen ? <FaMinus /> : <FaPlus />}
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side="right"
              sideOffset={8}
              className="z-[99999] rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-xs text-[var(--foreground)] shadow"
            >
              {sidebarOpen ? "Cerrar panel" : "Agregar elemento"}
              <Tooltip.Arrow className="fill-[var(--surface)]" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className={`absolute select-none ${styles.panel} z-50 w-[260px] max-h-[70%] bg-[var(--surface)] text-[var(--foreground)] py-2 px-2 border-1 border-[var(--border)] rounded-md font-sans overflow-y-auto`}>

          {/* Buscador sutil */}
          <input
            type="text"
            placeholder="Buscar un nodo para agregar"
            className="w-full mb-2 p-2 text-sm border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--foreground)] rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Actividades */}
          <h3
            className="flex py-1 pl-1 -ml-2 -mr-2 mb-2 text-[17px] font-sans cursor-pointer hover:bg-[var(--surface-muted)] text-[var(--muted)]"
            onClick={() => setMostrarActividades(!mostrarActividades)}
          >
            Actividades {mostrarActividades ? <FaChevronUp className="absolute right-4 text-[15px]" /> : <FaChevronDown className="absolute right-4 text-[15px]" />}
          </h3>
          {mostrarActividades && (
            <>
              {activityItems.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                <div
                  key={item.name}
                  className="p-3 rounded-lg cursor-pointer bg-[var(--surface)] border border-[var(--border)] mb-3 hover:bg-[var(--surface-muted)]"
                  onClick={item.onClick}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <strong>{item.name}</strong>
                  </div>
                  <div className="text-[var(--muted)] text-[13px]">{item.desc}</div>
                </div>
              ))}
            </>
          )}

          {/* Eventos */}
          <h3
            className="flex py-1 pl-1 -ml-2 -mt-1 -mr-2 text-[17px] cursor-pointer border-t-1 border-[var(--border)] hover:bg-[var(--surface-muted)] text-[var(--muted)] mb-2"
            onClick={() => setMostrarEventos(!mostrarEventos)}
          >
            Eventos {mostrarEventos ? <FaChevronUp className="absolute right-4 text-[15px]" /> : <FaChevronDown className="absolute right-4 text-[15px]" />}
          </h3>
          {mostrarEventos && (
            <>
              {["Inicio", "Fin"].filter(item => item.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => {
                const onClick = item === "Inicio" ? addStart : addFin;
                const icon = item === "Inicio" ? <FaPlay /> : <FaStop />;
                const desc = item === "Inicio" ? "Iniciar flujo" : "Finalizar flujo";

                return (
                  <div
                    key={item}
                    className="p-3 rounded-lg cursor-pointer bg-[var(--surface)] border border-[var(--border)] mb-1 hover:bg-[var(--surface-muted)]"
                    onClick={onClick}
                  >
                    <div className="flex items-center gap-2">{icon}<strong>{item}</strong></div>
                    <div className="text-[var(--muted)] text-[13px]">{desc}</div>
                  </div>
                );
              })}
            </>
          )}

          {/* Gateways / Decisiones */}
          <h3
            className="flex py-1 pl-1 -ml-2 mt-2 -mr-2 mb-2 text-[17px] border-t-1 border-[var(--border)] cursor-pointer hover:bg-[var(--surface-muted)] text-[var(--muted)]"
            onClick={() => setMostrarGateway(!mostrarGateway)}
          >
            Decisiones (Gateway) {mostrarGateway ? <FaChevronUp className="absolute right-4 text-[15px]" /> : <FaChevronDown className="absolute right-4 text-[15px]" />}
          </h3>
          {mostrarGateway && (
            <>
              {[
                { name: "Exclusiva (XOR)", icon: <FaTimesCircle />, desc: "Elige una sola ruta posible", onClick: addXor },
                { name: "Inclusiva (OR)", icon: <FaCircle />, desc: "Puede tomar una o más rutas", onClick: addOr },
                { name: "Paralelo (AND)", icon: <FaPlusCircle />, desc: "Ejecuta múltiples tareas a la vez", onClick: addAnd }
              ].filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())).map(item => (
                <div
                  key={item.name}
                  className="bg-[var(--surface)] border border-[var(--border)] mb-1 hover:bg-[var(--surface-muted)] p-3 rounded-lg cursor-pointer"
                  onClick={item.onClick}
                >
                  <div className="flex items-center gap-2">{item.icon}<strong>{item.name}</strong></div>
                  <div className="text-[var(--muted)] text-[13px]">{item.desc}</div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
}
