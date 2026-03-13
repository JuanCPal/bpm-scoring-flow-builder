"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, {
    addEdge,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    MarkerType

} from "reactflow";
import "reactflow/dist/style.css";
import { FaCog, FaPuzzlePiece, FaArrowRight, FaEdit, FaRandom, FaPlay, FaStop, FaTimes, FaCircle, FaPlusCircle, FaSearch, FaArrowLeft } from "react-icons/fa";
import { ProcessNode } from "@/components/ProcessNode";
import { VariableNode } from "@/components/VariableNode";
import { DecisionNode } from "@/components/DecisionNode";
import { StartNode } from "@/components/StartNode";
import { FinNode } from "@/components/FinNode";
import { orNode, xorNode, andNode } from "@/components/GatewaysNodes";
import PanelJson from "./CompJson";
import ContextMenuOptions from "./RenameNodo";
import RenameModal from "./RenameNodo";
import ToolBar from "./ToolBar";
import EditorPage from "@/app/editor/[id]/page";
import { MdDiamond } from "react-icons/md";
import ModalForm from "./ModalForm";
import SidebarNodeMenu from "./Sidebar";
import ModalDetalles, { ModalProceso, ModalVariable } from "./ModalDetalles";
import { ContextMenu } from "./MenuContextual";
import { BaseModal } from "./BaseModal";
import { title } from "process";
import { ProcesoSimpleNode } from "./ProcesoSimpleNode";
import StatusBar from "./StatusBar";


/* ----------------------------
   Helpers robustos (evitan crash)
   ---------------------------- */

// Devuelve la posición absoluta segura del nodo (usa positionAbsolute si existe)
const getAbsPosition = (n) => {
    if (!n) return { x: 0, y: 0 };
    if (n.positionAbsolute && typeof n.positionAbsolute.x === "number") {
        return { x: n.positionAbsolute.x, y: n.positionAbsolute.y };
    }
    if (n.position && typeof n.position.x === "number") {
        return { x: n.position.x, y: n.position.y };
    }
    // fallback seguro
    return { x: 0, y: 0 };
};

// Devuelve anchura/alto seguros (convierte strings a number si hace falta)
const getSize = (n) => {
    if (!n) return { w: 160, h: 60 };
    const wRaw = n.width ?? n.data?.width ?? (n.type === "Proceso" ? 320 : 220);
    const hRaw = n.height ?? n.data?.height ?? (n.type === "Proceso" ? 60 : 220);
    const w = typeof wRaw === "number" ? wRaw : parseFloat(wRaw) || 160;
    const h = typeof hRaw === "number" ? hRaw : parseFloat(hRaw) || 60;
    return { w, h };
};

const rectsIntersect = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
const growRect = (r, by = 18) => ({ x: r.x - by, y: r.y - by, w: r.w + by * 2, h: r.h + by * 2 });

/* ----------------------------
   Nodo types
   ---------------------------- */
const nodeTypes = {
    Proceso: ProcessNode,
    Proceson: ProcesoSimpleNode,
    Decision: DecisionNode,
    Start: StartNode,
    Fin: FinNode,
    Or: orNode,
    Xor: xorNode,
    And: andNode,
};

/* ----------------------------
   Componente principal
   ---------------------------- */

