import { FaPuzzlePiece } from "react-icons/fa";
import { HiPuzzle } from "react-icons/hi";
import { Handle, Position } from "reactflow";
import "reactflow/dist/style.css";

export function VariableNode({ data, selected }) {
  return (
    <div
      style={{
        width: data?.width ?? 90,
        height: data?.height ?? 45,
        background: "rgba(59, 130, 246, 0.4)", 
        border: `2px solid ${selected ? "#3B82F6" : "#93C5FD"}`,
        borderRadius: 12,
        transition: "all 0.3s ease",
        boxShadow: selected ? "0 0 0 6px #3B82F655" : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxSizing: "border-box",
        textAlign: "center",
        padding: 4,
      }}
      className="font-sans font-medium text-blue-700 dark:text-blue-300"
    >
      {/* Icono azul claro */}
      <HiPuzzle
        size={16}
        color={selected ? "" : "#2477ff"}
        className="mr-1"
      />

      {/* Texto */}
      <div
        style={{
          fontSize: 11,
          marginTop: 4,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "90%",
        }}
        title={data?.parametros?.variable || data?.label}
      >
        {data?.parametros?.variable || data?.label}
      </div>

      {/* Handles */}
      <Handle id="vt1" type="target" position={Position.Top} style={handleStyle}/>
      <Handle id="vs1" type="source" position={Position.Bottom} style={handleStyle}/>
      <Handle id="vl1" type="target" position={Position.Left} style={handleStyle}/>
      <Handle id="vr1" type="source" position={Position.Right} style={handleStyle}/>
    </div>
  );
}

// Handles azul claro
const handleStyle = {
  width: 6,
  height: 6,
  background: "#60A5FA",
  border: "1px solid #60A5FA",
  borderRadius: "50%",
};

