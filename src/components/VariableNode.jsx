import { FaHashtag, FaPuzzlePiece } from "react-icons/fa";
import { Handle, Position } from "reactflow";
import "reactflow/dist/style.css";

export function VariableNode({ data, selected }) {
  return (
    <div
      className={`
        relative flex flex-col items-center justify-center text-center
        rounded-md box-border
        px-2 py-1
        w-[${data?.width ?? 120}px] h-[${data?.height ?? 100}px]
        bg-blue-500/20 backdrop-blur-xl
        border-2
        ${selected ? "border-blue-500 shadow-[0_0_0_1px_rgba(37,99,235,0.4)]" : "border-blue-300"}
      `}
    >
      {/* Nombre de la variable */}
      <div className="text-[13px] text-blue-900 mt-0.5 truncate max-w-[90%] flex items-center">
        <FaPuzzlePiece size={22} className="text-blue-700 mr-1 -mt-0.5" />
        <h1>{data?.parametros?.variable || data?.label}</h1>
      </div>

      {/* Handles (4 targets + 4 sources) */}
      <Handle id="vt1" type="target" position={Position.Top} style={handleStyle} />
      <Handle id="vt2" type="target" position={Position.Left} style={handleStyle} />
      <Handle id="vt3" type="target" position={Position.Right} style={handleStyle} />
      <Handle id="vt4" type="target" position={Position.Bottom} style={handleStyle} />
      <Handle id="vs1" type="source" position={Position.Right} style={handleStyle} />
      <Handle id="vs2" type="source" position={Position.Bottom} style={handleStyle} />
      <Handle id="vs3" type="source" position={Position.Top} style={handleStyle} />
      <Handle id="vs4" type="source" position={Position.Left} style={handleStyle} />
    </div>
  );
}

const handleStyle = {
  background: "#1e3a8a", // Azul fuerte (Tailwind blue-600)
  border: "1px solid #1e3a8a",
  width: 6,
  height: 6,
  borderRadius: "50%",
};