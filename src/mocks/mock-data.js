export const projects = [
  {
    id: "linea-1",
    name: "Proyecto de prueba 1",
    savedAt: new Date().toISOString(),
    nodes: [],
    edges: [],
  },
  {
    id: "linea-2",
    name: "Proyecto de prueba 2",
    savedAt: new Date().toISOString(),
    nodes: [],
    edges: [],
  },
];

export const projectCardEditFields = [
  { name: "producto", label: "Producto", type: "text" },
  {
    name: "descripcion",
    label: "Descripción",
    type: "textarea",
    placeholder: "Añadir descripción",
  },
  { name: "limiteInferior", label: "Limite inferior", type: "text" },
  { name: "limiteSuperior", label: "Limite superior", type: "text" },
  { name: "variableValorSolicitado", label: "Variable valor solicitado", type: "number" },
  { name: "variableValorDesembolsar", label: "Variable valor desembolsar", type: "number" },
  { name: "variableValorAprobado", label: "Variable valor aprobado", type: "number" },
  { name: "variablePuntaje", label: "Variable puntaje", type: "number" },
  { name: "variableMercadoObjetivo", label: "Variable mercado objetivo", type: "number" },
  { name: "numeroNegadas", label: "Nº. de negadas", type: "text" },
  { name: "plazoNegadas", label: "Plazo de negadas", type: "text" },
  { name: "interesMoro", label: "Interés moro", type: "text" },
  { name: "productoSiif", label: "Producto SIIF", type: "text" },
  { name: "prestamos", label: "Préstamos", type: "text" },
  { name: "plazo", label: "Plazo", type: "text" },
  { name: "procesoParaInterface", label: "Proceso para interface", type: "text" },
  { name: "paginaWebCaptura", label: "Pagina WEB de captura", type: "text" },
];

