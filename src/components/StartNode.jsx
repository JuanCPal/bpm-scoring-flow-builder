import { FaPlay } from "react-icons/fa";
import { Handle, Position } from "reactflow";
import "reactflow/dist/style.css";

export function StartNode({ data, selected }) {
  return (
    <div
    className={` bg-[#22c55e20]
        border-2 
        ${selected ? "border-green-600 shadow-[0_0_0_2px_rgba(37,99,235,0.2)]" : "border-slate-400"}`}

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
      <FaPlay style={{ color: "#22c55e", fontSize: 20 }} />

      {/* Solo salida, porque el inicio no recibe conexiones */}
      <Handle
        type="source"
        position={Position.Right}
        style={handleStyle}
      />
    </div>
  );
}

const handleStyle = {
  background: "#22c55e",
  border: "1px solid #22c55e", // verde más oscuro
  width: 8,
  height: 8,
};