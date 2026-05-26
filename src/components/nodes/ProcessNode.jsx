import { FaCog, FaLayerGroup, FaRegObjectGroup } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { Handle, Position } from "reactflow";
import "reactflow/dist/style.css";

export function ProcessNode({ data, selected }) {
  const isDroppable = !!data?.isDroppable;

  return (
    <div
    style={{
        width: data?.width ?? 320,
        height: data?.height ?? 220,
        boxShadow: selected ? "0 0 0 10px #74798255" : "none",
    }}
      className={`
        rounded-[35px] 
        p-4 
        flex flex-col 
        box-border 
        border-2
        ${selected ? "border-gray-700 dark:border-gray-300" : "border-gray-300 dark:border-gray-600"}
        ${isDroppable ? "bg-gray-100 dark:bg-gray-700" : "bg-gray-200 dark:bg-gray-700"}
        transition-all duration-300
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <FaLayerGroup
          size={20}
          className={`text-gray-700 dark:text-gray-300 ${selected ? "text-gray-900 dark:text-slate-100" : ""}`}
        />
        <strong className="truncate text-gray-800 dark:text-gray-200">
          {data?.parametros?.proceso || data?.label}
        </strong>
      </div>

      {/* Info secundaria */}
      <span className="text-xs text-gray-600 dark:text-gray-400">
        Variables: {data?.children?.length ?? 0}
      </span>

      {/* Handles */}
      <Handle id="t" type="target" position={Position.Top} style={handleStyle} />
      <Handle id="l" type="target" position={Position.Left} style={handleStyle} />
      <Handle id="r" type="target" position={Position.Right} style={handleStyle} />
      <Handle id="b" type="target" position={Position.Bottom} style={handleStyle} />

      <Handle id="s-r" type="source" position={Position.Right} style={handleStyle} />
      <Handle id="s-b" type="source" position={Position.Bottom} style={handleStyle} />
      <Handle id="s-t" type="source" position={Position.Top} style={handleStyle} />
      <Handle id="s-l" type="source" position={Position.Left} style={handleStyle} />
    </div>
  );
}

// Handles gris neutro
const handleStyle = {
  width: 8,
  height: 8,
  background: "#9CA3AF", // gris medio
  border: "1px solid #9CA3AF",
  borderRadius: "50%",
};