export const projectDetails = {
  "linea-1": {
    id: "linea-1",
    name: "Proyecto de prueba 1",
    nodes: [{
    "id": "p-06422f09-12ec-4734-8c22-15647d737dbf",
    "type": "Proceson",
    "position": {
      "x": -42,
      "y": 114
    },
    "data": {
      "label": "Proceso",
      "nombre": "",
      "parametros": {
        "orden": "",
        "variable": "",
        "reglaEvaluadora": "",
        "reglaDeCalculo": "",
        "descripcionVar": "",
        "varRel": "",
        "tipo": "",
        "naturaleza": "",
        "tam": "",
        "caus": "",
        "NRE": "",
        "limInferior": "",
        "limSuperior": "",
        "descripcion": "",
        "puntaje": "",
        "p_bif": "",
        "reporte": "",
        "RC": "",
        "desPagDinamic": "",
        "observaciones": ""
      }
    },
    "width": 90,
    "height": 80,
    "selected": false,
    "dragging": false,
    "positionAbsolute": {
      "x": -42,
      "y": 114
    }
  },
  {
    "id": "S-becfbba3-d14c-4bd1-a8c3-0b1cc5d2f3bf",
    "type": "Start",
    "position": {
      "x": -168,
      "y": 126
    },
    "data": {
      "label": "Inicio"
    },
    "width": 50,
    "height": 50,
    "selected": false,
    "positionAbsolute": {
      "x": -168,
      "y": 126
    },
    "dragging": false
  },
  {
    "id": "Proceson-3edffdcb-24a2-4854-b18f-a95ff4e8e11e",
    "type": "Proceson",
    "position": {
      "x": 178,
      "y": 114
    },
    "data": {
      "label": "Proceson"
    },
    "width": 90,
    "height": 80,
    "selected": false,
    "dragging": false
  },
  {
    "id": "Proceson-e516997d-ab78-4a99-bb55-201f08824549",
    "type": "Proceson",
    "position": {
      "x": 402,
      "y": 114
    },
    "data": {
      "label": "Proceson"
    },
    "width": 90,
    "height": 80,
    "selected": false,
    "positionAbsolute": {
      "x": 402,
      "y": 114
    },
    "dragging": false
  },
  {
    "id": "Proceson-a3aad5a6-0aff-418d-b724-8b9c9aa0a996",
    "type": "Proceson",
    "position": {
      "x": 622,
      "y": 114
    },
    "data": {
      "label": "Proceson"
    },
    "width": 90,
    "height": 80,
    "selected": false,
    "dragging": false
  },
  {
    "id": "Fin-2ce09420-2e9f-4b25-bcd5-5eb4b85ec7d4",
    "type": "Fin",
    "position": {
      "x": 842,
      "y": 114
    },
    "data": {
      "label": "Fin"
    },
    "width": 50,
    "height": 50,
    "selected": false,
    "dragging": false
  }],
    edges: [{
    "source": "S-becfbba3-d14c-4bd1-a8c3-0b1cc5d2f3bf",
    "sourceHandle": null,
    "target": "p-06422f09-12ec-4734-8c22-15647d737dbf",
    "targetHandle": "ct2",
    "type": "default",
    "animated": true,
    "style": {
      "stroke": "#0060fa",
      "strokeWidth": 2,
      "strokeDasharray": "5 5"
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#0060fa"
    },
    "id": "reactflow__edge-S-becfbba3-d14c-4bd1-a8c3-0b1cc5d2f3bf-p-06422f09-12ec-4734-8c22-15647d737dbfct2"
  },
  {
    "id": "e-p-06422f09-12ec-4734-8c22-15647d737dbf-Proceson-3edffdcb-24a2-4854-b18f-a95ff4e8e11e",
    "source": "p-06422f09-12ec-4734-8c22-15647d737dbf",
    "sourceHandle": "cs1",
    "target": "Proceson-3edffdcb-24a2-4854-b18f-a95ff4e8e11e",
    "targetHandle": "ct2",
    "type": "default",
    "animated": true,
    "style": {
      "stroke": "#0060fa",
      "strokeWidth": 2,
      "strokeDasharray": "5 5"
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#0060fa"
    }
  },
  {
    "id": "e-Proceson-3edffdcb-24a2-4854-b18f-a95ff4e8e11e-Proceson-e516997d-ab78-4a99-bb55-201f08824549",
    "source": "Proceson-3edffdcb-24a2-4854-b18f-a95ff4e8e11e",
    "sourceHandle": "cs1",
    "target": "Proceson-e516997d-ab78-4a99-bb55-201f08824549",
    "targetHandle": "ct2",
    "type": "default",
    "animated": true,
    "style": {
      "stroke": "#0060fa",
      "strokeWidth": 2,
      "strokeDasharray": "5 5"
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#0060fa"
    }
  },
  {
    "id": "e-Proceson-e516997d-ab78-4a99-bb55-201f08824549-Proceson-a3aad5a6-0aff-418d-b724-8b9c9aa0a996",
    "source": "Proceson-e516997d-ab78-4a99-bb55-201f08824549",
    "sourceHandle": "cs1",
    "target": "Proceson-a3aad5a6-0aff-418d-b724-8b9c9aa0a996",
    "targetHandle": "ct2",
    "type": "default",
    "animated": true,
    "style": {
      "stroke": "#0060fa",
      "strokeWidth": 2,
      "strokeDasharray": "5 5"
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#0060fa"
    }
  },
  {
    "id": "e-Proceson-a3aad5a6-0aff-418d-b724-8b9c9aa0a996-Fin-2ce09420-2e9f-4b25-bcd5-5eb4b85ec7d4",
    "source": "Proceson-a3aad5a6-0aff-418d-b724-8b9c9aa0a996",
    "sourceHandle": "cs1",
    "target": "Fin-2ce09420-2e9f-4b25-bcd5-5eb4b85ec7d4",
    "targetHandle": "ct2",
    "type": "default",
    "animated": true,
    "style": {
      "stroke": "#0060fa",
      "strokeWidth": 2,
      "strokeDasharray": "5 5"
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#0060fa"
    }
  }],
  },
  "linea-2": {
    id: "linea-2",
    name: "Proyecto de prueba 2",
    nodes: [],
    edges: [],
  },
};