export default function FlowWithContainers({ savedNodes, savedEdges, savedId }) {

    const [nodes, setNodes, onNodesChange] = useNodesState(savedNodes || []);
    const [edges, setEdges, onEdgesChange] = useEdgesState(savedEdges || []);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [contextMenu, setContextMenu] = useState(null);
    const [renameModal, setRenameModal] = useState('');
    const [selectedNode, setSelectedNode] = useState(null);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [editar, setEditar] = useState(false);
    const [arbol, setChangeEdit] = useState('DiagramaSinNombre' || savedId);
    console.log("IdNombre en canvas", savedId)
    const [selectedProceso, setSelectedProceso] = useState(false);
    const [selectedProceson, setSelectedProceson] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const [openVariables, setOpenVariables] = useState(false);
    // Flujo interno del nodo (canvas secundario)
    const [internalFlow, setInternalFlow] = useState({ nodes: [], edges: [] });
    // Para identificar en qué nodo estoy
    const [currentNodeId, setCurrentNodeId] = useState(null);

    // Para manejar el flujo interno del modal
    const [internalNodes, setInternalNodes] = useState([]);
    const [internalEdges, setInternalEdges] = useState([]);
    const [openBaseModal, setOpenBaseModal] = useState(false);

    const nameCounter = useRef(1);
    const [formVar, setFormVar] = useState({
        orden: '',
        variable: '',
        descripcionVar: '',
        ReglaEvaluadora: '',
        ReglaCalculo: '',
        varRel: '',
        tipo: '',
        naturaleza: '',
        tamano: '',
        causal: '',
        limInf: '',
        limSup: '',
        puntaje: '',
    })
    const [formPro, setFormPro] = useState({
        orden: 1,
        nombre: '',
        descripcion: '',
        SiguientePaso: '',
        ProcesoNegado: '',
        CTLTiempos: '',
        CodigoGrupoProceso: '',
        ProductoNegado: '',
        EstadoAprobacion: '',
        IndicadorNuevaSolicitud: ''
    })
    const [isDark, setIsDark] = useState(false);
    useEffect(() => {
        // Detecta el modo dark del sistema
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDark(mediaQuery.matches);

        // Escucha cambios en tiempo real
        const handler = (e) => setIsDark(e.matches);
        mediaQuery.addEventListener("change", handler);

        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    useEffect(() => {
        if (savedId) setChangeEdit(savedId)
    }, [savedId, setChangeEdit])

    //mostrar details
    // clic en un nodo
    const onNodeClick = useCallback((_, node) => {
        console.log('onNodeClick ->', node);
        setSelectedNode(node);
    }, []);

    // también cubre selección con marquee / shift
    const onSelectionChange = useCallback(({ nodes }) => {
        console.log('onSelectionChange ->', nodes);
        setSelectedNode(nodes[0] || null);
    }, []);

    // id helper
    const idRef = useRef(1);
    const genId = useCallback((prefix = "N") => `${prefix}${idRef.current++}`, []);

    // Containers current snapshot
    const containers = useMemo(() => nodes.filter((n) => n.type === "Proceso"), [nodes]);

    const resetDropHighlights = useCallback(() => {
        setNodes((nds) =>
            nds.map((n) => (n.type === "Proceso" && n.data?.isDroppable ? { ...n, data: { ...n.data, isDroppable: false } } : n))
        );
    }, [setNodes]);

    // Buscar primer contenedor dropeable por intersección (usando bounding boxes)
    const findDroppableContainer = useCallback(
        (dragNode) => {
            if (!dragNode) return null;
            if (dragNode.type !== "Variable") return null; // solo variables como hijos

            const dragPos = getAbsPosition(dragNode);
            const dragSize = getSize(dragNode);
            const dragRect = { x: dragPos.x, y: dragPos.y, w: dragSize.w, h: dragSize.h };

            for (const c of containers) {
                const cPos = getAbsPosition(c);
                const cSize = getSize(c);
                const cRect = { x: cPos.x, y: cPos.y, w: cSize.w, h: cSize.h };
                const expanded = growRect(cRect, 18);
                if (rectsIntersect(dragRect, expanded)) return c;
            }
            return null;
        },
        [containers]
    );

    /* ----------------------------
       Handlers de drag (usar node que React Flow pasa)
       ---------------------------- */

    const onNodeDragStart = useCallback((event, node) => {
        // node es el objeto más actual en tiempo de arrastre
        // no hacemos nada especial aquí salvo poder marcar id si se quiere
    }, []);

    const onNodeDrag = useCallback(
        (event, node) => {
            // Usa el `node` que viene del callback (evita leer nodes.find(...).position)
            if (!node) return;
            // Solo actualizamos highlights si estamos moviendo una variable (hijo)
            if (node.type !== "Variable") return;

            const droppable = findDroppableContainer(node);

            setNodes((nds) =>
                nds.map((n) =>
                    n.type === "Proceso" ? { ...n, data: { ...n.data, isDroppable: !!(droppable && n.id === droppable.id) } } : n
                )
            );
        },
        [findDroppableContainer, setNodes]
    );

    const onNodeDragStop = useCallback(
        (event, node) => {
            if (!node) return;

            // Obtenemos la info del estado previo (para limpiar children si corresponde)
            const currentParentId = node.parentNode; // si venía dentro de un contenedor
            const targetContainer = findDroppableContainer(node);

            if (node.type === "Variable") {
                const dragAbs = getAbsPosition(node);

                if (targetContainer) {
                    // Meter dentro del contenedor: convertimos a posición relativa
                    const contAbs = getAbsPosition(targetContainer);
                    const rel = { x: dragAbs.x - contAbs.x, y: dragAbs.y - contAbs.y };

                    setNodes((nds) =>
                        nds.map((n) => {
                            // Si es el hijo movido, le asignamos parentNode y extent
                            if (n.id === node.id) {
                                return { ...n, parentNode: targetContainer.id, extent: "parent", position: rel };
                            }
                            // Si es el contenedor objetivo, añadimos hijo al array children (sin duplicados)
                            if (n.id === targetContainer.id) {
                                const children = Array.from(new Set([...(n.data?.children ?? []), node.id]));
                                return { ...n, data: { ...n.data, children, isDroppable: false } };
                            }
                            // limpiamos isDroppable de otros contenedores
                            if (n.type === "Proceso") {
                                return { ...n, data: { ...n.data, isDroppable: false } };
                            }
                            return n;
                        })
                    );
                } else if (currentParentId) {
                    // Si tenía padre y ahora salió fuera, sacarlo del padre y usar coordenadas absolutas
                    const newAbs = dragAbs;
                    setNodes((nds) =>
                        nds.map((n) => {
                            if (n.id === node.id) {
                                return { ...n, parentNode: undefined, extent: undefined, position: { x: newAbs.x, y: newAbs.y } };
                            }
                            if (n.id === currentParentId) {
                                const children = (n.data?.children ?? []).filter((cid) => cid !== node.id);
                                return { ...n, data: { ...n.data, children } };
                            }
                            if (n.type === "Proceso") {
                                return { ...n, data: { ...n.data, isDroppable: false } };
                            }
                            return n;
                        })
                    );
                }
            }

            // limpiar highlights por si acaso
            resetDropHighlights();
        },
        [findDroppableContainer, resetDropHighlights]
    );

    /* ----------------------------
       Creación de nodos (sidebar y contextual)
       ---------------------------- */
    const offsetX = 220
    const randomY = Math.random() * 80 - 40


    const addProceso = useCallback(() => {
        const id = genId("pp");
        setNodes((nds) => [
            ...nds,
            {
                id,
                type: "Proceso",
                position: { x: 160 + Math.random() * 520, y: 80 + Math.random() * 60 },
                data: { label: `Proceso ${id}`, children: [], nombre: '', parametros: { orden: '', proceso: '', descripcion: '', SiguientePaso: '', ProcesoNegado: '', CTLTiempos: '', CodigoGrupoProceso: '', ProductoNegado: '', EstadoAprobacion: '', IndicadorNuevaSolicitud: '' }, width: 320, height: 220 },
            },
        ]);
    }, [genId, setNodes]);

    const addProceson = useCallback(() => {
        const id = genId("P");
        setNodes((nds) => [...nds, { id, type: "Proceson", position: {x: 240 + offsetX,
  y: 360 + randomY}, data: { label: `Proceso ${id}`, nombre: '', parametros: { orden: '', variable: '', reglaEvaluadora: '', reglaDeCalculo: '', descripcionVar: '', varRel: '', tipo: '', naturaleza: '', tam: '', caus: '', NRE: '', limInferior: '', limSuperior: '', descripcion: '', puntaje: '', p_bif: '', reporte: '', RC: '', desPagDinamic: '', observaciones: '' } } }]);
    }, [genId, setNodes]);

    const addStart = useCallback(() => {
        const id = genId("S");
        setNodes((nds) => [...nds, { id, type: "Start", position: {x: 240 + offsetX,
  y: 360 + randomY}, data: { label: `Inicio ${id}` } }]);
    }, [genId, setNodes]);

    const addFin = useCallback(() => {
        const id = genId("F");
        setNodes((nds) => [...nds, { id, type: "Fin", position: { x: 200, y: 350 }, data: { label: `Fin ${id}` } }]);
    }, [genId, setNodes]);

    const addOr = useCallback(() => {
        const id = genId("O");
        setNodes((nds) => [...nds, { id, type: "Or", position: { x: 340, y: 260 }, data: { label: `OR ${id}` } }]);
    }, [genId, setNodes]);

    const addXor = useCallback(() => {
        const id = genId("X");
        setNodes((nds) => [...nds, { id, type: "Xor", position: { x: 240, y: 360 }, data: { label: `XOR ${id}` } }]);
    }, [genId, setNodes]);

    const addAnd = useCallback(() => {
        const id = genId("A");
        setNodes((nds) => [...nds, { id, type: "And", position: { x: 240, y: 360 }, data: { label: `AND ${id}` } }]);
    }, [genId, setNodes]);

    const addVariableInside = useCallback(
        (procesoId) => {
            const id = genId("V");
            const parent = nodes.find((n) => n.id === procesoId);
            if (!parent) return;
            setNodes((nds) => [
                ...nds,
                {
                    id,
                    type: "Variable",
                    parentNode: procesoId,
                    extent: "parent",
                    position: { x: 24, y: 40 + Math.random() * 80 }, // relativo
                    data: { label: `Proceso ${id}`, nombre: '', parametros: { orden: '', variable: '', reglaEvaluadora: '', reglaDeCalculo: '', varRel: '', descripcionVar: '', tipo: '', naturaleza: '', tam: '', caus: '', NRE: '', limInferior: '', limSuperior: '', descripcion: '', puntaje: '', p_bif: '', reporte: '', RC: '', desPagDinamic: '', observaciones: '' } },
                },
            ]);
            setContextMenu(null);
        },
        [genId, nodes, setNodes]
    );

    /* ----------------------------
       Context menu + rename
       ---------------------------- */
    const onNodeContextMenu = useCallback((e, node) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY, nodeId: node.id, nodeType: node.type });
    }, []);

    const onPaneClick = useCallback(() => setContextMenu(null), []);

    const handleRename = useCallback(() => {
        if (!contextMenu) return;
        const target = nodes.find((n) => n.id === contextMenu.nodeId);
        setRenameModal({ nodeId: target.id, value: target?.data?.nombre || " " });
        setContextMenu(null);
    }, [contextMenu, nodes]);

    const confirmRename = useCallback(() => {
        if (!renameModal) return;
        setNodes((nds) => nds.map((n) => (n.id === renameModal.nodeId ? { ...n, data: { ...n.data, label: renameModal.value } } : n)));
        setRenameModal(null);
    }, [renameModal, setNodes]);

    /* ----------------------------
       Conectar edges
       ---------------------------- */
    const onConnect = useCallback(
        (connection) => {
            const sourceNode = nodes.find((n) => n.id === connection.source);
            const isXor = sourceNode?.type === "Xor";
            const isOr = sourceNode?.type === "Or";
            const isAnd = sourceNode?.type === "And";

            //Reglas de los source
            const xorLabels = {
                "s-t": "67",
                "s-r": "Si",
                "s-b": "No",
                "s-l": "No",
            };

            const orLabels = {
                "s-t": "opcion 1",
                "s-r": "Opción 2",
                "s-b": "Opción 3",
                "s-l": "Opción 4",
            };

            const andLabels = {
                "s-t": { formVar },
                "s-r": "Si",
                "s-b": "No",
                "s-l": "No",
            };

            const edgeOptions = {
                type: "default",
                animated: true,
                style: { stroke: "#0060fa", strokeWidth: 2, strokeDasharray: "5 5" },
                markerEnd: { type: MarkerType.ArrowClosed, color: "#0060fa" },
            };

            const sourceHandle = connection.sourceHandle;

            let labelFromHandle;

            if (isXor) {
                labelFromHandle = xorLabels[sourceHandle];
            } else if (isOr) {
                labelFromHandle = orLabels[sourceHandle];
            } else {
                labelFromHandle = undefined;
            }

            if (labelFromHandle) {
                edgeOptions.label = labelFromHandle;
                edgeOptions.labelBgStyle = { fill: "#fff", fillOpacity: 0.8 };
                edgeOptions.labelStyle = { fill: "#000", fontWeight: 500, fontSize: 18 };
            }

            setEdges((eds) => addEdge({ ...connection, ...edgeOptions }, eds));
        },
        [nodes]
    );

    /* ----------------------
        Guardar flujo
    -----------------------------*/

    const getName = () => (nameCounter.current++).toString();

    const saveToLocalStorage = () => {
        const name = getName(); // si no usas esto, puedes quitarlo
        const data = {
            id: `Linea_${arbol}`,
            nodes,
            edges,
            savedAt: new Date().toISOString(),
        };

        // Guardar en localStorage (opcional)
        localStorage.setItem(data.id, JSON.stringify(data));

        alert(`Árbol ${data.id} guardado`);

    };

    const saveNodeFlowToLocalStorage = (contextMenu, nodes, edges) => {
        const data = {
            id: `Proceso_${contextMenu?.nodeId}`,
            nodes,
            edges,
            savedAt: new Date().toISOString(),
        };
        localStorage.setItem(data.id, JSON.stringify(data));
        alert(`El flujo del ${data.id} ha sido guardado correctamente`);
    };

    //Cargar flujo

    const loadNodeFlow = (nodeId) => {
        const saved = JSON.parse(localStorage.getItem(`Proceso_${arbol}`));
        return saved || { nodes: [], edges: [] };
    };

    const handleSaveNodeFlow = () => {
        saveNodeFlowToLocalStorage(currentNodeId, internalNodes, internalEdges);
        setOpenVariables(false);
    };

    //Descargar flujo

    const DownloadFile = () => {
        const data = {
            id: `Linea_${arbol}`,
            nodes,
            edges,
            savedAt: new Date().toISOString(),
        };
        // Descargar como archivo JSON
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${data.id}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        console.log("descargado")

    }

    /* llenar nodos con info del formulario */

    const handleEditProceso = () => {
        setNodes((prev) =>
            prev.map((node) =>
                node.id === selectedNode.id
                    ? {
                        ...node, data: {
                            ...node.data, nombre: formPro.nombre,
                            parametros: {
                                orden: formPro.orden,
                                proceso: formPro.nombre,
                                descripcion: formPro.descripcion,
                                SiguientePaso: formPro.SiguientePaso,
                                ProcesoNegado: formPro.ProcesoNegado,
                                CTLTiempos: formPro.CTLTiempos,
                                CodigoGrupoProceso: formPro.CodigoGrupoProceso,
                                ProductoNegado: formPro.ProductoNegado,
                                EstadoAprobacion: formPro.EstadoAprobacion,
                                IndicadorNuevaSolicitud: formPro.IndicadorNuevaSolicitud

                            }
                        }
                    }
                    : node
            )
        );
        setFormPro('')
        setIsOpenEdit(false)
    };

    const handleEditVariable = () => {
        setNodes((prev) =>
            prev.map((node) =>
                node.id === selectedNode.id
                    ? {
                        ...node, data: {
                            ...node.data, nombre: formVar.variable, parametros: { orden: formVar.orden, variable: formVar.variable, reglaEvaluadora: formVar.ReglaEvaluadora, reglaDeCalculo: formVar.ReglaCalculo, varRel: formVar.varRel, descripcionVar: formVar.descripcionVar, tipo: formVar.tipo, naturaleza: formVar.naturaleza, tam: formVar.tamano, caus: formVar.causal, NRE: '', limInferior: formVar.limInf, limSuperior: formVar.limSup, descripcion: '', puntaje: formVar.puntaje, p_bif: '', reporte: '', RC: '', desPagDinamic: '', observaciones: '' }
                        }
                    }
                    : node
            )
        );
        setFormVar('')
        setIsOpenEdit(false)
    };

    const handleGroupRename = () => {
        (e) => e.stopPropagation();
        handleRename();
    }

    const handleImportFlow = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                setNodes(data.nodes || []);
                setEdges(data.edges || []);

            } catch (err) {
                alert('Error al cargar archivo');
            }
        };

        reader.readAsText(file);
    }

    const deleteNode = useCallback((nodeId) => {
        setNodes((nds) => nds.filter((n) => n.id !== nodeId));
        setEdges((eds) =>
            eds.filter((e) => e.source !== nodeId && e.target !== nodeId)
        );
    }, [setNodes, setEdges]);

    /* ----------------------------
       Render
       ---------------------------- */

    //DARK MODE

    //const { resolvedTheme } = useTheme();
    //const [mounted, setMounted] = useState(false);
    const duplicateNode = useCallback((nodeId) => {
    const original = nodes.find((n) => n.id === nodeId);
    if (!original) return;

    const newId = crypto.randomUUID();

    // posición inteligente
    const offsetX = 220;
    const randomY = Math.random() * 80 - 40;

    const newNode = {
        ...original,
        id: newId,
        position: {
            x: original.position.x + offsetX,
            y: original.position.y + randomY
        },
        data: {
            ...original.data,
            label: original.data.label + " copia"
        },
        selected: false
    };

    setNodes((nds) => [...nds, newNode]);

    // seleccionar automáticamente
    setSelectedNode(newNode);

}, [nodes, setNodes]);

