import { FaStop } from "react-icons/fa";
import { Handle, Position } from "reactflow";
import "reactflow/dist/style.css";

export function FinNode({ data, selected }) {
  return (
    <div
      className={` bg-[#ef444420]
        border-2 
        ${selected ? "border-red-600 shadow-[0_0_0_2px_rgba(37,99,235,0.2)]" : "border-slate-400"}`}
      style={{
        width: 50,
        height: 50,
        borderRadius: "50%",
        
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      <FaStop style={{ color: "#ef4444", fontSize: 20 }} />

      {/* Solo salida, porque el inicio no recibe conexiones */}
      <Handle
        type="target"
        position={Position.Left}
        style={handleStyle}
      />
    </div>
  );
}

const handleStyle = {
  background: "#ef4444",
  border: "1px solid #c40808", // rojo más oscuro
  width: 7,
  height: 7,
};