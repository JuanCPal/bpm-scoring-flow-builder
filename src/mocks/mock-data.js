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
  { name: "perfil", label: "perfil: ", type: "text" },
  { name: "peso", label: "Peso: ", type: "text" },
  { name: "lineaProcesoBifurcacion", label: "Linea y proceso de Bifurcación: ", type: "text" },
  { name: "fuenteDatos", label: "Fuente de datos: ", type: "text" },
  { name: "grupoDocumentos", label: "Grupo de documentos: ", type: "text" },
  { name: "nombreReporte", label: "Nombre del reporte: ", type: "text" },                                      

];

export const variableEvalAlfanumericaFields = [
  { name: "ReglaEvaluadora", label: "Número de regla", type: "text" },
  { name: "label1", label: "descripcion :", type: "text" },
];

export const variableReglaCalculoFields = [
  { name: "ReglaCalculo", label: "Número de regla:", type: "text" },
  { name: "extra1", label: "Campo adicional 1", type: "text" },
  { name: "extra2", label: "Campo adicional 2", type: "text" },
];
