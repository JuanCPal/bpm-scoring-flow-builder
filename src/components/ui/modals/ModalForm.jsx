import Tippy from "@tippyjs/react";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaCog, FaHireAHelper, FaQuestionCircle, FaTimes, FaTools } from "react-icons/fa";

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
  }, [selectedNode]);

  const nodeType = String(selectedNode?.type || "").toLowerCase();

  if (!isOpenEdit || !selectedNode) return null;

  return (
    <div className="fixed font-sans inset-0 bg-[color:var(--neutral-800)]/40 backdrop-blur-xs flex items-center justify-center z-[99999]">
      <div className="absolute left-10 top-72 flex cursor-pointer rounded-md bg-[var(--accent)] px-3 py-[3px] text-[var(--accent-foreground)] transition hover:opacity-90">
        <FaArrowLeft className="mt-1 mr-1" /> <h2>Anterior</h2>
      </div>
      <div className="absolute right-10 top-72 flex cursor-pointer rounded-md bg-[var(--accent)] px-3 py-[3px] text-[var(--accent-foreground)] transition hover:opacity-90 hover:z-[9999999] ">
       <h2 className="flex gap-1 truncate">Siguiente {selectedNode.data?.label}</h2> <FaArrowRight className="mt-1 ml-1" /> 
      </div>

      <div
        className={`relative max-h-[98%] overflow-y-auto rounded-lg bg-[var(--surface)] px-6 pb-5 shadow-2xl ${selectedNode.type === "Variable" ? "w-[1100px] " : "w-[1100px]"} max-w-full`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`fixed -ml-6 rounded-t-lg border-b border-[var(--border)] bg-[var(--surface-muted)] px-3 pb-1 pt-3 backdrop-blur-lg ${selectedNode.type === "Variable" ? "w-[1100px]" : "w-[1100px]"}`}>
          <div className="flex">
            <h2 className="flex text-[18px] text-[var(--foreground)] ">
              <FaCog className="mr-1.5 mt-1" /> <span>{selectedNode.data?.proceso || selectedNode.data?.variable || selectedNode.data?.label}</span>
            </h2>
            <button
              onClick={selectedNode?.type === "Variable" ? handleEditVariable : handleEditProceso}
              className="absolute right-15 -mt-1.5 cursor-pointer rounded-lg bg-[var(--accent)] px-3 py-1 text-[14px] text-[var(--accent-foreground)] transition hover:opacity-90"

            >
              Guardar
            </button>
            <p className="absolute right-6 cursor-pointer text-[var(--muted)] transition hover:text-[var(--foreground)]" onClick={() => setIsOpenEdit(false)}> <FaTimes /> </p>
          </div>
        </div>

        <form key={selectedNode.id} className="mt-20 space-y-4 [&_input]:border-[var(--border)] [&_input]:bg-[var(--surface-muted)] [&_input]:text-[var(--foreground)] [&_input]:focus:border-[var(--accent)] [&_label]:!text-[var(--foreground)] [&_select]:border-[var(--border)] [&_select]:bg-[var(--surface-muted)] [&_select]:text-[var(--foreground)] [&_select]:focus:border-[var(--accent)] [&_span]:!text-[var(--foreground)] [&_textarea]:border-[var(--border)] [&_textarea]:bg-[var(--surface-muted)] [&_textarea]:text-[var(--foreground)] [&_textarea]:focus:border-[var(--accent)]">
          {selectedNode?.type === "Proceson" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm flex text-[var(--foreground)]">Orden: </span>
                  <input
                    type="number"
                    name="orden"
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    value={formPro.orden}
                    placeholder="Orden del proceso en el flujo"
                    className="mt-1 block w-full rounded-md border bg-[var(--surface-muted)] border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                  />
                </label>

                <label className="block">
                  <span className="text-sm flex text-[var(--foreground)]">Proceso: </span>
                  <input
                    type="text"
                    name="nombre"
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    value={formPro.nombre}                    
                    placeholder="Nombre del proceso"
                    className="mt-1 block w-full rounded-md border border-[var(--border)] bg-[var(--surface-muted)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-1"
                  />
                </label>

                <label className="block">
                  <span className="text-sm flex text-[var(--foreground)]">Descripcion</span>
                  <textarea
                    type="text"
                    name="descripcion"
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    value={formPro.descripcion}
                    placeholder="Añadir descripción"
                    className="mt-1 block w-full rounded-md border font-extralight bg-[var(--surface-muted)] border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                  />
                </label>

                <label className="block">
                  <Tippy content="Es el paso a seguir en la evaluacion del proyecto" placement="left" zIndex={"99999"} animation="scale"
                    duration={[300, 300]}
                    delay={[150, 0]}>
                    <span className="text-sm flex text-[var(--foreground)]">
                      Siguiente paso:  <FaQuestionCircle className="hover:opacity-35 cursor-pointer" />
                    </span></Tippy>
                  <select
                    name="SiguientePaso"
                    value={formPro.SiguientePaso}
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-[var(--border)] bg-[var(--surface-muted)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                  >
                    <option value="">Seleccione el paso a seguir</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatico">Automatico</option>
                    <option value="EnlazarOperador">Enlazar operador</option>
                    <option value="EnlaceNEP">Enlace NEP</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm flex text-[var(--foreground)]">Proceso negado: </span>
                  <input
                    type="text"
                    name="ProcesoNegado"
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    value={formPro.ProcesoNegado}
                    className="mt-1 block w-full rounded-md border bg-[var(--surface-muted)] border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                  />
                </label>

                <label className="block">
                  <span className="text-sm flex text-[var(--foreground)]">CTL tiempos</span>
                  <input
                    type="text"
                    name="CTLTiempos"
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    value={formPro.CTLTiempos}
                    className="mt-1 block w-full rounded-md border border-[var(--border)]  px-2 py-1 bg-[var(--surface-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                  />
                </label>

                <label className="block">
                  <span className="text-sm flex text-[var(--foreground)]">Codigo grupo de proceso: </span>
                  <input
                    type="text"
                    name="CodigoGrupoProceso"
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    value={formPro.CodigoGrupoProceso}
                    className="mt-1 block w-full rounded-md border border-[var(--border)] bg-[var(--surface-muted)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                  />
                </label>
                <label className="block">
                  <span className="text-sm flex text-[var(--foreground)]">Producto de negado: </span>
                  <input
                    type="text"
                    name="ProductoNegado"
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    value={formPro.ProductoNegado}
                    className="mt-1 block w-full rounded-md border border-[var(--border)] bg-[var(--surface-muted)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                  />
                </label>

                <label className="block">
                  <span className="text-sm flex text-[var(--foreground)]">
                    Estado de aprobación:
                  </span>
                  <select
                    name="EstadoAprobacion"
                    value={formPro.EstadoAprobacion}
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-[var(--border)] bg-[var(--surface-muted)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                  >
                    <option value="">Selecciona un estado</option>
                    <option value="Preaprobado">Preaprobado</option>
                    <option value="Aprobado">Aprobado</option>
                    <option value="Negado">Negado</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm flex text-[var(--foreground)]">Indicador de nueva solicitud: </span>
                  <input
                    type="text"
                    name="IndicadorNuevaSolicitud"
                    onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
                    value={formPro.IndicadorNuevaSolictud}
                    className="mt-1 block w-full rounded-md border border-[var(--border)] bg-[var(--surface-muted)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                  />
                </label>

                <label className="block">
                  <span className="text-sm flex text-[var(--foreground)]">Página de captura</span>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                  />
                </label>
                <label className="block">
                  <span className="text-sm flex text-[var(--foreground)]">Tiempo Máx. Proceso</span>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                  />
                </label>
                <label className="block">
                  <span className="text-sm flex text-[var(--foreground)]">Nep de llamado </span>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                  />
                </label>
                <label className="block">
                  <span className="text-sm flex text-[var(--foreground)]">Programa a llamar</span>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                  />
                </label>

                <label className="block">
                  <span className="text-sm flex text-[var(--foreground)]">Secuencia de llamdo </span>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                  />
                </label>
                <label className="block">
                  <span className="text-sm flex text-[var(--foreground)]">Tipo de llamado ▼ </span>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                  />
                </label>
                <label className="block">
                  <span className="text-sm flex text-[var(--foreground)]">Dia Máx. a transferir </span>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                  />
                </label>
                <label className="block">
                  <span className="text-sm flex text-[var(--foreground)]">Linea a pasar solicitud </span>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                  />
                </label>
                <label className="block">
                  <span className="text-sm flex text-[var(--foreground)]">Proceso a pasar </span>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                  />
                </label>
              </div>
            </>
          )}

          {selectedNode?.type === "Variable" && (
            <>
              <div className="-mt-8 flex w-full border-b border-[var(--border)] text-center">
                <h4 className={`cursor-pointer px-10 py-1 text-center text-[15px] transition hover:text-[var(--accent)] ${mostrarMenuVariable ? "border-b-1 border-[var(--accent)] text-[var(--accent)]" : "text-[var(--foreground)]"}`}
                  onClick={() => {
                    setMostrarMenuVariable(true)
                    setMostrarMenuReglaCalc(false)
                    setMostrarMenuReglaEval(false)
                  }}>Editar variable</h4>
                <h4 className={`cursor-pointer px-10 py-1 text-center text-[15px] transition hover:text-[var(--accent)] ${mostrarMenuReglaEval ? "border-b-1 border-[var(--accent)] text-[var(--accent)]" : "text-[var(--foreground)]"}`}
                  onClick={() => {
                    setMostrarMenuVariable(false)
                    setMostrarMenuReglaCalc(false)
                    setMostrarMenuReglaEval(true)
                  }}>Editar regla evaluadora</h4>
                <h4 className={`cursor-pointer px-10 py-1 text-center text-[15px] transition hover:text-[var(--accent)] ${mostrarMenuReglaCalc ? "border-b-1 border-[var(--accent)] text-[var(--accent)]" : "text-[var(--foreground)]"}`}
                  onClick={() => {
                    setMostrarMenuVariable(false)
                    setMostrarMenuReglaCalc(true)
                    setMostrarMenuReglaEval(false)
                  }}>Editar regla de calculo</h4>
              </div>
              {mostrarMenuVariable && (
                <>
                  <div className="grid w-full grid-cols-4 gap-4 border-b border-[var(--border)] pb-2">
                    <label className="inline-flex items-center cursor-pointer group pb-3">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        onChange={() => { setMostrarVarRela(!mostrarVarRela) }}
                      />
                      <div className="flex h-5 w-5 items-center justify-center rounded border border-[var(--border)] transition-colors duration-200 peer-checked:border-[var(--accent)] peer-checked:bg-[var(--accent)]">
                        <svg
                          className="h-3 w-3 text-[var(--accent-foreground)] opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <polyline points="4 11 8 15 16 6" />
                        </svg>
                      </div>
                      <span className="ml-2 text-sm text-[var(--foreground)] transition-colors duration-200 group-hover:text-[var(--foreground)]">
                        ¿Tiene variable relacionada?
                      </span>
                    </label>

                    {/*mostrar input variable rerlacionada*/}
                    {mostrarVarRela && (
                      <>
                        <label className="block ml-10 mb-4">
                          <span className="text-sm text-[var(--foreground)]">Variable relacionada: </span>
                          <input
                            type="text"
                            name="varRel"
                            onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                            value={formVar.varRel}
                            className="mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-1 max-h-7 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                          />
                        </label>
                        <br />
                      </>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4">

                    {/* Columna izquierda */}
                    <label className="block">
                      <span className="text-sm text-[var(--foreground)]">Orden: </span>
                      <input
                        type="number"
                        name="orden"
                        onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                        value={formVar.orden}
                        className="mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm text-[var(--foreground)]">Variable</span>
                      <input
                        type="text"
                        name="variable"
                        onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                        value={formVar.variable}
                        className="mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                      />
                    </label>

                    {/* Columna derecha */}


                    {/* Más inputs visibles por defecto */}

                    <label className="block">
                      <span className="text-sm text-[var(--foreground)]">Tipo</span>
                      <input
                        type="text"
                        name="tipo"
                        onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                        value={formVar.tipo}
                        className="mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm text-[var(--foreground)]">Naturaleza</span>
                      <input
                        type="text"
                        name="naturaleza"
                        onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                        value={formVar.naturaleza}
                        className="mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm text-[var(--foreground)]">Tamaño</span>
                      <input
                        type="text"
                        name="tamano"
                        onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                        value={formVar.tamano}
                        className="mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm text-[var(--foreground)]">Causal</span>
                      <input
                        type="text"
                        name="causal"
                        onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                        value={formVar.causal}
                        className="mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm text-[var(--foreground)]">Limite inferior</span>
                      <input
                        type="text"
                        name="limInf"
                        onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                        value={formVar.limInf}
                        className="mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm text-[var(--foreground)]">Limite superior</span>
                      <input
                        type="text"
                        name="limSup"
                        onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                        value={formVar.limSup}
                        className="mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                      />
                    </label>

                    {/* Otro input visible */}
                    <label className="block">
                      <span className="text-sm text-[var(--foreground)]">Puntaje</span>
                      <input
                        type="text"
                        name="puntaje"
                        onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                        value={formVar.puntaje}
                        className="mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                      />
                    </label>

                    {/* Textarea ocupa toda la fila */}
                    <label className="block">
                      <span className="text-sm text-[var(--foreground)]">Descripción</span>
                      <textarea
                        name="descripcionVar"
                        onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                        value={formVar.descripcionVar}
                        className="mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-2 min-h-[80px] resize focus:outline-none focus:border-[var(--accent)] focus:ring-0"
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
                        className="text-sm text-[var(--accent)] underline transition hover:opacity-80"
                      >
                        {mostrarExtra1 ? 'Ocultar regla de evaluacion numerica' : 'Mostrar regla de evaluacion numerica'}
                      </button>
                    </div>

                    {mostrarExtra1 && (

                      <>
                        <label className="block">
                          <span className="text-sm text-[var(--foreground)]">Número de regla</span>
                          <input
                            type="text"
                            name="ReglaEvaluadora"
                            onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                            value={formVar.ReglaEvaluadora}
                            className="mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                          />
                        </label>

                        {/* Más inputs visibles por defecto */}

                        <label className="block">
                          <span className="text-sm text-[var(--foreground)]">Campo adicional 1</span>
                          <input
                            type="text"
                            name="extra1"
                            className="mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                          />
                        </label>


                        {/* Textarea ocupa toda la fila */}

                      </>
                    )}
                    <div className="col-span-3">
                      <button
                        type="button"
                        onClick={() => setMostrarExtra2(!mostrarExtra2)}
                        className="text-sm text-[var(--accent)] underline transition hover:opacity-80"
                      >
                        {mostrarExtra2 ? 'Ocultar regla de evaluacion alfanumerica' : 'Editar regla de evaluacion alfanumerica'}
                      </button>
                    </div>

                    {mostrarExtra2 && (

                      <>
                        <label className="block">
                          <span className="text-sm text-[var(--foreground)]">Número de regla</span>
                          <input
                            type="text"
                            name="ReglaEvaluadora"
                            onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                            value={formVar.ReglaEvaluadora}
                            className="mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                          />
                        </label>

                        {/* Más inputs visibles por defecto */}


                        <label className="block">
                          <span className="text-sm text-[var(--foreground)]">descripcion :</span>
                          <input
                            type="text"
                            name="label1"
                            className="mt-1 h-7 block w-full rounded-md border border-[var(--border)] px-2 py-1"
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
                      <span className="text-sm text-[var(--foreground)]">Número de regla: </span>
                      <input
                        type="text"
                        name="ReglaCalculo"
                        onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
                        value={formVar.ReglaCalculo}
                        className="mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                      />
                    </label>

                    {/* Columna izquierda */}

                    <label className="block">
                      <span className="text-sm text-[var(--foreground)]">Campo adicional 1</span>
                      <input
                        type="text"
                        name="extra1"
                        className="mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm text-[var(--foreground)]">Campo adicional 1</span>
                      <input
                        type="text"
                        name="extra1"
                        className="mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0"
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
