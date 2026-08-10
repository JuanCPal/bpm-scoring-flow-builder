const PROCESO_FORM_DEFAULTS = {
  orden: 1,
  nombre: "",
  proceso: "",
  descripcion: "",
  SiguientePaso: "",
  ProcesoNegado: "",
  CTLTiempos: "",
  CodigoGrupoProceso: "",
  ProductoNegado: "",
  EstadoAprobacion: "",
  IndicadorNuevaSolicitud: "",
  PaginaCaptura: "",
  TiempoMaxProceso: "",
  NepLlamado: "",
  ProgramaLlamar: "",
  SecuenciaLlamado: "",
  TipoLlamado: "",
  DiaMaxTransferir: "",
  LineaPasarSolicitud: "",
  ProcesoPasar: "",
  iconoGrafico: "",
  HoraInicial: "",
  HoraInicialUno: "",
  AntiguedadDias: "",
  UsoValorSolicitado: "",
  usoValorAprobado: "",
  OrganizaFechaHora: "",
  PesoAntiguedadDias: "",
  PesoValorSolicitado: "",
  PesoValorAprobado: "",
  pesoVariablesPendientes: "",
  VarDesplegar01: "",
  tipoVariable01: "",
  mascaraCampo01: "",
};

const VARIABLE_FORM_DEFAULTS = {
  orden: "",
  variable: "",
  descripcionVar: "",
  ReglaEvaluadora: "",
  ReglaCalculo: "",
  varRel: "",
  tipo: "",
  naturaleza: "",
  tamano: "",
  causal: "",
  limInf: "",
  limSup: "",
  puntaje: "",
};

const DEFAULT_VARIABLE_PARAMS = {
  orden: "",
  variable: "",
  reglaEvaluadora: "",
  reglaDeCalculo: "",
  varRel: "",
  descripcionVar: "",
  tipo: "",
  naturaleza: "",
  tam: "",
  caus: "",
  NRE: "",
  limInferior: "",
  limSuperior: "",
  descripcion: "",
  puntaje: "",
  p_bif: "",
  reporte: "",
  RC: "",
  desPagDinamic: "",
  observaciones: "",
};

const DEFAULT_PROCESO_PARAMS = {
  orden: "",
  proceso: "",
  descripcion: "",
  SiguientePaso: "",
  ProcesoNegado: "",
  CTLTiempos: "",
  CodigoGrupoProceso: "",
  ProductoNegado: "",
  EstadoAprobacion: "",
  IndicadorNuevaSolicitud: "",
  PaginaCaptura: "",
  TiempoMaxProceso: "",
  NepLlamado: "",
  ProgramaLlamar: "",
  SecuenciaLlamado: "",
  TipoLlamado: "",
  DiaMaxTransferir: "",
  LineaPasarSolicitud: "",
  ProcesoPasar: "",
  iconoGrafico: "",
  HoraInicial: "",
  HoraInicialUno: "",
  AntiguedadDias: "",
  UsoValorSolicitado: "",
  usoValorAprobado: "",
  OrganizaFechaHora: "",
  PesoAntiguedadDias: "",
  PesoValorSolicitado: "",
  PesoValorAprobado: "",
  pesoVariablesPendientes: "",
  VarDesplegar01: "",
  tipoVariable01: "",
  mascaraCampo01: "",
};

function resolveProcesoName(form) {
  const proceso = typeof form?.proceso === "string" ? form.proceso.trim() : "";
  const nombre = typeof form?.nombre === "string" ? form.nombre.trim() : "";
  return proceso || nombre || "";
}

function normalizeNodeType(type) {
  return String(type || "").toLowerCase();
}

function readProcesoParam(parametros, key) {
  return parametros?.[key] ?? "";
}

function readVariableParam(parametros, key) {
  return parametros?.[key] ?? "";
}

export function getEmptyProcesoForm() {
  return { ...PROCESO_FORM_DEFAULTS };
}

export function getEmptyVariableForm() {
  return { ...VARIABLE_FORM_DEFAULTS };
}

export function createProcesoNodeParamsDefaults() {
  return { ...DEFAULT_PROCESO_PARAMS };
}

export function createVariableNodeParamsDefaults() {
  return { ...DEFAULT_VARIABLE_PARAMS };
}