export const variableEditFields = [
  { name: "numeroVariable", label: "Numero de la variable", type: "text" },
  { name: "variable", label: "Variable", type: "text" },
    {
    name: "tipo",
    label: "Tipo de variable:",
    type: "select",
    placeholder: "Selecciona un tipo",
    options: [
      { value: "M", label: "M=Obligatoria" },
      { value: "O", label: "O=Opcional" },
      { value: "I", label: "I=Informativa" },
    ],
  },
    {
    name: "naturaleza",
    label: "Naturaleza:",
    type: "select",
    placeholder: "Selecciona naturaleza",
    options: [
      { value: "N", label: "N=Numerica" },
      { value: "A", label: "A=Alfanumerica" },
      { value: "F", label: "F=Fecha" },
    ],
  },
  {
    name: "origenVariable",
    label: "Origen de la variable:",
    type: "select",
    placeholder: "Selecciona un origen",
    options: [
      { value: "D", label: "D=Digitada" },
      { value: "C", label: "C=Calculada" },
      { value: "E", label: "E=Externa" },
    ],
  },
  { name: "grupoVariable", label: "Grupo de la variable", type: "text" },
  { name: "tamano", label: "Tamaño", type: "text" },
  {
    name: "continuacionProceso",
    label: "Continuacion proceso: ",
    type: "select",
    placeholder: "Selecciona una opcion",
    options: [
      { value: "S", label: "Si" },
      { value: "N", label: "No" },
    ],
  },
  { name: "peso", label: "Peso", type: "number" },
  {
    name: "indicadorOverride",
    label: "Indicador override: ",
    type: "select",
    placeholder: "Selecciona una opcion",
    options: [
      { value: "S", label: "Si" },
      { value: "N", label: "No" },
    ],
  },
  { name: "siNoExisteRangoContinue", label: "Si no existe rango continue: ", type: "text" },  
  { name: "puntajeMaximo", label: "Puntaje maximo: ", type: "number" },
  { name: "indicativoAuditoria", label: "Indicativo auditoria", type: "text" },
  { name: "puntajeMinimo", label: "Puntaje minimo: ", type: "number" },
  {
    name: "indicativoCargue",
    label: "Indicativo de cargue: ",
    type: "select",
    placeholder: "Selecciona un origen",
    options: [
      { value: "I", label: "I=Carga informacion a la linea de los estados financieros e indices" },
      { value: "S", label: "S=Carga información a la línea asociada por medio de una variable." },
      { value: "N", label: "N=No cargue" },
    ],
  },  
  { name: "causalNegacion", label: "Puntaje maximo. ", type: "number" },
  { name: "literal", label: "Literal: ", type: "text" },  
  { name: "literal2", label: "Literal 2: ", type: "text" },
  {
    name: "descripcionVar",
    label: "Descripción",
    type: "textarea",
    inputClassName:
      "mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-2 min-h-[80px] resize focus:outline-none focus:border-[var(--accent)] focus:ring-0",
  },
];