const handleDuplicate = useCallback(() => {
    if (!contextMenu) return;

    duplicateNode(contextMenu.nodeId);

    setContextMenu(null);
}, [contextMenu, duplicateNode]);


    //#d7e5fc -lines
    //#020f24 -bg
    return (
        <div style={{ width: "100%", height: "100vh", position: "relative" }} className="font-sans bg-[#f0f5fc] dark:bg-slate-900">
            {/* Sidebar */}
            <SidebarNodeMenu
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                addProceso={addProceso}
                addProceson={addProceson}
                addStart={addStart}
                addFin={addFin}
                addXor={addXor}
                addOr={addOr}
                addAnd={addAnd}
            />

            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeDragStart={onNodeDragStart}
                onNodeDrag={onNodeDrag}
                onNodeDragStop={onNodeDragStop}
                onNodeContextMenu={onNodeContextMenu}
                onPaneClick={onPaneClick}
                onNodeClick={onNodeClick}
                onSelectionChange={onSelectionChange}
                snapToGrid={true}
                snapGrid={[5, 5]}
                minZoom={0.01}
                deleteKeyCode={null}
                fitView>

                <MiniMap className="dark:hidden" />
                <Controls className="dark:hidden" color="#162456" />
                <Background gap={35} variant="grid" color={isDark ? "#182130" : "#d7e5fc"} size={7} />

                {/* Panel JSON con Details*/}
                <PanelJson nodes={nodes} edges={edges} arbol={arbol} selectedNode={selectedNode} />

            </ReactFlow>

            <ToolBar
                saveToLocalStorage={saveToLocalStorage}
                handleImportFlow={handleImportFlow}
                editar={editar}
                arbol={arbol}
                setEditar={setEditar}
                setChangeEdit={setChangeEdit}
                DownloadFile={DownloadFile}
            />

            {/* Contextual menu */}
            {contextMenu && (
                <ContextMenu
                    contextMenu={contextMenu}
                    nodes={nodes}
                    setSelectedNode={setSelectedNode}
                    setFormPro={setFormPro}
                    setFormVar={setFormVar}
                    setIsOpenEdit={setIsOpenEdit}
                    setSelectedProceso={setSelectedProceso}
                    setOpenVariables={setOpenVariables}
                    setInternalFlow={setInternalFlow}
                    setContextMenu={setContextMenu}
                    handleGroupRename={handleGroupRename}
                    addVariableInside={addVariableInside}
                    loadNodeFlow={loadNodeFlow}
                    openBaseModal={openBaseModal}
                    setOpenBaseModal={setOpenBaseModal}
                    deleteNode={deleteNode}
                    handleDuplicate={handleDuplicate}
                />
            )}
            {/*Fin menu contextual */}

            {/* VER DETALLES ↓ */}
            {selectedProceso && (
                <ModalProceso
                    selectedNode={selectedNode}
                    setSelectedProceso={setSelectedProceso}
                    setSelectedVariable={setSelectedProceson}
                    handleEditVariable={handleEditVariable}
                    handleEditProceso={handleEditProceso}
                    arbol={arbol}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    nodes={nodes}
                />
            )}

            {selectedProceson && (
                <ModalVariable
                    selectedNode={selectedNode}
                    VariableNode={VariableNode}
                    setSelectedVariable={setSelectedProceson}
                    setSelectedProceso={setSelectedProceso}
                    arbol={arbol}
                />
            )}
            {/* FIN VER DETALLES ↑ */}

            {/* MODAL basico ↓ */}
            {openBaseModal && (
                <BaseModal
                    selectedNode={selectedNode}
                    setOpenBaseModal={setOpenBaseModal}
                    arbol={arbol}
                />
            )}
            {/* FIN MODAL basio ↑ */}



            <RenameModal
                modal={renameModal}
                onClose={() => setRenameModal(null)}
                onChange={(value) => setRenameModal({ ...renameModal, value })}
                onConfirm={confirmRename}
            />

            <ModalForm
                selectedNode={selectedNode}
                isOpenEdit={isOpenEdit}
                setIsOpenEdit={setIsOpenEdit}
                handleEditProceso={handleEditProceso}
                handleEditVariable={handleEditVariable}
                formVar={formVar}
                formPro={formPro}
                setFormPro={setFormPro}
                setFormVar={setFormVar}
            />

            <StatusBar
                selectedNode={selectedNode}
                nodes={nodes}
            />

        </div>
    );
}