export function createProcesoNodeDataPatch(form) {
  const proceso = resolveProcesoName(form);

  return {
    nombre: proceso,
    label: proceso,
    parametros: {
      ...DEFAULT_PROCESO_PARAMS,
      orden: form?.orden ?? "",
      proceso,
      descripcion: form?.descripcion ?? "",
      SiguientePaso: form?.SiguientePaso ?? "",
      ProcesoNegado: form?.ProcesoNegado ?? "",
      CTLTiempos: form?.CTLTiempos ?? "",
      CodigoGrupoProceso: form?.CodigoGrupoProceso ?? "",
      ProductoNegado: form?.ProductoNegado ?? "",
      EstadoAprobacion: form?.EstadoAprobacion ?? "",
      IndicadorNuevaSolicitud: form?.IndicadorNuevaSolicitud ?? "",
      PaginaCaptura: form?.PaginaCaptura ?? "",
      TiempoMaxProceso: form?.TiempoMaxProceso ?? "",
      NepLlamado: form?.NepLlamado ?? "",
      ProgramaLlamar: form?.ProgramaLlamar ?? "",
      SecuenciaLlamado: form?.SecuenciaLlamado ?? "",
      TipoLlamado: form?.TipoLlamado ?? "",
      DiaMaxTransferir: form?.DiaMaxTransferir ?? "",
      LineaPasarSolicitud: form?.LineaPasarSolicitud ?? "",
      ProcesoPasar: form?.ProcesoPasar ?? "",
      iconoGrafico: form?.iconoGrafico ?? "",
      HoraInicial: form?.HoraInicial ?? "",
      HoraInicialUno: form?.HoraInicialUno ?? "",
      AntiguedadDias: form?.AntiguedadDias ?? "",
      UsoValorSolicitado: form?.UsoValorSolicitado ?? "",
      usoValorAprobado: form?.usoValorAprobado ?? "",
      OrganizaFechaHora: form?.OrganizaFechaHora ?? "",
      PesoAntiguedadDias: form?.PesoAntiguedadDias ?? "",
      PesoValorSolicitado: form?.PesoValorSolicitado ?? "",
      PesoValorAprobado: form?.PesoValorAprobado ?? "",
      pesoVariablesPendientes: form?.pesoVariablesPendientes ?? "",
      VarDesplegar01: form?.VarDesplegar01 ?? "",
      tipoVariable01: form?.tipoVariable01 ?? "",
      mascaraCampo01: form?.mascaraCampo01 ?? "",
    },
  };
}

export function createVariableNodeDataPatch(form) {
  const variable = form?.variable ?? "";

  return {
    nombre: variable,
    parametros: {
      ...DEFAULT_VARIABLE_PARAMS,
      orden: form?.orden ?? "",
      variable,
      reglaEvaluadora: form?.ReglaEvaluadora ?? form?.reglaEvaluadora ?? "",
      reglaDeCalculo: form?.ReglaCalculo ?? form?.reglaDeCalculo ?? "",
      varRel: form?.varRel ?? "",
      descripcionVar: form?.descripcionVar ?? "",
      tipo: form?.tipo ?? "",
      naturaleza: form?.naturaleza ?? "",
      tam: form?.tamano ?? form?.tam ?? "",
      caus: form?.causal ?? form?.caus ?? "",
      limInferior: form?.limInf ?? form?.limInferior ?? "",
      limSuperior: form?.limSup ?? form?.limSuperior ?? "",
      puntaje: form?.puntaje ?? "",
    },
  };
}