export const procesonFields = [
  { name: "proceso", label: "Proceso:", type: "text", placeholder: "Nombre del proceso" },
  {
    name: "descripcion",
    label: "Descripcion",
    type: "textarea",
    placeholder: "Añadir descripción",
    inputClassName:
      "mt-1 block w-full rounded-md border font-extralight bg-[var(--surface-muted)] border-[var(--border)] px-2 py-1 focus:outline-none focus:border-[var(--accent)] focus:ring-0",
  },
  {
    name: "SiguientePaso",
    label: "Siguiente paso:",
    type: "select",
    placeholder: "Seleccione el paso a seguir",
    tooltip: "Es el paso a seguir en la evaluacion del proyecto",
    options: [
      { value: "Manual", label: "Manual" },
      { value: "Automatico", label: "Automatico" },
      { value: "EnlazarOperador", label: "Enlazar operador" },
      { value: "EnlaceNEP", label: "Enlace NEP" },
    ],
  },
  { name: "ProcesoNegado", label: "Proceso negado:", type: "text" },
  { name: "CTLTiempos", label: "CTL tiempos", type: "text" },
  { name: "CodigoGrupoProceso", label: "Codigo grupo de proceso:", type: "text" },
  { name: "ProductoNegado", label: "Producto de negado:", type: "text" },
  {
    name: "EstadoAprobacion",
    label: "Estado de aprobación:",
    type: "select",
    placeholder: "Selecciona un estado",
    options: [
      { value: "Preaprobado", label: "Preaprobado" },
      { value: "Aprobado", label: "Aprobado" },
      { value: "Negado", label: "Negado" },
    ],
  },
  { name: "IndicadorNuevaSolicitud", label: "Indicador de nueva solicitud:", type: "text" },
  { name: "PaginaCaptura", label: "Página de captura", type: "text" },
  { name: "TiempoMaxProceso", label: "Tiempo Máx. Proceso", type: "text" },
  { name: "NepLlamado", label: "Nep de llamado", type: "text" },
  { name: "ProgramaLlamar", label: "Programa a llamar", type: "text" },
  { name: "SecuenciaLlamado", label: "Secuencia de llamado", type: "text" },
  { name: "TipoLlamado", label: "Tipo de llamado", type: "text" },
  { name: "DiaMaxTransferir", label: "Dia Máx. a transferir", type: "text" },
  { name: "LineaPasarSolicitud", label: "Linea a pasar solicitud", type: "text" },
  { name: "ProcesoPasar", label: "Proceso a pasar", type: "text" },
  { name: "iconoGrafico", label: "Icono en grafico: ", type: "text" },
  { name: "HoraInicial", label: "Hora inicial: ", type: "text" },
  { name: "HoraInicialUno", label: "Hora inicial uno: ", type: "text" },
  { name: "AntiguedadDias", label: "Antiguedad en dias: ", type: "text" },
  { name: "UsoValorSolicitado", label: "Uso valor solicitado: ", type: "text" },
  { name: "usoValorAprobado", label: "Uso  valor aprobado", type: "text" },
  { name: "OrganizaFechaHora", label: "Oraganiza por fecha y hora: ", type: "text" },
  { name: "PesoAntiguedadDias", label: "Peso de antiguedad en dias: r", type: "text" },
  { name: "PesoValorSolicitado", label: "Peso valor solicitado: ", type: "text" },
  { name: "PesoValorAprobado", label: "Peso valor aprobado: ", type: "text" },
  { name: "pesoVariablesPendientes", label: "Peso N de Variables Pendientes: ", type: "text" },
  { name: "VarDesplegar01", label: "Var. adesplegar 01: ", type: "text" },
  {
    name: "tipoVariable01",
    label: "Tipo de variable 01: ",
    type: "select",
    placeholder: "Selecciona un estado",
    options: [
      { value: "D", label: "D = predefinida " },
      { value: "C", label: "C = contenido variable" },
      { value: "P", label: "P = puntaje" },
    ],
  },
  {
    name: "mascaraCampo01",
    label: "Mascara campo 01: ",
    type: "select",
    placeholder: "Selecciona un estado",
    options: [
      { value: "B", label: "B = horas HH/MM/SS." },
      { value: "D", label: "D = fecha =día nombre _ mes año" },
      { value: "E", label: "E = descripción reglas de evaluación " },
      { value: "F", label: "F = fecha AAAA/MM/DD" },
      { value: "H", label: "H = selección descripción de campos" },
      { value: "K", label: "K = descripción código de la ciudad" },
      { value: "L", label: "L = valores en letras más descripción de la moneda" },
      { value: "M", label: "M = valores comas y puntos" },
      { value: "N", label: "N = sin mascara" },
      { value: "O", label: "O = valores en letras" },
      { value: "W", label: "W = sin mascara o campo completo" },

    ],
  },
];

export const variableEvalNumericaFields = [
  { name: "numeroRegla", label: "Número de regla", type: "text" },
  {
    name: "descripcionEvalNum",
    label: "Descripción: ",
    type: "textarea",
    inputClassName:
      "mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-2 min-h-[80px] resize focus:outline-none focus:border-[var(--accent)] focus:ring-0",
  },
  { name: "limiteInferior", label: "Limite inferior: ", type: "number" },  
  {
    name: "negacionCredito",
    label: "Negacion del crédito: ",
    type: "select",
    placeholder: "Selecciona una opcion",
    options: [
      { value: "S", label: "Niega el credito" },
      { value: "N", label: "Continua con el proceso de evaluación" },
    ],
  },
  { name: "limiteSuperior", label: "Limite superior: ", type: "number" },  
  {
    name: "terminacionProceso",
    label: "Continuacion proceso: ",
    type: "select",
    placeholder: "Selecciona un origen",
    options: [
      { value: "S", label: "Finaliza proceso de evaluacion" },
      { value: "N", label: "Continua con el proceso" },
    ],
  },
  { name: "puntajeConstante", label: "Puntaje Constante: ", type: "text" },
  { name: "variableRelacionada", label: "Variable Relacionada: ", type: "number" }, 
  { name: "Segundo factor", label: "Segundo factor: ", type: "text" },
  { name: "suma", label: "Suma: ", type: "text" },
  { name: "puntajeMinimo", label: "Puntaje Minimo: ", type: "number" },
  { name: "resta", label: "Resta: ", type: "text" },
  { name: "puntajeMaximo", label: "Puntaje maximo: ", type: "number" }, 
  { name: "multiplicacion", label: "Multiplicacion: ", type: "text" },
  { name: "causalNegacion", label: "Causal de negación", type: "text" },
  { name: "division", label: "Division: ", type: "text" },
  { name: "exponenciacion", label: "Exponenciación: ", type: "text" },
  { name: "proceso", label: "Proceso: ", type: "text" },
  { name: "perfil", label: "Perfil: ", type: "text" },
  { name: "peso", label: "Peso: ", type: "text" },
  { name: "lineaProcesoBifurcacion", label: "Linea y proceso de Bifurcación: ", type: "text" },
  { name: "fuenteDatos", label: "Fuente de datos: ", type: "text" },
  { name: "grupoDocumentos", label: "Grupo de documentos: ", type: "text" },
  { name: "nombreReporte", label: "Nombre del reporte: ", type: "text" },                                      
];

