import { HiPuzzle } from "react-icons/hi";
import { Handle, Position } from "reactflow";
import "reactflow/dist/style.css";

export function VariableNode({ data, selected }) {
  const label = data?.parametros?.variable || data?.label;

  return (
    <div
      className={`
        border-2 rounded-2xl
        flex items-center justify-center gap-1.5
        font-sans font-bold text-[12px]
        text-blue-800 dark:text-blue-200
        bg-[#3b82f620] dark:bg-[#3b82f62a]
        transition-all duration-300
        ${selected ? "border-blue-600 dark:border-blue-400" : "border-slate-400 dark:border-slate-500"}
      `}
      style={{
        width: data?.width ?? 90,
        height: data?.height ?? 52,
        boxShadow: selected ? "0 0 0 10px #3b82f640" : "none",
        position: "relative",
        boxSizing: "border-box",
        padding: "6px 8px",
      }}
    >
      <HiPuzzle
        size={18}
        className={selected ? "text-blue-700 dark:text-blue-300" : "text-blue-600 dark:text-blue-400"}
      />

      <div
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "80%",
        }}
        title={label}
      >
        {label}
      </div>

      <Handle id="vt1" type="target" position={Position.Top} style={handleStyle} />
      <Handle id="vs1" type="source" position={Position.Bottom} style={handleStyle} />
      <Handle id="vl1" type="target" position={Position.Left} style={handleStyle} />
      <Handle id="vr1" type="source" position={Position.Right} style={handleStyle} />
    </div>
  );
}

const handleStyle = {
  width: 8,
  height: 8,
  background: "#60A5FA",
  border: "1px solid #60A5FA",
  borderRadius: "50%",
};
