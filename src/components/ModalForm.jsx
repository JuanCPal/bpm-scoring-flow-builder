import { useEffect, useState } from "react";
import { FaTimes, FaTools } from "react-icons/fa";

export default function ModalForm({
  selectedNode,
  isOpenEdit,
  setIsOpenEdit,
  handleEditProceso,
  handleEditVariable,
  formVar,
  formPro,
  setFormPro,
  setFormVar
}) {
  const [mostrarExtra1, setMostrarExtra1] = useState(false);
  const [mostrarExtra2, setMostrarExtra2] = useState(false);
  const [mostrarVarRela, setMostrarVarRela] = useState(false);
  const [mostrarMenuVariable, setMostrarMenuVariable] = useState(true);
  const [mostrarMenuReglaEval, setMostrarMenuReglaEval] = useState(false);
  const [mostrarMenuReglaCalc, setMostrarMenuReglaCalc] = useState(false);

  useEffect(() => {
    if (!selectedNode) return;
    const tipo = String(selectedNode.type || "").toLowerCase();
    if (tipo === "Proceso") {
      setFormPro({
        nombre: selectedNode.data?.parametros?.proceso || "",
        descripcion: selectedNode.data?.parametros?.descripcion || "",
      });
    } else if (tipo === "Variable") {
      setFormVar({
        variable: selectedNode.data?.parametros?.variable || "",
        descripcionVar: selectedNode.data?.parametros?.descripcionVar || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNode]);

  const nodeType = String(selectedNode?.type || "").toLowerCase();

  if (!isOpenEdit || !selectedNode) return null;

  return (
    <div className="fixed font-sans inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-[99999]">
      <div
        className={`bg-white dark:bg-slate-700 pb-5 rounded-lg shadow-2xl px-6 relative max-h-[98%] overflow-y-auto ${selectedNode.type === "Variable" ? "w-[1100px] " : "w-[1100px]"} max-w-full`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`fixed border-b-1 -ml-6 bg-blue-50/50 dark:bg-slate-800/50 backdrop-blur-lg pt-3 rounded-t-lg border-gray-300 dark:border-zinc-500 pb-1 px-3 ${selectedNode.type === "Variable" ? "w-[1100px]" : "w-[1100px]"}`}>
          <div className="flex">
            <h2 className="text-[18px] text-blue-900 dark:text-slate-200">
              <span>{selectedNode.data?.proceso || selectedNode.data?.variable || selectedNode.data?.label}</span>
            </h2>
            <button
              onClick={selectedNode?.type === "Variable" ? handleEditVariable : handleEditProceso}
              className="absolute right-15 -mt-1.5 px-3 py-1 text-[14px] bg-blue-900 dark:bg-blue-400 text-white dark:text-slate-950 rounded-lg hover:bg-slate-600 transition cursor-pointer"
            >
              Guardar
            </button>
            <p className="absolute right-6 text-gray-500 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-100 cursor-pointer" onClick={() => setIsOpenEdit(false)}> <FaTimes /> </p>
          </div>
        </div>

        <form key={selectedNode.id} className="space-y-4 mt-20">
          {selectedNode?.type === "Proceson" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm flex text-gray-700 dark:text-slate-300">Orden: </span>
                  <input
                    type="number"
                    name="orden"
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    value={formPro.orden}
                    placeholder="Orden del proceso en el flujo"
                    className="mt-1 block w-full rounded-md border bg-gray-100 dark:bg-slate-600 border-gray-300 dark:border-zinc-500 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                  />
                </label>

                <label className="block">
                  <span className="text-sm flex text-gray-700 dark:text-slate-300">Proceso: </span>
                  <input
                    type="text"
                    name="nombre"
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    value={formPro.nombre}
                    placeholder= "Nombre del proceso"
                    className="mt-1 block w-full rounded-md border bg-gray-100 dark:bg-slate-600 border-gray-300  dark:border-zinc-500 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                  />
                </label>

                <label className="block">
                  <span className="text-sm flex text-gray-700 dark:text-slate-300">Descripcion</span>
                  <textarea
                    type="text"
                    name="descripcion"
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    value={formPro.descripcion}
                    placeholder="Añadir descripción"
                    className="mt-1 block w-full rounded-md border font-extralight bg-gray-100 dark:bg-slate-600 border-gray-300 dark:border-zinc-500 px-2 py-1 focus:outline-none focus:border-blue-800 focus:ring-0"
                  />
                </label>

                <label className="block">
                  <span className="text-sm flex text-gray-700 dark:text-slate-300">Siguente paso: ☺</span>
                  <input
                    type="text"
                    name="SiguientePaso"
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    value={formPro.SiguientePaso}
                    className="mt-1 block w-full rounded-md border bg-gray-100 dark:bg-slate-600 border-gray-300 dark:border-zinc-500 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                  />
                </label>
                <label className="block">
                  <span className="text-sm flex text-gray-700 dark:text-slate-300">Proceso negado: </span>
                  <input
                    type="text"
                    name="ProcesoNegado"
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    value={formPro.ProcesoNegado}
                    className="mt-1 block w-full rounded-md border bg-gray-100 dark:bg-slate-600 border-gray-300 dark:border-zinc-500 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                  />
                </label>

                <label className="block">
                  <span className="text-sm flex text-gray-700">CTL tiempos</span>
                  <input
                    type="text"
                    name="CTLTiempos"
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    value={formPro.CTLTiempos}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                  />
                </label>
                <label className="block">
                  <span className="text-sm flex text-gray-700">Grupo: </span>
                  <input
                    type="text"
                    /*name="nombre"
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    value={formPro.nombre}*/
                    className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                  />
                </label>
                <label className="block">
                  <span className="text-sm flex text-gray-700">Producto de negado </span>
                  <input
                    type="text"
                    /*name="nombre"
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    value={formPro.nombre}*/
                    className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                  />
                </label>
                <label className="block">
                  <span className="text-sm flex text-gray-700">Estado de aprobación: ▼ </span>
                  <input
                    type="text"
                    /*name="nombre"
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    value={formPro.nombre}*/
                    className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                  />
                </label>
                <label className="block">
                  <span className="text-sm flex text-gray-700">Recibe nueva solicitud: ▼ </span>
                  <input
                    type="text"
                    /*name="nombre"
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    value={formPro.nombre}*/
                    className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                  />
                </label>

                <label className="block">
                  <span className="text-sm flex text-gray-700">Página de captura</span>
                  <input
                    type="text"
                    /*name="nombre"
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    value={formPro.nombre}*/
                    className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                  />
                </label>
                <label className="block">
                  <span className="text-sm flex text-gray-700">Tiempo Máx. Proceso</span>
                  <input
                    type="text"
                    /*name="nombre"
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    value={formPro.nombre}*/
                    className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                  />
                </label>
                <label className="block">
                  <span className="text-sm flex text-gray-700">Nep de llamado </span>
                  <input
                    type="text"
                    /*name="nombre"
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    value={formPro.nombre}*/
                    className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                  />
                </label>
                <label className="block">
                  <span className="text-sm flex text-gray-700">Programa a llamar</span>
                  <input
                    type="text"
                    /*name="nombre"
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    value={formPro.nombre}*/
                    className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                  />
                </label>

                <label className="block">
                  <span className="text-sm flex text-gray-700">Secuencia de llamdo </span>
                  <input
                    type="text"
                    /*name="nombre"
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    value={formPro.nombre}*/
                    className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                  />
                </label>
                <label className="block">
                  <span className="text-sm flex text-gray-700">Tipo de llamado ▼ </span>
                  <input
                    type="text"
                    /*name="nombre"
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    value={formPro.nombre}*/
                    className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                  />
                </label>
                <label className="block">
                  <span className="text-sm flex text-gray-700">Dia Máx. a transferir </span>
                  <input
                    type="text"
                    /*name="nombre"
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    value={formPro.nombre}*/
                    className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                  />
                </label>
                <label className="block">
                  <span className="text-sm flex text-gray-700">Linea a pasar solicitud </span>
                  <input
                    type="text"
                    /*name="nombre"
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    value={formPro.nombre}*/
                    className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                  />
                </label>
                <label className="block">
                  <span className="text-sm flex text-gray-700">Proceso a pasar </span>
                  <input
                    type="text"
                    /*name="nombre"
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    value={formPro.nombre}*/
                    className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                  />
                </label>
              </div>
            </>
          )}

          {selectedNode?.type === "Variable" && (
            <>
              <div className="-mt-8 w-full border-b-1 border-gray-200 flex text-center">
                <h4 className={`px-10 text-[15px] py-1 text-center cursor-pointer hover:text-blue-700 ${mostrarMenuVariable ? "text-blue-800 border-b-1 border-blue-800" : "text-gray-700"}`}
                  onClick={() => {
                    setMostrarMenuVariable(true)
                    setMostrarMenuReglaCalc(false)
                    setMostrarMenuReglaEval(false)
                  }}>Editar variable</h4>
                <h4 className={`px-10 text-[15px] py-1 text-center cursor-pointer hover:text-blue-700 ${mostrarMenuReglaEval ? "text-blue-800 border-b-1 border-blue-800" : "text-gray-700"}`}
                  onClick={() => {
                    setMostrarMenuVariable(false)
                    setMostrarMenuReglaCalc(false)
                    setMostrarMenuReglaEval(true)
                  }}>Editar regla evaluadora</h4>
                <h4 className={`px-10 text-[15px] py-1 text-center cursor-pointer hover:text-blue-700 ${mostrarMenuReglaCalc ? "text-blue-800 border-b-1 border-blue-800" : "text-gray-700"}`}
                  onClick={() => {
                    setMostrarMenuVariable(false)
                    setMostrarMenuReglaCalc(true)
                    setMostrarMenuReglaEval(false)
                  }}>Editar regla de calculo</h4>
              </div>
              {mostrarMenuVariable && (
                <>
                  <div className="grid grid-cols-4 gap 4 w-full border-b-1 border-gray-200">
                    <label className="inline-flex items-center cursor-pointer group pb-3">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        onChange={() => { setMostrarVarRela(!mostrarVarRela) }}
                      // Maneja el estado tú mismo
                      />
                      <div className="w-5 h-5 rounded border border-gray-400 peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-colors duration-200 flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <polyline points="4 11 8 15 16 6" />
                        </svg>
                      </div>
                      <span className="ml-2 text-sm text-gray-700 group-hover:text-black transition-colors duration-200">
                        ¿Tiene variable relacionada?
                      </span>
                    </label>

                    {/*mostrar input variable rerlacionada*/}
                    {mostrarVarRela && (
                      <>
                        <label className="block ml-10 mb-4">
                          <span className="text-sm text-gray-700">Variable relacionada: </span>
                          <input
                            type="text"
                            name="varRel"
                            onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                            value={formVar.varRel}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 max-h-7 focus:outline-none focus:border-blue-500 focus:ring-0"
                          />
                        </label>
                        <br />
                      </>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4">

                    {/* Columna izquierda */}
                    <label className="block">
                      <span className="text-sm text-gray-700">Orden: </span>
                      <input
                        type="number"
                        name="orden"
                        onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                        value={formVar.orden}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm text-gray-700">Variable</span>
                      <input
                        type="text"
                        name="variable"
                        onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                        value={formVar.variable}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                      />
                    </label>

                    {/* Columna derecha */}


                    {/* Más inputs visibles por defecto */}

                    <label className="block">
                      <span className="text-sm text-gray-700">Tipo</span>
                      <input
                        type="text"
                        name="tipo"
                        onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                        value={formVar.tipo}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm text-gray-700">Naturaleza</span>
                      <input
                        type="text"
                        name="naturaleza"
                        onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                        value={formVar.naturaleza}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm text-gray-700">Tamaño</span>
                      <input
                        type="text"
                        name="tamano"
                        onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                        value={formVar.tamano}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm text-gray-700">Causal</span>
                      <input
                        type="text"
                        name="causal"
                        onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                        value={formVar.causal}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm text-gray-700">Limite inferior</span>
                      <input
                        type="text"
                        name="limInf"
                        onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                        value={formVar.limInf}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm text-gray-700">Limite superior</span>
                      <input
                        type="text"
                        name="limSup"
                        onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                        value={formVar.limSup}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                      />
                    </label>

                    {/* Otro input visible */}
                    <label className="block">
                      <span className="text-sm text-gray-700">Puntaje</span>
                      <input
                        type="text"
                        name="puntaje"
                        onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                        value={formVar.puntaje}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                      />
                    </label>

                    {/* Textarea ocupa toda la fila */}
                    <label className="block">
                      <span className="text-sm text-gray-700">Descripción</span>
                      <textarea
                        name="descripcionVar"
                        onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                        value={formVar.descripcionVar}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-2 min-h-[80px] resize focus:outline-none focus:border-blue-800 focus:ring-0"
                      />
                    </label>
                  </div>
                </>
              )}
              {mostrarMenuReglaEval && (
                <>

                  <div className="grid grid-cols-3 gap-4">

                    {/* ---- BOTÓN PARA MOSTRAR INPUT OCULTO 1 ---- */}
                    <div className="col-span-3">
                      <button
                        type="button"
                        onClick={() => setMostrarExtra1(!mostrarExtra1)}
                        className="text-sm text-blue-600 underline hover:text-blue-800"
                      >
                        {mostrarExtra1 ? 'Ocultar regla de evaluacion numerica' : 'Mostrar regla de evaluacion numerica'}
                      </button>
                    </div>

                    {mostrarExtra1 && (

                      <>
                        <label className="block">
                          <span className="text-sm text-gray-700">Número de regla</span>
                          <input
                            type="text"
                            name="ReglaEvaluadora"
                            onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                            value={formVar.ReglaEvaluadora}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                          />
                        </label>

                        {/* Más inputs visibles por defecto */}

                        <label className="block">
                          <span className="text-sm text-gray-700">Campo adicional 1</span>
                          <input
                            type="text"
                            name="extra1"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-green-500 focus:ring-0"
                          />
                        </label>


                        {/* Textarea ocupa toda la fila */}

                      </>
                    )}
                    <div className="col-span-3">
                      <button
                        type="button"
                        onClick={() => setMostrarExtra2(!mostrarExtra2)}
                        className="text-sm text-blue-600 underline hover:text-blue-800"
                      >
                        {mostrarExtra2 ? 'Ocultar regla de evaluacion alfanumerica' : 'Editar regla de evaluacion alfanumerica'}
                      </button>
                    </div>

                    {mostrarExtra2 && (

                      <>
                        <label className="block">
                          <span className="text-sm text-gray-700">Número de regla</span>
                          <input
                            type="text"
                            name="ReglaEvaluadora"
                            onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                            value={formVar.ReglaEvaluadora}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                          />
                        </label>

                        {/* Más inputs visibles por defecto */}


                        <label className="block">
                          <span className="text-sm text-gray-700">descripcion :</span>
                          <input
                            type="text"
                            name="label1"
                            className="mt-1 h-7 block w-full rounded-md border border-gray-300 px-2 py-1"
                          />
                        </label>


                      </>
                    )}
                  </div>

                </>
              )}
              {mostrarMenuReglaCalc && (
                <>

                  <div className="grid grid-cols-3 gap-4">
                    <label className="block">
                      <span className="text-sm text-gray-700">Número de regla: </span>
                      <input
                        type="text"
                        name="ReglaCalculo"
                        onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                        value={formVar.ReglaCalculo}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-0"
                      />
                    </label>

                    {/* Columna izquierda */}

                    <label className="block">
                      <span className="text-sm text-gray-700">Campo adicional 1</span>
                      <input
                        type="text"
                        name="extra1"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-green-500 focus:ring-0"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm text-gray-700">Campo adicional 1</span>
                      <input
                        type="text"
                        name="extra1"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-green-500 focus:ring-0"
                      />
                    </label>

                    {/* Otro input visible */}

                  </div>
                </>
              )}
            </>
          )}

        </form>

      </div>
    </div>
  );
}