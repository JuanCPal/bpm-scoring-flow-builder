"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import ReactFlow, {
    addEdge,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    MarkerType,
    Position

} from "reactflow";
import "reactflow/dist/style.css";
import { FaCog, FaPuzzlePiece, FaArrowRight, FaEdit, FaRandom, FaPlay, FaStop, FaTimes, FaCircle, FaPlusCircle, FaSearch, FaArrowLeft } from "react-icons/fa";
import { ProcessNode } from "@/components/nodes/ProcessNode";
import { VariableNode } from "@/components/nodes/VariableNode";
import { DecisionNode } from "@/components/nodes/DecisionNode";
import { StartNode } from "@/components/nodes/StartNode";
import { FinNode } from "@/components/nodes/FinNode";
import { orNode, xorNode, andNode } from "@/components/nodes/GatewaysNodes";
import PanelJson from "@/components/layout/CompJson";
import ContextMenuOptions from "@/components/ui/modals/RenameNodo";
import RenameModal from "@/components/ui/modals/RenameNodo";
import ToolBar from "@/components/layout/ToolBar";
import EditorPage from "@/app/editor/[id]/page";
import { MdDiamond } from "react-icons/md";
import ModalForm from "@/components/ui/modals/ModalForm";
import SidebarNodeMenu from "@/components/layout/Sidebar";
import ModalDetalles, { ModalProceso, ModalVariable } from "@/components/ui/modals/ModalDetalles";
import { ContextMenu } from "@/components/layout/MenuContextual";
import { BaseModal } from "@/components/ui/modals/BaseModal";
import { title } from "process";
import { ProcesoSimpleNode } from "@/components/nodes/ProcesoSimpleNode";
import StatusBar from "@/components/layout/StatusBar";
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { saveProject, saveNodeFlow, loadNodeFlow as loadNodeFlowFromClient } from "@/lib/api-client";
import {
    createProcesoNodeDataPatch,
    createProcesoNodeParamsDefaults,
    createVariableNodeDataPatch,
    createVariableNodeParamsDefaults,
    getEmptyProcesoForm,
    getEmptyVariableForm,
} from "@/lib/node-form-mappers";

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
    const { resolvedTheme } = useTheme();
    const flowWrapperRef = useRef(null);
    const reactFlowRef = useRef(null);
    const spawnOffsetRef = useRef(0);

    const [nodes, setNodes, onNodesChange] = useNodesState(savedNodes || []);
    const [edges, setEdges, onEdgesChange] = useEdgesState(savedEdges || []);
    const [sidebarOpen, setSidebarOpen] = useState(true);
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
    const [formVar, setFormVar] = useState(getEmptyVariableForm)
    const [formPro, setFormPro] = useState(getEmptyProcesoForm)

    const isDark = resolvedTheme === "dark";
    const flowTheme = isDark
        ? {
            minimapBackground: "#152032",
            minimapMask: "rgba(13, 21, 35, 0.78)",
            minimapNode: "#8eaef0",
            minimapNodeStroke: "#dbe5fb",
            controlsBackground: "#152032",
            controlsBorder: "#2d3e54",
            controlsIcon: "#dbe5fb",
        }
        : {
            minimapBackground: "#ffffff",
            minimapMask: "rgba(232, 240, 255, 0.78)",
            minimapNode: "#406ff0",
            minimapNodeStroke: "#2747a3",
            controlsBackground: "#ffffff",
            controlsBorder: "#c7d4eb",
            controlsIcon: "#2747a3",
        };

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

    /* ------------------------------------------------
       Handlers de drag (usar node que React Flow pasa)
       -------------------------------------------- */

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

    /* ---------------------------------
       Creación de nodos
       ------------------------------- */

    const getSpawnPosition = useCallback((width = 180, height = 100) => {
        const wrapper = flowWrapperRef.current;
        const instance = reactFlowRef.current;
        const offsetIndex = spawnOffsetRef.current;
        const column = offsetIndex % 3;
        const row = Math.floor(offsetIndex / 3) % 3;
        const offset = {
            x: column * 40,
            y: row * 40,
        };

        spawnOffsetRef.current += 1;

        if (!wrapper || !instance) {
            return {
                x: 160 + offset.x,
                y: 120 + offset.y,
            };
        }

        const bounds = wrapper.getBoundingClientRect();
        const centerScreen = {
            x: bounds.left + bounds.width / 2,
            y: bounds.top + bounds.height / 2,
        };
        const centerFlow = instance.screenToFlowPosition(centerScreen);

        return {
            x: centerFlow.x - width / 2 + offset.x,
            y: centerFlow.y - height / 2 + offset.y,
        };
    }, []);

    const addProceso = useCallback(() => {
        const id = `pp-${uuidv4()}`;
        const position = getSpawnPosition(320, 220);

        setNodes((nds) => [
            ...nds,
            {
                id,
                type: 'Proceso',
                position,
                data: {
                    label: `Proceso ${id}`,
                    children: [],
                    nombre: '',
                    parametros: createProcesoNodeParamsDefaults(),
                    width: 320,
                    height: 220,
                },
            },
        ]);
    }, [getSpawnPosition, setNodes]);

    const addProceson = useCallback(() => {
        const id = `p-${uuidv4()}`;
        const position = getSpawnPosition(180, 100);
        setNodes((nds) => [...nds, { id, type: "Proceson", position, data: { label: `Proceso`, nombre: '', parametros: createProcesoNodeParamsDefaults() } }]);
    }, [getSpawnPosition, setNodes]);

    const addStart = useCallback(() => {
        const id = `S-${uuidv4()}`;
        const position = getSpawnPosition(180, 100);

        setNodes((nds) => [
            ...nds,
            { id, type: 'Start', position, data: { label: 'Inicio' } },
        ]);
    }, [getSpawnPosition, setNodes]);

    const addFin = useCallback(() => {
        const id = `f-${uuidv4()}`;
        const position = getSpawnPosition(180, 100);
        setNodes((nds) => [...nds, { id, type: "Fin", position, data: { label: `Fin` } }]);
    }, [getSpawnPosition, setNodes]);

    const addOr = useCallback(() => {
        const id = `o-${uuidv4()}`;
        const position = getSpawnPosition(180, 100);
        setNodes((nds) => [...nds, { id, type: "Or", position, data: { label: `OR` } }]);
    }, [getSpawnPosition, setNodes]);

    const addXor = useCallback(() => {
        const id = `x-${uuidv4()}`;
        const position = getSpawnPosition(180, 100);
        setNodes((nds) => [...nds, { id, type: "Xor", position, data: { label: `XOR` } }]);
    }, [getSpawnPosition, setNodes]);

    const addAnd = useCallback(() => {
        const id = `a-${uuidv4()}`;
        const position = getSpawnPosition(180, 100);
        setNodes((nds) => [...nds, { id, type: "And", position, data: { label: `AND` } }]);
    }, [getSpawnPosition, setNodes]);

    const addVariableInside = useCallback(
        (procesoId) => {
            const id = `v-${uuidv4()}`;
            const parent = nodes.find((n) => n.id === procesoId);
            if (!parent) return;
            setNodes((nds) => [
                ...nds,
                {
                    id,
                    type: "Variable",
                    parentNode: procesoId,
                    extent: "parent",
                    position: { x: 24, y: 40 + Math.random() * 80 },
                    data: { label: `Proceso`, nombre: '', parametros: createVariableNodeParamsDefaults() },
                },
            ]);
            setContextMenu(null);
        },
        [nodes, setNodes]
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
        const value =
            target?.data?.nombre ||
            target?.data?.parametros?.proceso ||
            target?.data?.parametros?.variable ||
            target?.data?.label ||
            "";
        setRenameModal({ nodeId: target.id, value });
        setContextMenu(null);
    }, [contextMenu, nodes]);

    const confirmRename = useCallback(() => {
        if (!renameModal) return;
        const nextName = (renameModal.value || "").trim();

        setNodes((nds) =>
            nds.map((n) => {
                if (n.id !== renameModal.nodeId) return n;

                const isProcesoType = n.type === "Proceso" || n.type === "Proceson";
                const isVariableType = n.type === "Variable";

                const nextParams = {
                    ...(n.data?.parametros || {}),
                    ...(isProcesoType ? { proceso: nextName } : {}),
                    ...(isVariableType ? { variable: nextName } : {}),
                };

                return {
                    ...n,
                    data: {
                        ...n.data,
                        name: nextName,
                        nombre: nextName,
                        label: nextName,
                        parametros: nextParams,
                    },
                };
            })
        );
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

            const xorLabels = {
                "s-t": "Si",
                "s-r": "Si",
                "s-b": "No",
                "s-l": "No",
            };

            const orLabels = {
                "s-t": "opcion 1",
                "s-r": "Opción 2",
                "s-b": "Opción 2",
                "s-l": "Opción 4",
            };

            const andLabels = {
                "s-t": "Si",
                "s-r": "Si",
                "s-b": "No",
                "s-l": "No",
            };

            const edgeOptions = {
                type: "default",
                animated: true,
                style: { stroke: "var(--accent)", strokeWidth: 2, strokeDasharray: "5 5" },
                markerEnd: { type: MarkerType.ArrowClosed, color: "var(--accent)" },
            };

            const sourceHandle = connection.sourceHandle;

            let labelFromHandle
            if (isXor) {
                labelFromHandle = xorLabels[sourceHandle];
            } else if (isOr) {
                labelFromHandle = orLabels[sourceHandle];
            } else {
                labelFromHandle = undefined;
            }

            if (labelFromHandle) {
                edgeOptions.label = labelFromHandle;
                edgeOptions.labelBgStyle = { fill: "var(--surface)", fillOpacity: 0.8 };
                edgeOptions.labelStyle = { fill: "var(--foreground)", fontWeight: 500, fontSize: 18 };
            }
            setEdges((eds) => addEdge({ ...connection, ...edgeOptions }, eds));
        },
        [nodes]
    );

    /* --------------------------
        Guardar flujo
    ------------------------------ */

    const getName = () => (nameCounter.current++).toString();

    const saveToLocalStorage = async () => {
        const data = {
            id: `Linea_${arbol}`,
            nodes,
            edges,
            savedAt: new Date().toISOString(),
        };

        try {
            await saveProject(data);
            toast.success(`${data.id} guardado`,
                {
                    duration: 4000,
                    style: {
                        background: 'var(--surface)',
                        color: 'var(--foreground)',
                        borderRadius: '10px',
                        padding: '12px 16px',
                    },
                    iconTheme: {
                        primary: 'var(--accent)',
                        secondary: 'var(--accent-foreground)',
                    },
                }
            );
        } catch (error) {
            console.error('Error guardando proyecto:', error);
            toast.error('No se pudo guardar el proyecto');
        }
    };

    const saveNodeFlowToLocalStorage = async (contextMenu, nodes, edges) => {
        const data = {
            id: `Proceso_${contextMenu?.nodeId}`,
            nodes,
            edges,
            savedAt: new Date().toISOString(),
        };

        try {
            await saveNodeFlow(contextMenu?.nodeId, nodes, edges);
            alert(`El flujo del ${data.id} ha sido guardado correctamente`);
        } catch (error) {
            console.error('Error guardando flujo del nodo:', error);
            alert('No se pudo guardar el flujo del nodo');
        }
    };

    const loadNodeFlow = async (nodeId) => {
        if (!nodeId) {
            return { nodes: [], edges: [] };
        }

        const saved = await loadNodeFlowFromClient(nodeId);
        return saved || { nodes: [], edges: [] };
    };

    const handleSaveNodeFlow = () => {
        saveNodeFlowToLocalStorage(currentNodeId, internalNodes, internalEdges);
        setOpenVariables(false);
    };

    const DownloadFile = () => {
        const data = {
            id: `Linea_${arbol}`,
            nodes,
            edges,
            savedAt: new Date().toISOString(),
        };
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

    const handleEditProceso = () => {
        const patch = createProcesoNodeDataPatch(formPro);
        setNodes((prev) =>
            prev.map((node) =>
                node.id === selectedNode.id
                    ? {
                        ...node, data: {
                            ...node.data,
                            ...patch,
                        }
                    }
                    : node
            )
        );
        setFormPro(getEmptyProcesoForm())
        setIsOpenEdit(false)
    };

    const handleEditVariable = () => {
        const patch = createVariableNodeDataPatch(formVar);
        setNodes((prev) =>
            prev.map((node) =>
                node.id === selectedNode.id
                    ? {
                        ...node, data: {
                            ...node.data,
                            ...patch,
                        }
                    }
                    : node
            )
        );

        setFormVar(getEmptyVariableForm())
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

    const duplicateNode = useCallback((nodeId) => {
        const original = nodes.find((n) => n.id === nodeId);
        if (!original) return;

        const newId = crypto.randomUUID();

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
                label: original.data.label
            },
            selected: false
        };

        setNodes((nds) => [...nds, newNode]);

        setSelectedNode(newNode);

    }, [nodes, setNodes]);

    const handleDuplicate = useCallback(() => {
        if (!contextMenu) return;

        duplicateNode(contextMenu.nodeId);

        setContextMenu(null);
    }, [contextMenu, duplicateNode]);

    const addNodeConnected = (sourceNodeId, type) => {
        const newId = `${type}-${uuidv4()}`;

        const sourceNode = nodes.find(n => n.id === sourceNodeId);
        if (!sourceNode) return;

        const newPosition = {
            x: sourceNode.position.x + (sourceNode.data?.width || 180) + 40,
            y: sourceNode.position.y,
        };

        const newNode = {
            id: newId,
            type,
            position: newPosition,
            data: { label: `${type}` },
        };

        const newEdge = {
            id: `e-${sourceNodeId}-${newId}`,
            source: sourceNodeId,
            sourceHandle: 'cs1',
            target: newId,
            targetHandle: 'ct2',
            type: 'default',
            animated: true,
            style: { stroke: "var(--accent)", strokeWidth: 2, strokeDasharray: "5 5" },
            markerEnd: { type: MarkerType.ArrowClosed, color: "var(--accent)" },
        };

        setNodes(nds => [...nds, newNode]);
        setEdges(eds => [...eds, newEdge]);
        setContextMenu(null);
    };

    return (
        <div ref={flowWrapperRef} style={{ width: "100%", height: "100vh", position: "relative" }} className="font-sans bg-[var(--background)]">
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
                onInit={(instance) => {
                    reactFlowRef.current = instance;
                }}
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
                snapGrid={[6, 6]}
                minZoom={0.01}
                deleteKeyCode={null}
                fitView>

                <MiniMap
                    style={{
                        backgroundColor: flowTheme.minimapBackground,
                        border: `1px solid ${flowTheme.controlsBorder}`,
                    }}
                    maskColor={flowTheme.minimapMask}
                    nodeColor={flowTheme.minimapNode}
                    nodeStrokeColor={flowTheme.minimapNodeStroke}
                />
                <Controls
                    style={{
                        backgroundColor: flowTheme.controlsBackground,
                        border: `1px solid ${flowTheme.controlsBorder}`,
                        color: flowTheme.controlsIcon,
                    }}
                    color={flowTheme.controlsIcon}
                />
                <Background gap={35} variant="grid" color="var(--grid-color)" size={7} />

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
                    addNodeConnected={addNodeConnected}

                />
            )}

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