export function createProcesoFormFromNode(node) {
  const parametros = node?.data?.parametros || {};
  const proceso =
    node?.data?.nombre ||
    readProcesoParam(parametros, "proceso") ||
    node?.data?.label ||
    "";

  return {
    ...getEmptyProcesoForm(),
    orden: readProcesoParam(parametros, "orden") || 1,
    nombre: proceso,
    proceso,
    descripcion: readProcesoParam(parametros, "descripcion"),
    SiguientePaso:
      readProcesoParam(parametros, "SiguientePaso") ||
      readProcesoParam(parametros, "SiguienteProeso"),
    ProcesoNegado: readProcesoParam(parametros, "ProcesoNegado"),
    CTLTiempos: readProcesoParam(parametros, "CTLTiempos"),
    CodigoGrupoProceso: readProcesoParam(parametros, "CodigoGrupoProceso"),
    ProductoNegado: readProcesoParam(parametros, "ProductoNegado"),
    EstadoAprobacion: readProcesoParam(parametros, "EstadoAprobacion"),
    IndicadorNuevaSolicitud: readProcesoParam(parametros, "IndicadorNuevaSolicitud"),
    PaginaCaptura: readProcesoParam(parametros, "PaginaCaptura"),
    TiempoMaxProceso: readProcesoParam(parametros, "TiempoMaxProceso"),
    NepLlamado: readProcesoParam(parametros, "NepLlamado"),
    ProgramaLlamar: readProcesoParam(parametros, "ProgramaLlamar"),
    SecuenciaLlamado: readProcesoParam(parametros, "SecuenciaLlamado"),
    TipoLlamado: readProcesoParam(parametros, "TipoLlamado"),
    DiaMaxTransferir: readProcesoParam(parametros, "DiaMaxTransferir"),
    LineaPasarSolicitud: readProcesoParam(parametros, "LineaPasarSolicitud"),
    ProcesoPasar: readProcesoParam(parametros, "ProcesoPasar"),
    iconoGrafico: readProcesoParam(parametros, "iconoGrafico"),
    HoraInicial: readProcesoParam(parametros, "HoraInicial"),
    HoraInicialUno: readProcesoParam(parametros, "HoraInicialUno"),
    AntiguedadDias: readProcesoParam(parametros, "AntiguedadDias"),
    UsoValorSolicitado: readProcesoParam(parametros, "UsoValorSolicitado"),
    usoValorAprobado: readProcesoParam(parametros, "usoValorAprobado"),
    OrganizaFechaHora: readProcesoParam(parametros, "OrganizaFechaHora"),
    PesoAntiguedadDias: readProcesoParam(parametros, "PesoAntiguedadDias"),
    PesoValorSolicitado: readProcesoParam(parametros, "PesoValorSolicitado"),
    PesoValorAprobado: readProcesoParam(parametros, "PesoValorAprobado"),
    pesoVariablesPendientes: readProcesoParam(parametros, "pesoVariablesPendientes"),
    VarDesplegar01: readProcesoParam(parametros, "VarDesplegar01"),
    tipoVariable01: readProcesoParam(parametros, "tipoVariable01"),
    mascaraCampo01: readProcesoParam(parametros, "mascaraCampo01"),
  };
}

export function createVariableFormFromNode(node) {
  const parametros = node?.data?.parametros || {};
  const variable =
    node?.data?.nombre ||
    readVariableParam(parametros, "variable") ||
    node?.data?.label ||
    "";

  return {
    ...getEmptyVariableForm(),
    orden: readVariableParam(parametros, "orden"),
    variable,
    descripcionVar: readVariableParam(parametros, "descripcionVar"),
    ReglaEvaluadora: readVariableParam(parametros, "reglaEvaluadora"),
    ReglaCalculo: readVariableParam(parametros, "reglaDeCalculo"),
    varRel: readVariableParam(parametros, "varRel"),
    tipo: readVariableParam(parametros, "tipo"),
    naturaleza: readVariableParam(parametros, "naturaleza"),
    tamano: readVariableParam(parametros, "tam"),
    causal: readVariableParam(parametros, "caus"),
    limInf: readVariableParam(parametros, "limInferior"),
    limSup: readVariableParam(parametros, "limSuperior"),
    puntaje: readVariableParam(parametros, "puntaje"),
  };
}

export function createFormStateFromNode(node) {
  const nodeType = normalizeNodeType(node?.type);

  if (nodeType === "proceso" || nodeType === "proceson") {
    return {
      formPro: createProcesoFormFromNode(node),
      formVar: getEmptyVariableForm(),
    };
  }

  if (nodeType === "variable") {
    return {
      formPro: getEmptyProcesoForm(),
      formVar: createVariableFormFromNode(node),
    };
  }

  return {
    formPro: getEmptyProcesoForm(),
    formVar: getEmptyVariableForm(),
  };
}