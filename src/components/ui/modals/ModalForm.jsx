import Tippy from "@tippyjs/react";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaCog, FaHireAHelper, FaQuestionCircle, FaTimes, FaTools } from "react-icons/fa";
import {
  procesonFields,
  variableEditFields,
  variableEvalAlfanumericaFields,
  variableEvalNumericaFields,
  variableReglaCalculoFields,
} from "@/mocks/mock-data";
import { createFormStateFromNode } from "@/lib/node-form-mappers";

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
  const baseFieldClassName =
    "mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0";

  const renderFormProField = (field) => (
    <label key={field.name} className="block">
      <span className="text-sm flex text-[var(--foreground)]">{field.label}</span>
      {field.type === "textarea" ? (
        <textarea
          name={field.name}
          onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
          value={formPro[field.name] || ""}
          placeholder={field.placeholder || ""}
          className={field.inputClassName || baseFieldClassName}
        />
      ) : field.type === "select" ? (
        <select
          name={field.name}
          onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
          value={formPro[field.name] || ""}
          className={field.inputClassName || baseFieldClassName}
        >
          <option value="">{field.placeholder || "Selecciona una opción"}</option>
          {(field.options || []).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={field.type || "text"}
          name={field.name}
          onChange={(e) => setFormPro({ ...formPro, [e.target.name]: e.target.value })}
          value={formPro[field.name] || ""}
          placeholder={field.placeholder || ""}
          className={field.inputClassName || baseFieldClassName}
        />
      )}
    </label>
  );

  const renderFormVarField = (field) => (
    <label key={field.name} className="block">
      <span className="text-sm text-[var(--foreground)]">{field.label}</span>
      {field.type === "textarea" ? (
        <textarea
          name={field.name}
          onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
          value={formVar[field.name] || ""}
          className={field.inputClassName || baseFieldClassName}
        />
      ) : field.type === "select" ? (
        <select
          name={field.name}
          onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
          value={formVar[field.name] || ""}
          className={field.inputClassName || baseFieldClassName}
        >
          <option value="">{field.placeholder || "Selecciona una opción"}</option>
          {(field.options || []).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={field.type || "text"}
          name={field.name}
          onChange={(e) => setFormVar({ ...formVar, [e.target.name]: e.target.value })}
          value={formVar[field.name] || ""}
          placeholder={field.placeholder || ""}
          className={field.inputClassName || baseFieldClassName}
        />
      )}
    </label>
  );

  const [mostrarExtra1, setMostrarExtra1] = useState(false);
  const [mostrarExtra2, setMostrarExtra2] = useState(false);
  const [mostrarVarRela, setMostrarVarRela] = useState(false);
  const [mostrarMenuVariable, setMostrarMenuVariable] = useState(true);
  const [mostrarMenuReglaEval, setMostrarMenuReglaEval] = useState(false);
  const [mostrarMenuReglaCalc, setMostrarMenuReglaCalc] = useState(false);

  useEffect(() => {
    if (!selectedNode) return;
    const next = createFormStateFromNode(selectedNode);
    setFormPro(next.formPro);
    setFormVar(next.formVar);
  }, [selectedNode, setFormPro, setFormVar]);

  const nodeType = String(selectedNode?.type || "").toLowerCase();

  if (!isOpenEdit || !selectedNode) return null;

  return (
    <div className="fixed font-sans inset-0 bg-[color:var(--neutral-800)]/40 backdrop-blur-xs flex items-center justify-center z-[99999]">
      <div className="absolute left-10 top-72 hidden flex cursor-pointer rounded-md bg-[var(--accent)] px-3 py-[3px] text-[var(--accent-foreground)] transition hover:opacity-90">
        <FaArrowLeft className="mt-1 mr-1" /> <h2>Anterior</h2>
      </div>
      <div className="absolute right-10 top-72 hidden flex cursor-pointer rounded-md bg-[var(--accent)] px-3 py-[3px] text-[var(--accent-foreground)] transition hover:opacity-90 hover:z-[9999999] ">
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
                {procesonFields.map(renderFormProField)}
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
                    {variableEditFields.map(renderFormVarField)}
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
                      <>{variableEvalNumericaFields.map(renderFormVarField)}</>
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
                      <>{variableEvalAlfanumericaFields.map(renderFormVarField)}</>
                    )}
                  </div>

                </>
              )}
              {mostrarMenuReglaCalc && (
                <>

                  <div className="grid grid-cols-3 gap-4">
                    {variableReglaCalculoFields.map(renderFormVarField)}
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
