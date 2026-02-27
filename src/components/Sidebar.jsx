import { useState } from "react";
import { FaCog, FaPuzzlePiece, FaRandom, FaPlay, FaStop, FaPlusCircle, FaCircle, FaTimesCircle, FaArrowDown, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function SidebarNodeMenu({
    sidebarOpen,
    setSidebarOpen,
    addProceson,
    addStart,
    addFin,
    addXor,
    addOr,
    addAnd
}) {
    const [mostrarActividades, setMostrarActividades] = useState(true);
    const [mostrarEventos, setMostrarEventos ] = useState(true);
    const [mostrarGateway, setMostrarGateway] = useState(false);
    return (
        <>
            {/* Botón para abrir/cerrar sidebar */}
            <button
                className="absolute text-[15px] left-3 top-14 z-60 px-2 py-[3px] rounded-full text-white bg-blue-900 cursor-pointer"
                onClick={() => setSidebarOpen((s) => !s)}
            >
               + Add Node
            </button>

            {/* Sidebar */}
            {sidebarOpen && (
                <div className="absolute left-3 top-[89px] z-50 w-[260px] max-h-[70%] bg-white py-1 px-2 border border-gray-100 rounded-md overflow-y-auto">
                    {/*desde aqui el grupo actividades */}
                    {/* Opción: Proceso */}
                    <h3 className="flex py-1 pl-1 -ml-2 -mr-2 mb-2 text-[17px] font-bold  cursor-pointer hover:bg-gray-50 text-gray-500" onClick={() => {setMostrarActividades(!mostrarActividades)}}>Actividades {mostrarActividades ? <FaChevronUp className="absolute right-4 text-[15px]" /> : <FaChevronDown className="absolute right-4 text-[15px]"/>}</h3>
                    {mostrarActividades && (
                        <>

                    {/* Opción: Variable */}
                    <div
                        className="p-3 rounded-lg cursor-pointer bg-white border border-gray-200/90 mb-3 hover:bg-gray-100"
                        onClick={addProceson}
                    >
                        <div className="flex items-center gap-2">
                            <FaPuzzlePiece />
                            <strong>Proceso</strong>
                        </div>
                        <div className="text-slate-500 text-[13px]">Crea una proceso</div>
                    </div>
                        </>
                    )}

                    {/*desde aqui el grupo eventos */}

                     <h3 className="flex py-1 pl-1 -ml-2 -mt-1 -mr-2 mb-2 text-[17px] font-bold cursor-pointer border-t-1 border-gray-200 hover:bg-gray-50 text-gray-500" onClick={() => {setMostrarEventos(!mostrarEventos)}}>Eventos {mostrarEventos ? <FaChevronUp className="absolute right-4 text-[15px]" /> : <FaChevronDown className="absolute right-4 text-[15px]"/>}</h3>
                    {mostrarEventos && (
                        <>

                    {/* Opción: Inicio */}
                    <div
                        className="p-3 rounded-lg cursor-pointer bg-white border border-gray-200 mb-1 hover:bg-gray-100"
                        onClick={addStart}
                    >
                        <div className="flex items-center gap-2">
                            <FaPlay />
                            <strong>Inicio</strong>
                        </div>
                        <div className="text-slate-500 text-[13px]">Iniciar flujo</div>
                    </div>

                    {/* Opción: Fin */}
                    <div
                        className="p-3 rounded-lg cursor-pointer bg-white border border-gray-200 mb-3 hover:bg-gray-100"
                        onClick={addFin}
                    >
                        <div className="flex items-center gap-2">
                            <FaStop />
                            <strong>Fin</strong>
                        </div>
                        <div className="text-slate-500 text-[13px]">Finalizar flujo</div>
                    </div>
                    </>
                    )}
                        <h3 className="flex py-1 pl-1 -ml-2 -mt-1 -mr-2 mb-2 text-[17px] font-bold border-t-1 border-gray-200 cursor-pointer hover:bg-gray-50 text-gray-500" onClick={() => {setMostrarGateway(!mostrarGateway)}}>Decisiones (Gateway) {mostrarGateway ? <FaChevronUp className="absolute right-4 text-[15px]" /> : <FaChevronDown className="absolute right-4 text-[15px]"/>}</h3>
                    {mostrarGateway && (
                        <>
                    {/*desde aqui el grupo compuertas o gateways */}
                    <div
                        className="bg-white border border-gray-200 mb-1 hover:bg-gray-100 p-3 rounded-lg cursor-pointer"
                        onClick={addXor}
                    >
                        <div className="flex items-center gap-2">
                            <FaTimesCircle />
                            <strong>Exclusiva (XOR)</strong>
                        </div>
                        <div className="text-slate-500 text-[13px]">Elige una sola ruta posible</div>
                    </div>

                    <div
                        className="bg-white border border-gray-200 mb-1 hover:bg-gray-100 p-3 rounded-lg cursor-pointer"
                        onClick={addOr}
                    >
                        <div className="flex items-center gap-2">
                            <FaCircle />
                            <strong>Inclusiva (OR)</strong>
                        </div>
                        <div className="text-slate-500 text-[13px]">Puede tomar una o más rutas</div>
                    </div>

                    <div
                        className="bg-white border border-gray-200 mb-1 hover:bg-gray-100 p-3 rounded-lg cursor-pointer"
                        onClick={addAnd}
                    >
                        <div className="flex items-center gap-2">
                            <FaPlusCircle />
                            <strong>Paralelo (AND)</strong>
                        </div>
                        <div className="text-slate-500 text-[13px]">Ejecuta múltiples tareas a la vez</div>
                    </div>
                    </>
                    )}
                </div>
            )}
        </>
    );
}