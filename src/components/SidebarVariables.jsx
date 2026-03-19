import Tippy from "@tippyjs/react";
import { useState } from "react";
import { FaCog, FaPuzzlePiece, FaRandom, FaPlay, FaStop, FaPlusCircle, FaCircle, FaTimesCircle, FaArrowDown, FaChevronDown, FaChevronUp, FaObjectGroup, FaLayerGroup, FaMinus, FaPlus } from "react-icons/fa";

export default function SidebarVariables({
    sidebarOpen,
    setSidebarOpen,
    addProceso,
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
    return (
        <>
            {/* Botón para abrir/cerrar sidebar */}
            <Tippy
                content={sidebarOpen ? "Cerrar panel" : "Agregar elemento"}
                placement="right"
                animation="scale"
                duration={[300, 300]}
                delay={[150, 0]}
            >
                <button
                    className="absolute text-[15px] -left-3 top-3 z-60 px-2 py-[7px] rounded-md text-blue-100 dark:text-gray-800 bg-gray-800 dark:bg-blue-400 cursor-pointer font-sans font-semibold transition-all"
                    onClick={() => setSidebarOpen((s) => !s)}
                >
                    {sidebarOpen ? <FaMinus /> : <FaPlus />}
                </button>
            </Tippy>

            {/* Sidebar */}
            {sidebarOpen && (
                <div className="absolute select-none -left-3 top-[42px] z-50 w-[260px] max-h-[70%] bg-gray-100 dark:bg-slate-800 py-2 px-2 border-1 border-zinc-300 dark:border-zinc-600 rounded-md font-sans overflow-y-auto">
                    {/* Buscador sutil */}
                    <input
                        type="text"
                        placeholder="Buscar un nodo para agregar"
                        className="w-full mb-2 p-2 text-sm border border-zinc-300 dark:border-zinc-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/*desde aqui el grupo actividades */}
                    {/* Opción: Proceso */}
                    <h3 className="flex py-1 pl-1 -ml-2 -mr-2 mb-2 text-[17px] font-bold font-sans cursor-pointer dark:hover:bg-zinc-600 hover:bg-gray-50 text-gray-500 dark:text-zinc-400"
                        onClick={() => { setMostrarActividades(!mostrarActividades) }}>
                        Actividades {mostrarActividades ? <FaChevronUp className="absolute right-4 text-[15px]" /> : <FaChevronDown className="absolute right-4 text-[15px]" />}
                    </h3>

                    {mostrarActividades && (
                        <>
                            {["Grupo de variables", "Variable"].filter(item => item.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => {
                                const onClick = item === "Grupo de variables" ? addProceso : addVariable;
                                const icon = item === "Grupo de variables" ? <FaLayerGroup /> : <FaPuzzlePiece />;
                                const desc = item === "Grupo de variables" ? "Crea un contenedor de variables" : "Crea una variable";
                                return (
                                <div
                                    key={item}
                                    className="p-3 rounded-lg cursor-pointer bg-white dark:bg-slate-800 border dark:border-zinc-600 border-gray-200/90 mb-3 hover:bg-gray-100 dark:hover:bg-zinc-600"
                                    onClick={onClick}
                                >
                                    <div className="flex items-center gap-2 ">
                                        {icon}
                                        <strong>{item}</strong>
                                    </div>
                                    <div className="text-slate-500 dark:text-slate-400 text-[13px]">{desc}</div>
                                </div>
                                );
                            })}
                        </>
                    )}

                    {/*desde aqui el grupo eventos */}

                              {/* Eventos */}
          <h3
            className="flex py-1 pl-1 -ml-2 -mt-1 -mr-2 text-[17px] cursor-pointer border-t-1 border-gray-200 dark:border-zinc-500 hover:bg-gray-50 dark:hover:bg-zinc-600 text-gray-500 dark:text-zinc-400 mb-2"
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
                    className="p-3 rounded-lg cursor-pointer bg-white dark:bg-slate-800 border border-gray-200 dark:border-zinc-600 mb-1 hover:bg-gray-100 dark:hover:bg-zinc-600"
                    onClick={onClick}
                  >
                    <div className="flex items-center gap-2">{icon}<strong>{item}</strong></div>
                    <div className="text-slate-500 dark:text-slate-400 text-[13px]">{desc}</div>
                  </div>
                );
              })}
            </>
          )}

          {/* Gateways / Decisiones */}
          <h3
            className="flex py-1 pl-1 -ml-2 mt-2 -mr-2 mb-2 text-[17px] border-t-1 border-gray-200 dark:border-zinc-500 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-600 text-gray-500 dark:text-zinc-400"
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
                  className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-zinc-600 mb-1 hover:bg-gray-100 dark:hover:bg-zinc-600 p-3 rounded-lg cursor-pointer"
                  onClick={item.onClick}
                >
                  <div className="flex items-center gap-2">{item.icon}<strong>{item.name}</strong></div>
                  <div className="text-slate-500 dark:text-slate-400 text-[13px]">{item.desc}</div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
        </>
    );
}