export const variableEvalAlfanumericaFields = [
  { name: "NumeroRegla", label: "Número de regla", type: "number" },
    {
    name: "descripcion",
    label: "Descripción: ",
    type: "textarea",
    inputClassName:
      "mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-2 min-h-[80px] resize focus:outline-none focus:border-[var(--accent)] focus:ring-0",
  },
  { name: "limiteInferior", label: "Limite inferior: ", type: "number" },
  { name: "limiteSuperior", label: "Limite superior: ", type: "number" },
  { name: "puntajeConstante", label: "Puntaje constante: ", type: "number" },
  { name: "NumeroReglaTexto", label: "Número de regla: ", type: "text" },
  { name: "variableRelacionada", label: "Variable relacionada: ", type: "text" },
  {
    name: "terminacionProceso",
    label: "Terminacion del proceso: ",
    type: "select",
    placeholder: "Selecciona un origen",
    options: [
      { value: "S", label: "Finaliza proceso de evaluación" },
      { value: "N", label: "Continua la evaluación" },
    ],
  },
  {
    name: "negacionCredito",
    label: "Negación de credito: ",
    type: "select",
    placeholder: "Selecciona un origen",
    options: [
      { value: "S", label: "Niega el credito" },
      { value: "N", label: "Continua con el proceso de evaluación" },
    ],
  },
  { name: "causalNegacion", label: "Causal de negación: ", type: "text" },
  { name: "lineaProcesoBifurcacion", label: "Linea y proceso de bifurcación: ", type: "text" },
  { name: "proceso", label: "Proceso: ", type: "text" },
  { name: "perfil", label: "Perfil: ", type: "number" },
  { name: "peso", label: "Peso: ", type: "text" },
  { name: "nombreReporte", label: "Nombre del reporte: ", type: "text" },
  { name: "fuenteDatos", label: "Fuente de datos: ", type: "text" },
  { name: "grupoDocumentos", label: "Grupo de documentos: ", type: "text" },
  { name: "contenidoFinalVariable", label: "Contenido final de la variable: ", type: "number" },      
];

export const variableReglaCalculoFields = [
  { name: "numeroRegla", label: "Número de regla: ", type: "number" },
  {
    name: "descripcion",
    label: "Descripción: ",
    type: "textarea",
    inputClassName:
      "mt-1 block w-full rounded-md border border-[var(--border)] px-2 py-2 min-h-[80px] resize focus:outline-none focus:border-[var(--accent)] focus:ring-0",
  },
  {
    name: "tipoFactor2",
    label: "Tipo de factor: ",
    type: "select",
    placeholder: "Selecciona un origen",
    options: [
      { value: "V", label: "V = Toma el contenido de una variable" },
      { value: "E", label: "E = Toma la magnitud efectiva de una tasa" },
      { value: "T", label: "T = Toma la magnitud nominal de una tasa" },
      { value: "S", label: "S = Toma la suma de los contenidos o puntajes de las solicitudes los codeudores" },
      { value: "F", label: "F = Toma la fecha del sistema de Iniciación de Clientes" },
      { value: "C", label: "C = Toma el valor de una constante" },
      { value: "M", label: "M = Valor máximo permitido para el Operador" },
      { value: "D", label: "D = Contenido de la variable de la solicitud del Deudor principal" },
      { value: "G", label: "G = Puntaje de la variable de la solicitud del Deudor principal" },
      { value: "A", label: "A = Magnitud nominal de la primera tasa definida en el plan de interés indicado en el campo ELTVXX" },
      { value: "B", label: "B = Magnitud efectiva de la primera tasa definida en el plan de interés indicado en el campo ELTVXX" },
      { value: "R", label: "R = Para ejecutar una rutina" },
      { value: "P", label: "P = Toma el puntaje de una variable" },
    ],
  },
  {
    name: "tipoVariable2",
    label: "Tipo de variable: ",
    type: "select",
    placeholder: "Selecciona una opción",
    options: [
      { value: "N", label: "Numérica" },
      { value: "C", label: "Calculada" },
      { value: "A", label: "Alfanumérica" },
      { value: "P", label: "Constante de iniciación" },
      { value: "co", label: "Constante definida" },
      { value: "V", label: "V = Contenido de la variable enunciada, siempre y cuando en TIPO DE FACTOR se halla digitado (S, G, D)" },
    ],
  },
  { name: "contenidoVariable", label: "Contenido de la variable: ", type: "number" },
  {
    name: "claseOperacion",
    label: "Clase de operación: ",
    type: "select",
    placeholder: "Selecciona una opción",
    options: [
      { value: "S", label: "Suma" },
      { value: "R", label: "Resta" },
      { value: "M", label: "Multiplicación" },
      { value: "L", label: "Logaritmo natural deun número" },
      { value: "E", label: "Exponenciación" },
      { value: "X", label: "Número E Elevado a un Número" },
      { value: "Y", label: "Raíz Enésima" },
      { value: "P", label: "Se Utiliza para indicar un parámetro a pasar a una rutina si en tipo FAC se indicó R" },
    ],
  },
  {
    name: "tipoFactor",
    label: "Tipo de factor: ",
    type: "select",
    placeholder: "Selecciona una opción",
    options: [
      { value: "V", label: "Toma el contenido de una variable" },
      { value: "E", label: "Toma la magnitud efectiva de una tasa" },
      { value: "T", label: "Toma la magnitud nominal de una tasa" },
      { value: "S", label: "Toma la suma de los contenidos o puntajes de las solicitudes los codeudores" },
      { value: "F", label: "Toma la fecha del sistema de Iniciación de Clientes" },
      { value: "C", label: "Toma el valor de una constante" },
      { value: "M", label: "Valor máximo permitido para el Operador" },
      { value: "D", label: "Contenido de la variable de la solicitud del Deudor principal" },
      { value: "G", label: "Puntaje de la variable de la solicitud del Deudor principal" },
      { value: "A", label: "Magnitud nominal de la primera tasa definida en el plan de interés indicado en el campo ELTVXX" },
      { value: "B", label: "Magnitud efectiva de la primera tasa definida en el plan de interés indicado en el campo ELTVXX" },
      { value: "R", label: "Para ejecutar una rutina" },
      { value: "P", label: "Toma el puntaje de una variable" },
    ],
  },
  {
    name: "tipoVariable",
    label: "Tipo de variable: ",
    type: "select",
    placeholder: "Selecciona una opción",
    options: [
      { value: "N", label: "Numérica" },
      { value: "C", label: "Calculada" },
      { value: "A", label: "Alfanumérica" },
      { value: "P", label: "Constante de Iniciación" },
      { value: "co", label: "Constante definida" },
      { value: "V", label: "Contenido de la variable enunciada, siempre y cuando en TIPO DE FACTOR se halla digitado (S, G, D)." },
    ],
  },
  { name: "contenidoVariable2", label: "Contenido de la variable: ", type: "number" },
  {
    name: "claseOperacion2",
    label: "Clase de operación: ",
    type: "select",
    placeholder: "Selecciona una opción",
    options: [
      { value: "S", label: "Suma" },
      { value: "R", label: "Resta" },
      { value: "M", label: "Multiplicación" },
      { value: "L", label: "Logaritmo natural deun número" },
      { value: "E", label: "Exponenciación" },
      { value: "X", label: "Número E Elevado a un Número" },
      { value: "Y", label: "Raíz Enésima" },
      { value: "P", label: "Se Utiliza para indicar un parámetro a pasar a una rutina si en tipo FAC se indicó R" },
    ],
  },
];
